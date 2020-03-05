# 介绍

## 对 element 常用组件的封装，易于上手。

# 安装

## npm:

> \$ npm install simple-element

## yarn:

> \$ yarn add simple-element

# 快速使用

```
// main.js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SimpleElement from 'simple-element'

// 引入Element组件，可按需引入 https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru
Vue.use(ElementUI)
// 引入SimpleElement组件
Vue.use(SimpleElement)

```

## 通用组件

### com-dialog

通用弹窗组件，内部实现滚动和关闭自动回滚到顶部的功能。用于作为组件根布局。

|         属性         |   类型   | 默认值 |             描述              |
| :------------------: | :------: | :----: | :---------------------------: |
|       visible        |   bool   | false  |           是否可见            |
|        title         |  string  |   ''   |             标题              |
|       loading        |   bool   | false  |   是否显示标题栏的 loading    |
| close-on-click-modal |   bool   | false  |     点击modal是否关闭弹窗     |
|        width         |  string  |   ''   |           弹窗宽度            |
|      max-height      |  string  | '70vh' |     弹窗内容区域最大高度      |
|     before-close     | function |  null  |    点击关闭按钮的回调函数     |
|       其他属性       |    --    |   --   | 自动绑定在内部el-dialog组件上 |

### com-form

通用表单组件，封装了表单元素的自动生成、校验、确认按钮和取消按钮。

|      属性      |  类型   | 默认值  |                              描述                              |
| :------------: | :-----: | :-----: | :------------------------------------------------------------: |
|      form      | object  |   {}    |                            表单数据                            |
|     inline     | boolean |  false  |                 表单元素和标题是否显示在同一行                 |
|   renderAll    | boolean |  false  |      是否全部表单元素通过插槽插入，不使用自动生成组件功能      |
|     rules      | object  |   {}    |       表单校验规则，非空时才有效，与 renderAll 搭配使用        |
| labelPosition  | string  | 'left'  |            表单元素标题位置，可选值：top/left/right            |
|   labelWidth   | string  | '100px' |                        表单元素标题宽度                        |
|    loading     | boolean |  false  | 是否显示加载状态。加载时，表单区域会显示半透明，不可输入和点击 |
|     rowLen     | number  |    2    |                    每一行容纳的表单元素数量                    |
| submitBtnLabel | string  | '确认'  |                          确认按钮文字                          |
| cancelBtnLabel | string  | '取消'  |                          取消按钮文字                          |
| showBottomBtn  | boolean |  true   |                     显示底部确认和取消按钮                     |
| showSubmitBtn  | boolean |  true   |                        显示底部确认按钮                        |
| showCancelBtn  | boolean |  true   |                        显示底部取消按钮                        |
|    rowList     |  array  |   []    |             可根据该属性自动生成表单元素,详情如下              |

#### rowList 属性为二维数组，元素可为以下选项

1. 对象，用于单独实现一行表单数组。值为{ render: true, type: xxx, ...}，即必须包含 render 属性且值为 true。
2. 数组，对应的字段如下表。

|    键值     |  类型   |                                  描述                                   |
| :---------: | :-----: | :---------------------------------------------------------------------: |
|   hidden    | boolean |                                是否隐藏                                 |
|    type     | string  | 表单元素类型，可选值：input/textarea/date-picker/radio-group/com-select |
|    label    | string  |                            表单元素标题内容                             |
|    prop     | string  |                标识表单元素在 form 表单中对应的唯一属性                 |
|  required   | boolean |                          表单元素是否不能为空                           |
|    width    | string  |   表单元素宽度，支持百分比和带单位数值，不指定则为整行宽度除以 rowLen   |
|  disabled   | boolean |                         是否设置为不可输入状态                          |
|   render    | boolean |                        是否以插槽实现自定义渲染                         |
|    rules    |  array  |                                校验规则                                 |
| placeholder | string  |                   自定义 placeholder,为空时会自动生成                   |
|  compProp   | object  |                  表单元素的相关属性，会直接透传给组件                   |
|   options   |  array  |    用于如 radio-group 等的选项列表，不同类型会有不同的字段，详情如下    |
|  hideLabel  | boolean |                        是否隐藏标题,默认为false                         |
| labelWidth  | boolean |                标题宽度，不设置时取com-form的labelWidth                 |

##### radio-group 类型元素 options

| 键值  |     类型     |    描述    |
| :---: | :----------: | :--------: |
| value | string/value |  选项的值  |
| label |    string    | 选项的标题 |

#### 回调事件

|  事件  |     描述     | 参数  |
| :----: | :----------: | :---: |
| submit | 点击确认按钮 |   -   |
| cancel | 点击取消按钮 |   -   |

#### 插槽

- default。renderAll 为 true 时对应的插槽。
- render-row。rowList 对象元素对应的插槽 。

  | slot-scope 属性 |  类型  |       描述       |
  | :-------------: | :----: | :--------------: |
  |      type       | string | 对象的 type 属性 |
  |    formData     | array  |     表单数据     |

