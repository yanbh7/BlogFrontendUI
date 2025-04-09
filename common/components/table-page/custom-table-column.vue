<template>
  <el-table-column
    :label="prop.label"
    :prop="prop.key"
    :align="prop.children ? 'center' : ''"
    :key="'group_' + prop.key"
    v-bind="prop.vBind"
    :show-overflow-tooltip="!prop.hideToolTip"
  >
    <template #header>
      <slot name="customGroupColumnHeader" :prop="prop">
        {{ prop.label }}
      </slot>
    </template>
    <template v-for="subProp in prop.children">
      <CustomTableColumn v-if="subProp.children" :key="prop.key + '_' + subProp.key" :prop="subProp">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"> </slot>
        </template>
      </CustomTableColumn>
      <el-table-column
        v-else
        :label="subProp.label"
        :prop="subProp.key"
        v-bind="subProp.vBind"
        :key="prop.key + '_' + subProp.key"
        :show-overflow-tooltip="!subProp.hideToolTip"
      >
        <template #default="scope">
          <slot
            v-if="subProp.isCustom"
            :name="`column-${subProp.key}`"
            :row="scope?.row"
            :index="scope?.$index"
            :val="scope?.row?.[subProp.key]"
            :column="subProp"
          />
          <slot v-else name="common-cell" :row="scope?.row" :val="scope?.row?.[subProp.key]" :column="subProp">
            <span class="inner-cell">
              {{
                subProp.formatter ? subProp.formatter(scope?.row, scope?.row?.[subProp.key]) : scope?.row?.[subProp.key]
              }}
            </span>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import { ElTableColumn } from 'element-plus';
export default {
  name: 'CustomTableColumn',
  components: { ElTableColumn },
  props: {
    prop: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
