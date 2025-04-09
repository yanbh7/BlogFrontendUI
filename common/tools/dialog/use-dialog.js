import { reactive, nextTick, getCurrentInstance } from 'vue';
import orderBy from 'lodash/orderBy';

class DialogState {
  orderBtns = [];
  title = '弹框Title';
  dialogBind = {};
  isShow = true;
  constructor(props) {
    Object.assign(this, props);
  }
}

export default function useDialog(props) {
  const { footer, dialogOpt, isDrag, showHeader, unMount, otherProps, onCancel, showFooter: isShowFooter } = props;
  // 过滤不显示的按钮
  const showBtns = Object.values(footer).filter((btn) => !btn.isHide);
  // 按钮排序
  const orderBtns = orderBy(showBtns, ['order'], ['desc']);

  const vm = getCurrentInstance();

  const close = async () => {
    state.dialogBind.modelValue = false;
    await nextTick();
    // 主动销毁整个app实例
    try {
      vm.appContext.app.unmount();
    } catch (e) {}
    unMount();
  };
  const hide = () => (state.isShow = false);
  const show = () => (state.isShow = true);
  vm.close = close;
  vm.hide = hide;
  vm.show = show;

  const methods = {
    hide,
    show,
    close,
    setResolve(resolve) {
      vm.resolve = resolve;
    },
    onClose() {
      onCancel(vm);
    },
    btnClick: async (btn) => {
      const res = await btn?.clickFn(vm);
      if (res) {
        vm.resolve?.(res);
      }
    },
    setIsShowFooter(showFooter) {
      state.isShowFooter = showFooter;
    },
  };

  const customClass = ['common-dialog', otherProps.class || ''];
  // isDrag是否可拖拽
  if (isDrag) {
    customClass.push('is-drag');
  }
  if (!showHeader) {
    customClass.push('noheader');
  }
  const state = reactive(
    new DialogState({
      orderBtns,
      isShowFooter,
      dialogBind: {
        ...dialogOpt,
        title: dialogOpt.title || '',
        modelValue: true,
        class: customClass.join(' '),
      },
    }),
  );

  return { state, methods };
}
