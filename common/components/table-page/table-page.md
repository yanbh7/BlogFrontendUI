## TablePage

### 组件属性

| 参数           | 说明                            | 类型     | 可选值 | 默认值       |
| -------------- | ------------------------------- | -------- | ------ | ------------ |
| title          | table 左上角 title              | String   | -      | -            |
| beforeInit     | 表格初始化前的 api              | Function | -      | async ()=>{} |
| initData       | 获取和刷新 table 的 api         | Object   | -      | -            |
| searchInfos    | 表格搜索配置                    | Object   | -      | -            |
| btnInfos       | 表格右上角操作按钮              | Object   | -      | -            |
| tableBase      | 表格的基本属性                  | Object   | -      | -            |
| hasPager       | 是否有分页                      | Boolean  | -      | false        |
| hasInputSearch | 是否有 input 搜索框             | Boolean  | -      | false        |
| isSelectInput  | 是否下拉输入框组合              | Boolean  | -      | false{}      |
| showInfo       | pta 项目配置说明 暂不支持自定义 | Boolean  | -      | false        |
| sortableConfig | 表格排序                        | Object   | -      | {}           |

#### 参数 部分说明

##### initData

| 属性      | 说明                      | 类型     |
| --------- | ------------------------- | -------- |
| initApi   | 获取和更新 table 数据 api | Function |
| getParams | api 需要的参数            | Function |

```javascript
initData: {
  async initApi() {},
  getParams: () => ({}),
},

```

##### searchInfos / btnInfos

```javascript
 btnInfos:{
  // 导入
  import: { onClick: async () => true, permissionCode:'xxx' },
  // 导出
  export: { label: "", onClick: () => {},onClick: async () => true,permissionCode:'xxx' },
  // 新增
  add: {label: "", onClick: async () => true,permissionCode:'xxx' },
  // 删除
  delete: { onClick: async () => true,onClick: async () => true,permissionCode:'xxx' }
 }

searchInfos:{
  // select筛选框
  select: {
    // 初始值
    initSelectValue: () => "",
    // 传给后端的字段，默认为countryId
    bindKey: "countryId",
    // 是否为空 不能与initSelectValue一同使用 为false时默认选中选项第一个
    isEmpty: true,
    //获取options的api 可直接传[{label:"",value:""}]
    options: {
      api: async () => true,
      getParams: () => ({}),
      buildItem: () => ({}),
    },
  },
  // input输入搜索框
  input: {
    // 传给后端的字段，默认为key
    bindKey: "key",
  },
}
```

##### tableBase

```javascript
tableBase:{
 //1.表格的column配置
 tableColumns : {
  label: "",
  // 显示的字段
  key: "",
  // column的属性
  vBind:{
    width: "",
    minWidth: "",
    sortable:"custom", // 和官网配置一致，若需要后端排序需要传sortableConfig
    xxx:""
  }
  hideToolTip: false,
  // 是否自定义列内容 配合插槽column-{key}使用
  isCustom: false,
  // 取值的方法
  formatter: (row,row[column[key]]) => {},
  // 对齐方式
  align: 'left'
 },
 //2.操作列的配置
 operateConfig:{
    edit: { onClick: async () => true, permissionCode:'xxx' },
    delete: { onClick: async () => true, permissionCode:'xxx' },
 }
 // 3.是否需要选择列和操作列等
 hasSelection: false,
 hasOperation: false,
 // 是否有边框
 hasBorder: false,
 operateWidth: 100,
 // table的属性
 tableConfig: {},
}
```

```javascript
{
  sortableConfig: {
    buildParams(column, prop, order);
  }
}
```

### 组件事件

| 事件名称     | 说明                  | 回调参数  |
| ------------ | --------------------- | --------- |
| selectChange | select change 时触发  | (val)     |
| inputChange  | input change 时触发   | (val)     |
| getOptions   | 获取到 options 后触发 | (options) |

### 插槽

| 方法名称     | 说明               | 作用域                 |
| ------------ | ------------------ | ---------------------- |
| operate-cell | 操作列除编辑删除外 | scope.row              |
| column-{key} | isCustom: true,    | {row,index,val,column} |
