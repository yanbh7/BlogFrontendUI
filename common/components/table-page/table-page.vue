<template>
  <div class="table-page project-list" v-if="isInited">
    <!-- 表格头部标题 搜索 操作按钮 -->
    <div class="tools-box" v-if="showToolsBox">
      <div class="f-row f-mid">
        <div class="title text-omit" v-smarttips="{ position: 'bottom' }" v-if="title">
          {{ title }}
        </div>
        <div class="search-box">
          <template v-if="!isSelectInput">
            <component
              v-for="item in Object.values(searchConfig || {})"
              :is="item.component"
              clearable
              :filterable="Boolean(item.options)"
              v-model="item.modelValue"
              v-bind="item?.vBind"
              @change="(val) => handleSearch(val, item.name)"
            >
              <el-option v-if="item.options" v-for="option in options" :label="option.label" :value="option.value" />
            </component>
          </template>
          <template v-if="isSelectInput && Object.values(searchConfig).length && options.length">
            <el-input v-model="searchConfig.input.modelValue" @change="updateTableData(true)" class="input-select">
              <template #prepend>
                <el-select v-model="searchConfig.select.modelValue" filterable class="select-search">
                  <el-option v-for="option in options" :label="option.label" :value="option.value" />
                </el-select>
              </template>
              <template #append>
                <el-button icon="Search" @click="updateTableData(true)" />
              </template>
            </el-input>
          </template>
        </div>
      </div>
      <div class="top-buttons" v-if="showBtn">
        <template v-for="btn in Object.values(btnConfig)">
          <component :is="btn.component" @node-click="onClick(btn)" :label="btn?.label" :type="btn.type"></component>
        </template>
      </div>
    </div>
    <!-- 表格实体 -->
    <div class="table-box">
      <el-table
        :data="tableData"
        v-bind="tableAttr.tableConfig"
        :border="tableAttr?.hasBorder"
        show-overflow-tooltip
        stripe
        height="100%"
        ref="table"
        @sort-change="sortChange"
      >
        <el-table-column
          type="selection"
          v-if="tableAttr?.hasSelection"
          key="fixed_selection"
          :selectable="checkSelectable"
        ></el-table-column>
        <template v-for="column in tableAttr?.tableColumns">
          <el-table-column
            v-if="!column.children"
            :key="column.key"
            :prop="column.key"
            :label="column.label"
            v-bind="column.vBind"
            :align="column.align"
            :filters="column.filters"
            :filter-method="column.filterMethod"
            :show-overflow-tooltip="!column.hideToolTip"
            :resizable="column.resizable"
          >
            <template #default="scope">
              <slot
                v-if="column.isCustom"
                :name="`column-${column.key}`"
                :row="scope?.row"
                :index="scope?.$index"
                :val="scope?.row?.[column.key]"
                :column="column"
              />
              <slot v-else name="common-cell" :row="scope?.row" :val="scope?.row?.[column.key]" :column="column">
                <span class="inner-cell">
                  {{
                    column.formatter ? column.formatter(scope?.row, scope?.row?.[column.key]) : scope?.row?.[column.key]
                  }}
                </span>
              </slot>
            </template>
          </el-table-column>
          <CustomTableColumn v-else :prop="column">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot v-bind="scope" :name="slot"> </slot>
            </template>
          </CustomTableColumn>
        </template>

        <template v-if="tableAttr.hasOperation">
          <el-table-column
            class-name="operation"
            :width="getPx(tableAttr?.operateWidth || 100)"
            align="center"
            fixed="right"
            :resizable="false"
            label="操作"
          >
            <template #default="scope">
              <!-- 图片预览其他操作 -->
              <slot name="operate-cell" :row="scope?.row" />
              <template v-if="getIsOperate(scope.row)">
                <component
                  v-for="icon in Object.values(tableAttr.operateConfig || {})"
                  :is="icon.component"
                  @node-click="onOperate(scope?.row, icon)"
                />
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-box">
      <el-pagination
        v-if="hasPager"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        v-model:currentPage="pageConfig.currentPage"
        v-model:pageSize="pageConfig.pageSize"
        :total="pageConfig.total"
        v-bind="{ ...pageVbind }"
      />
    </div>
  </div>
</template>

<script>
import { toRefs, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import TablePage from './use-table-page';
import CustomTableColumn from './custom-table-column.vue';

export default {
  components: { ElTable, ElTableColumn, ElPagination },
  props: {
    beforeInit: {
      type: Function,
      default: async () => {},
    },
    title: {
      type: String,
      default: '',
    },
    // 表格初始化数据api和请求参数
    initData: {
      type: Object,
      default: () => ({
        async initApi() {},
        getParams: () => ({}),
        buildItem: (data) => data,
        isCanAxios: () => true,
      }),
    },
    searchInfos: {
      type: [Object, Array],
      default: () => ({}),
    },
    hasInputSearch: {
      type: Boolean,
      default: false,
    },
    btnInfos: {
      type: Object,
      default: () => ({}),
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    tableBase: {
      type: Object,
      required: true,
    },
    hasPager: {
      type: Boolean,
      default: false,
    },
    pageVbind: {
      type: Object,
      default: () => ({}),
    },
    isSelectInput: {
      type: Boolean,
      default: false,
    },
    // 排序
    sortableConfig: {
      type: Object,
      default: () => ({}),
    },

    checkSelectable: {
      type: Function,
      default: () => true,
    },
    afterInit: {
      type: Function,
      default: () => {},
    },
  },

  components: {
    CustomTableColumn,
  },

  setup(props, ctx) {
    const { state, methods, computeds, btnConfig, operationPermission } = new TablePage(props, ctx).use();

    onMounted(methods.init);

    return {
      ...toRefs(state),
      ...methods,
      ...computeds,
      btnConfig,
      operationPermission,
    };
  },
};
</script>

<style lang="less" scoped>
.table-page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  .title {
    margin-right: 0.1rem;
    max-width: 10rem;
    font-size: 0.16rem;
    line-height: 0.2rem;
    font-weight: 700;
    padding-left: 0.12rem;
  }
  .input-select {
    .el-select {
      margin: 0;
      height: 100%;
    }
    :deep(.el-select__wrapper) {
      height: 100%;
    }
    :deep(.el-input__wrapper) {
      width: auto;
    }
    :deep(.el-input-group__prepend) {
      background: #fff !important;
      padding: 0;
    }
  }
  .select-search {
    width: 1.1rem;
  }

  .table-box {
    // header 和 column宽度不统一
    :deep(.el-table.is-scrolling-right) {
      th.el-table-fixed-column--right {
        z-index: 0;
      }
    }

    :deep(.el-table__body-wrapper) {
      td.el-table-fixed-column--left {
        background-color: transparent;
      }
      .hover-row {
        td.el-table-fixed-column--left {
          background-color: var(--el-bg-color);
        }
      }
      .operation {
        .cell {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.14rem;

          i {
            margin-left: 0.1rem;
            &:last-child {
              margin-right: 0.1rem;
            }
          }
        }
        &.not-edit-permission .cell {
          justify-content: center;
        }
      }
    }
  }
}
</style>