- render-item。rowList 数组元素某一项自定义内容对应的插槽 。

  | slot-scope 属性 |  类型  |       描述       |
  | :-------------: | :----: | :--------------: |
  |    formData     | array  |     表单数据     |
  |      item       | object | 该项数据完整内容 |
  |      prop       | string | 数据的 prop 属性 |
  |    indexRow     | number | 数据对应的列索引 |
  |    indexItem    | number | 数据对应的行索引 |

- bottom-btn。自定义底部确认和取消按钮的插槽，非空时会替换默认的按钮。

### com-form-item

表单元素的包装层，封装了 tooltip。

|     属性      |  类型   | 默认值  |                   描述                    |
| :-----------: | :-----: | :-----: | :---------------------------------------: |
|  showToolTip  |  bool   |  false  |             是否包装 tooltip              |
| toolTipLabel  | string  |   ''    |               tooltip 内容                |
|     label     | string  |   ''    |               表单元素标题                |
|     prop      | string  |   ''    |               表单唯一标识                |
|   required    | boolean |  false  |                 是否必需                  |
|  labelWidth   | string  | '100px' |             表单元素标题宽度              |
| labelPosition | string  | 'left'  | 表单元素标题位置，可选值为 left/right/top |

### com-table

表格组件元素的包装层，封装顶部搜索栏、侧弹选项栏和底部分页栏。

#### 搜索栏相关的属性

|      属性       |  类型   |      默认值      |                        描述                        |
| :-------------: | :-----: | :--------------: | :------------------------------------------------: |
|   controlSize   | string  |      medium      |                按钮、输入控件的大小                |
|  showSearchBar  | boolean |       true       |                是否显示顶部的搜索栏                |
| showSearchBlock | boolean |       true       | 是否显示顶部的搜索区域(搜索类型，关键字和搜索按钮) |
|  searchFields   |  array  |        []        |             可搜索的字段，为字符串数组             |
|  searchParams   | object  | {key:'',word:''} |                      搜索参数                      |
|   showMoreBtn   | boolean |      false       |     是否显示更新选项按钮，点击显示侧弹 drawer      |
|  moreBlockProp  | object  |        {}        |              透传给侧弹 drawer 的属性              |
|    showHide     | boolean |      false       |                是否显示隐藏筛选区域                |
|     showAdd     | boolean |      false       |                  是否显示新增按钮                  |
|    autoReset    | boolean |       true       |           重置之后是否回调 getList 事件            |

#### 表格相关的属性

|      属性      |   类型   | 默认值 |                                     描述                                     |
| :------------: | :------: | :----: | :--------------------------------------------------------------------------: |
|   tableData    |  array   |   []   |                                   表格数据                                   |
|  tableColumn   |  array   |   []   |                                  表格列字段                                  |
|  filterParams  |  object  |   {}   |                                 表格过滤参数                                 |
|   sortParams   |  object  |   {}   |                                 表格排序参数                                 |
| tableFormatter | function |  null  |     表格格式化函数，参考https://element.eleme.cn/#/zh-CN/component/table     |
|  tableFilters  | function |  null  | 表格获取过滤参数的函数，参考https://element.eleme.cn/#/zh-CN/component/table |
|    selected    |  array   |   []   |                                 表格已选择行                                 |
|   tableProp    |  array   |   {}   |                              table 组件其他属性                              |
|   draggable    | boolean  | false  |                               表格行是否可拖动                               |

#### 分页栏相关的属性

|      属性      |  类型   | 默认值 |         描述         |
| :------------: | :-----: | :----: | :------------------: |
| showPagination | boolean | false  |    是否显示分页栏    |
|   pagination   | object  |   {}   |       分页参数       |
|  showMutilDel  | boolean | false  | 是否显示批量删除按键 |

#### 回调事件

|     事件     | 参数  |                                   描述                                   |
| :----------: | :---: | :----------------------------------------------------------------------: |
|   getList    |       | 请求列表事件，在点击搜索按钮、修改过滤、排序、分页和重置之后会回调该事件 |
|    onAdd     |       |                      在点击新增按钮之后会回调该事件                      |
|   onReset    |       |                      在点击重置按钮之后会回调该事件                      |
|  onMutilDel  |       |                  在点击批量删除按钮重置之后会回调该事件                  |
| onMoreSubmit |       |                 在点击侧弹的确认按钮重置之后会回调该事件                 |

#### 插槽

- search-middle。搜索栏中间区域的插槽。
- more-options。侧弹栏的插槽。
- table-custom。表格自定义列的插槽。

  | slot-scope 属性 |  类型  |         描述          |
  | :-------------: | :----: | :-------------------: |
  |       row       | array  |      表单行数据       |
  |     column      | object |      表单列信息       |
  |     colKey      | string |  表格列对应的 field   |
  |       val       | number | 表格列 field 对应的值 |
  |      index      | number |      表格行索引       |

- bottom。表格底部搜索栏中间插槽。
