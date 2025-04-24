import { getCurrentInstance, reactive, watch, computed } from 'vue';
import { merge, pick } from 'lodash-es';
import { $warning } from '../../tools/message.js';
import { getPageDefault, getBtnDefault, getSearchDefault, getTableDefault } from './config.js';

const functionList = [
  'init',
  'updateTableData',
  'onClick',
  'handleSearch',
  'getTableSelects',
  'handleSizeChange',
  'handleCurrentChange',
  'sortChange',
  'clearSelection',
  'getIsOperate',
  'toggleSelection',
  'onOperate',
];

export default class TablePage {
  constructor(props, ctx) {
    const mergeMethods = (defaultConfig, exter) => {
      const configTemp = pick(defaultConfig, [...Object.keys(exter), props.hasInputSearch && 'input']);
      return merge(configTemp, exter);
    };
    const mergeProps = ({ btnInfos, searchInfos }) => {
      const btnConfig = mergeMethods(getBtnDefault(), btnInfos);
      const searchConfig = mergeMethods(getSearchDefault(), searchInfos);
      return { btnConfig, searchConfig };
    };

    const { btnConfig, searchConfig } = mergeProps(props);

    this.vm = getCurrentInstance();
    this.props = props;
    this.ctx = ctx;

    this.btnConfig = btnConfig;
    this.state = reactive({
      pageConfig: getPageDefault(),
      searchConfig,
      tableData: [],
      options: [],
      tableAttr: {},
      isInited: false,
      sortParams: {},
    });

    this.computeds = {
      showToolsBox: computed(() => {
        return Object.keys(searchConfig).length || Object.keys(btnConfig).length || props.title;
      }),
    };

    watch(
      () => props.tableBase,
      (val) => {
        // 动态表格特殊处理
        this.state.tableAttr = mergeMethods(getTableDefault(), val);
      },
      {
        immediate: true,
      },
    );

    // 编辑权限
    this.operationPermission = Object.values(this.state.tableAttr.operateConfig || {}).map(
      ({ permissionCode }) => permissionCode,
    );
  }

  // 初始化
  async init() {
    const { state, props } = this;
    await props.beforeInit();
    state.isInited = true;
    if (state.searchConfig?.select) {
      await this.initSelect();
    }
    await this.updateTableData();
    props.afterInit(state);
  }

  getTableSelects() {
    return this.vm.refs.table.getSelectionRows();
  }

  toggleSelection(rows = []) {
    rows.forEach((el) => {
      this.vm.refs.table.toggleRowSelection(el);
    });
  }
  // 初始化select Options
  async initSelect() {
    const { state, ctx } = this;
    if (Array.isArray(state.searchConfig.select.options)) {
      state.options = [...state.searchConfig.select.options];
    } else if (state.searchConfig.select.options instanceof Function) {
      state.options = state.searchConfig.select.options();
    } else {
      const { api, getParams, buildItem } = state.searchConfig.select.options;
      const res = await api(getParams(state));
      if (!res?.isSuccess()) {
        res.showError();
        return;
      }
      ctx.emit('getOptions', res.data);
      state.options = res.data?.map(buildItem);
    }

    const {
      select,
      select: { isEmpty, initSelectValue },
    } = state.searchConfig;
    if (!isEmpty) {
      select.modelValue = state.options[0]?.value || '';
      ctx.emit('selectChange', select.modelValue);
      return;
    }
    if (initSelectValue instanceof Function) {
      select.modelValue = initSelectValue();
      ctx.emit('selectChange', select.modelValue);
    }
  }
  // 分页方法
  handleSizeChange() {
    this.state.pageConfig.currentPage = 1;
    this.updateTableData(true);
  }
  handleCurrentChange() {
    this.updateTableData();
  }

  async updateTableData(isReset = false) {
    const { props, state } = this;
    const { isCanAxios = () => true } = props.initData;
    if (!isCanAxios()) {
      return;
    }
    const { pageConfig } = state;
    if (isReset) {
      pageConfig.currentPage = 1;
    }

    const params = {
      ...props.initData.getParams?.(state),
      ...state.sortParams,
    };
    if (props.hasPager) {
      Object.assign(params, {
        pageSize: pageConfig.pageSize,
        currPage: pageConfig.currentPage,
      });
    }
    // 获取搜索框绑定值
    const getSearchValue = () => {
      const searchKeyMap = {};
      if (!props.isSelectInput) {
        Object.values(state.searchConfig).forEach((component) => {
          searchKeyMap[component.bindKey] = component.modelValue;
        });
      } else {
        // 元数据定制
        const { select, input } = state.searchConfig;
        // searchType 2 模糊搜索
        searchKeyMap.propertyValueSearch = state.options.length
          ? { [select.modelValue]: { searchType: 2, content: input.modelValue } }
          : {};
      }

      return searchKeyMap;
    };
    // 合并请求参数
    Object.assign(params, getSearchValue());

    const res = await props.initData.initApi(params);
    if (!res?.isSuccess()) {
      res.showError();
      return;
    }
    const { buildItem = (_) => _ } = props.initData;
    state.tableData = buildItem(res.data);
    const { tableColumns } = state.tableAttr;
    this.vm.refs.table?.clearFilter();
    tableColumns
      .filter((el) => el.filters)
      .forEach((el) => {
        el.filters = el.buildFilters(state.tableData);
      });
    pageConfig.total = res.data?.totalCount || res.data?.pageInfo?.totalCount || 0;
  }

  handleSearch(val, type) {
    this.ctx.emit(`${type}Change`, val);
    this.state.pageConfig.currentPage = 1;
    this.updateTableData(true);
  }

  async onClick(btn) {
    if (btn.component === 'CSRExport') {
      btn.onClick();
      return;
    }
    let selections = [];
    if (btn.component === 'CSRDelete' && this.state.tableAttr.hasSelection) {
      selections = this.vm.refs.table.getSelectionRows();
      if (!selections.length) {
        $warning('public.leastOne');
        return;
      }
    }
    if (btn.component === 'CSRRefresh') {
      this.updateTableData(true);
      return;
    }
    const isPass = await btn.onClick(selections);
    if (isPass) {
      this.updateTableData(!btn.isKeep);
    }
  }

  clearSelection() {
    this.vm.refs.table.clearSelection();
  }
  async onOperate(row, icon) {
    const isPass = await icon.onClick(row);
    if (isPass) {
      this.updateTableData();
    }
  }
  sortChange({ column, prop, order }) {
    const { state, props } = this;
    // 排序
    if (!order) {
      state.sortParams = {};
      this.updateTableData(true);
      return;
    }
    state.sortParams = props.sortableConfig?.buildParams?.(column, prop, order) || {};
    this.updateTableData(true);
  }
  // 元数据单行编辑
  getIsOperate(row) {
    return !Number(row.is_system);
  }

  use() {
    return {
      ...pick(this, ['operationPermission', 'btnConfig', 'state', 'computeds']),
      methods: Object.assign({}, ...functionList.map((el) => ({ [el]: this[el].bind(this) }))),
    };
  }
}
