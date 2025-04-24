import { h } from 'vue';
import { merge, omit } from 'lodash-es';
import DialogTemplate from './dialog-template.vue';

const OMIT_KEYS = ['props', 'height']; // 升级之后冗余参数,需要剔除

// modalClick(遮罩点击) pageResize(页面resize)
const POP_EVENT = {
  modalClick: 'modalClick',
  pageResize: 'pageResize',
};

const MergeHelper = {
  data: {
    // 按钮默认属性
    btn: {
      text: 'public.buttonText',
      clickFn: (dlg) => {
        dlg.close();
      }, // 点击回调
      isHide: false, // 是否隐藏
      order: 2, // 序号
      disabled: false,
      type: 'default', // 样式
    },
    // 弹框
    dialog: {
      props: {}, // 传入component的props
      dialogOpt: {
        // 支持所有el-dialog弹框配置项,小驼峰(aaaBbbCcc)配置
        modal: true,
        closeOnClickModal: false,
        width: '54%',
      },
      isDrag: false,
      /* 默认按钮回调 */
      onOK(vm) {
        vm.close();
      },
      onCancel(vm) {
        vm.close();
      },
      footer: null,
      showHeader: true,
      showFooter: true,
    },
  },
  merge(options, type = 'btn') {
    return merge({}, this.data[type] || {}, options);
  },
  init() {
    this.data.dialog.footer = {
      ok: this.merge({
        text: '确认',
        order: 0,
        type: 'primary',
      }),
      cancel: this.merge({
        text: '取消',
        order: 1,
        type: 'default',
      }),
    };
  },
};
MergeHelper.init();

let dialogId = 0;
const getNextId = () => `body-dialogOrPop-${dialogId++}`;
const popClassName = 'cus-popup';

function dialogBase(createAppPlus, Node = {}, orignOptions = {}) {
  const options = MergeHelper.merge(orignOptions, 'dialog');
  const { footer, isDrag, props } = options;

  if (orignOptions.onOK) {
    footer.ok.clickFn = orignOptions.onOK;
  }
  if (orignOptions.onCancel) {
    footer.cancel.clickFn = orignOptions.onCancel;
  }

  Object.entries(footer).forEach(([key, value]) => {
    if (key !== 'ok' || key !== 'cancel') {
      footer[key] = MergeHelper.merge(value);
    }
  });

  const mountNode = document.createElement('div');
  const nextId = getNextId();
  mountNode.setAttribute('id', nextId);
  mountNode.setAttribute('class', isDrag ? `drag-dialog ${popClassName}` : popClassName);
  document.body.appendChild(mountNode);

  const app = createAppPlus(
    h(
      DialogTemplate,
      {
        ...omit(options, OMIT_KEYS),
        unMount: () => {
          const node = document.getElementById(nextId);
          if (node) {
            let pos = innerDialog.all.findIndex((d) => d === app);
            innerDialog.all.splice(pos, 1); // 移除当前元素
            document.body.removeChild(node);
          }
        },
      },
      [h(Node, { ...props, ref: 'inner' })],
    ),
  ).mount(`#${nextId}`);

  return app;
}

// 保证接口一致性
function innerDialog(orignOptions) {
  const { component, createAppPlus, ...other } = orignOptions;
  const app = dialogBase(createAppPlus, component, other);
  innerDialog.all.push(app);
  return app;
}
const asynDialog = (orignOptions, after = Boolean) =>
  new Promise((resolve) => {
    const app = innerDialog(orignOptions);
    app.setResolve(resolve);
    after(app);
  });

innerDialog.all = [];

// 关闭所有弹窗
const clearDialogs = () => {
  for (let i = innerDialog.all.length - 1; i >= 0; i--) {
    innerDialog.all[i].close();
  }
};

export { POP_EVENT, innerDialog as $dialog, clearDialogs, asynDialog };
