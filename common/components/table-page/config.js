const getPageDefault = () => ({
  pageSize: 20,
  currentPage: 1,
  total: 0,
});

/*
 * 权限code permissionCode
 * Demo： { onClick: async () => true, permissionCode:'xxx' }
 */
const getBtnDefault = () => ({
  import: { component: 'CSRImport', onClick: async () => true },
  export: { component: 'CSRExport', label: '', onClick: () => {} },
  add: {
    // isKeep: true, // 新增数据后是否保持当前page
    component: 'CSRAdd',
    label: '',
    onClick: async () => true,
  },
  delete: { component: 'CSRDelete', onClick: async () => true },
  refresh: { component: 'CSRRefresh', onClick: async () => true },
});

/* tableColumns : {
 * label: "",
 * key: "",
 * vBind:{
 *    width: "",
 *    minWidth: "",
 *    xxx:""
 *    sortable:false
 * }
 * hideToolTip: false,
 * // 是否自定义列内容 配合插槽column-{field}使用
 * isCustom: false,
 * // 取值的方法
 * formatter: (row,row.column[field]) => {},
 * }
 * operateConfig ：
 * xxx.permissionCode  权限code
 *
 */
const getTableDefault = () => ({
  tableConfig: {},
  tableColumns: [],
  hasOperation: false,
  operateWidth: 100,
  hasSelection: false,
  hasBorder: true,
  operateConfig: {
    edit: { component: 'IconEdit', onClick: async () => true },
    delete: { component: 'IconDelete', onClick: async () => true },
  },
});

const getSearchDefault = () => ({
  select: {
    name: 'select',
    component: 'el-select',
    // 初始化的值，不给modelValue
    initSelectValue: () => '',
    modelValue: '',
    bindKey: 'countryId',

    isEmpty: true,
    options: {
      api: async () => true,
      getParams: () => ({}),
      buildItem: () => ({}),
    },
  },
  input: {
    name: 'input',
    component: 'el-input',
    modelValue: '',
    bindKey: 'key',
    vBind: {
      suffixIcon: 'Search',
      placeholder: '搜索',
    },
  },
});

export { getPageDefault, getBtnDefault, getSearchDefault, getTableDefault };
