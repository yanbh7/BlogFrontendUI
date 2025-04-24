<template>
  <div v-show="isShow">
    <el-dialog v-bind="dialogBind" @closed="onClose">
      <template #header>
        <span class="el-dialog__title">{{ dialogBind.title }}</span>
        <el-tooltip effect="dark" placement="top-start" v-if="dialogBind.tooltip">
          <template #content>
            <span v-if="dialogBind.isRawToolTip" v-html="dialogBind.tooltip"></span>
            <span v-else>{{ dialogBind.tooltip }}</span>
          </template>
          <el-icon class="tooltip"><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <slot></slot>
      <template #footer v-if="showFooter">
        <el-button
          v-for="btn in orderBtns"
          :key="btn.order"
          :class="btn.class"
          :disabled="btn.disabled"
          :type="btn.type"
          @click="btnClick(btn)"
        >
          {{ btn.text }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import useDialog from './use-dialog.js';
import { QuestionFilled } from '@element-plus/icons-vue';

export default {
  components: {
    QuestionFilled,
  },
  props: {
    showFooter: Boolean, // 是否无Footer
    isDrag: Boolean,
    dialogOpt: {
      type: Object,
      default() {
        return {};
      },
    },
    otherProps: {
      type: Object,
      default() {
        return {};
      },
    },
    footer: {
      type: Object,
      default() {
        return {};
      },
    },
    onOK: Function,
    onCancel: Function,
    showHeader: Boolean,
    unMount: Function,
  },
  setup(props, ctx) {
    const { state, methods } = useDialog(props, ctx);

    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.tooltip {
  color: black;
  margin-left: 0.25rem; // 0.04rem * 6.25
  font-size: 1rem; // 0.16rem * 6.25
}
:deep(.el-dialog) {
  .el-dialog__footer {
    padding: 1.5625rem 0 0.625rem 0.625rem; // 0.25rem * 6.25, 0.1rem * 6.25

    .el-button--small {
      padding: 0;
    }
    .el-button {
      height: 1.875rem; // 0.3rem * 6.25
      line-height: 1.875rem; // 0.3rem * 6.25
    }
    .el-button > span {
      margin: 0 0.625rem; // 0.1rem * 6.25
    }
  }
}
</style>
