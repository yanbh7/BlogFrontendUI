## Dialog

### 参数

```javascript
  {
      component: Component,
      props: {}, // 传入component的props
      dialogOpt: {
        // 支持所有el-dialog弹框配置项,小驼峰(aaaBbbCcc)配置
        modal: true,
        closeOnClickModal: false,
        width: "54%",
        top: "0",
      },
      isDrag: false,
      showHeader: true,
      showFooter: true,
      footer: null,
      /* 默认按钮回调 */
      onOK(vm) {
        vm.close();
      },
      onCancel(vm) {
        vm.close();
      },
    }
```

### 参数详细说明

#### props

props为 Component的参数，做的 v-bind绑定

#### dialogOpt

dialogOpt为弹框配置项，支持所有el-dialog弹框配置项,小驼峰(aaaBbbCcc)配置

```javascript
{
		modal: true, // 是否显示遮罩
        closeOnClickModal: false,
        width: "54%",
        top: "0",
}
```

#### isDrag

是否支持拖拽

#### showHeader

是否显示弹框头部，默认为true

#### showFooter

是否显示弹框按钮，默认为true

#### footer

底部自定义按钮配置，默认为null，可做以下配置，包括修改按钮文本、样式、顺序、点击回调、新增按钮等场景。ok对应是确定按钮，cancel对应是取消按钮；新增按钮应该避开这两个key

``` javascript
{
  ok: {
    text: $t("public.confirmButtonText"),
    order: 1,
    type: "primary",
    clickFn(vm) {
      vm.refs.inner.barrierSet(ids);
      vm.close();
    },
  },
  cancel: {
    text: $t("public.cancelButtonText"),
    order: 0,
    clickFn(vm) {
      vm.close();
    },
  },
},
```



## asynDialog

参数和Dialog参数一致，内置了Promise，可直接await。await的返回值为确认按钮的返回值