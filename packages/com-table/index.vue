<template>
  <div class="common-table">
    <!-- 顶部搜索栏 -->
    <div v-if="showSearchBar" class="search-bar">
      <div class="left-block">
        <div class="search-front">
          <slot name="search-front" />
        </div>

        <el-select
          v-if="showSearchBlock"
          v-model="searchKey"
          placeholder="请选择搜索类型"
          class="search-key"
          :size="controlSize"
          filterable
          clearable
        >
          <el-option
            v-for="(item, index) in searchFields"
            :label="getColumnLabel(item)"
            :value="item"
            :key="'search-field-' + index"
          />
        </el-select>
        <el-input
          v-if="showSearchBlock"
          v-model="searchWord"
          placeholder="请输入关键字"
          clearable
          type="text"
          class="search-input"
          :size="controlSize"
        />
        <div class="search-before-search">
          <slot name="search-before-search" />
        </div>
        <el-button
          v-if="showSearchBlock"
          type="primary"
          :size="controlSize"
          class="search-btn"
          icon="el-icon-search"
          @click="onSearch"
        >搜索</el-button>
        <el-button
          v-if="showMoreBtn"
          :icon="showMore ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          type="info"
          class="show-more-btn"
          :size="controlSize"
          @click="showMore = !showMore"
        >更多选项</el-button>
        <div class="search-middle">
          <slot name="search-middle" />
        </div>
      </div>

      <el-button
        v-if="showAdd"
        type="success"
        :size="controlSize"
        class="add-btn right-block"
        icon="el-icon-circle-plus-outline"
        @click="$emit('onAdd')"
      >新增</el-button>
    </div>
    <el-drawer :visible.sync="showMore" title="更多选项" v-bind="getMoreBlockProp()">
      <div class="more-options-drawer flex-main">
        <div class="flex-main">
          <div class="hidden-select-block" v-if="showHide">
            <div :style="controlFontStyle">隐藏字段</div>
            <el-select
              :size="controlSize"
              v-model="hiddenTableColumn"
              placeholder="请选择隐藏字段"
              class="hidden-select"
              multiple
              collapse-tags
              filterable
            >
              <el-option
                v-for="(item, index) in defaultTableColumn"
                :key="'hidden-column-index-' + index"
                :label="getColumnLabel(item)"
                :value="item"
              />
            </el-select>
          </div>
          <slot name="more-options"></slot>
        </div>

        <div class="btn-block">
          <el-dropdown
            v-if="showHide"
            :size="controlSize"
            type="info"
            class="hidden-reset"
            split-button
            placement="top-end"
            @command="onResetCommand"
            @click="onResetClick"
          >
            重置
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :size="controlSize" command="filter" icon="el-icon-arrow-down">重置筛选项</el-dropdown-item>
              <el-dropdown-item
                :size="controlSize"
                command="search"
                divided
                icon="el-icon-search"
              >重置搜索</el-dropdown-item>
              <el-dropdown-item :size="controlSize" command="sort" divided icon="el-icon-sort">重置排序</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            type="primary"
            icon="el-icon-success"
            :size="controlSize"
            @click="onMoreSumbit"
          >确定</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 表格区域 -->
    <el-table
      ref="dataTable"
      :data="tableData"
      v-bind="getTableProp()"
      @selection-change="onSelectionChange"
      @filter-change="onFilterChange"
      @sort-change="onSortChange"
    >
      <template v-for="(val, key) in tableColumn">
        <!-- 拖动icon -->
        <el-table-column
          :key="'table-column-' + key"
          v-if="val.type === 'drag'"
          align="center"
          width="40"
        >
          <template>
            <i class="el-icon-rank" />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!val.hidden && val.render"
          :type="val.type"
          :column-key="val.field"
          :label="columnName(val)"
          :prop="val.field"
          :formatter="tableFormatter && tableFormatter"
          :filters="tableFilters && tableFilters(val.field)"
          :filtered-value="filterValue(val.field)"
          :filter-multiple="!val.singleFilter"
          :sortable="val.sortable"
          :width="val.width"
          :key="'table-column-' + key"
          :fixed="val.fixed"
        >
          <template slot-scope="{ row, column, $index }">
            <slot
              :row="row"
              :column="column"
              :colKey="column.columnKey"
              :val="row[column.columnKey]"
              :index="$index"
              name="table-custom"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!val.hidden && !val.render"
          :type="val.type"
          :fixed="val.fixed"
          :column-key="val.field"
          :prop="val.field"
          :label="columnName(val)"
          :formatter="tableFormatter && tableFormatter"
          :filters="tableFilters && tableFilters(val.field)"
          :filtered-value="filterValue(val.field)"
          :filter-multiple="!val.singleFilter"
          :sortable="val.sortable"
          :width="val.width"
          :key="'table-column-' + key"
        />
      </template>
    </el-table>
    <!-- 底部分页导航栏 -->
    <div v-if="showPagination" class="pagination-container">
      <div class="flex-main flex-row">
        <el-button v-if="showMutilDel" :size="controlSize" type="danger" @click="onMutilDelete">批量删除</el-button>
        <slot name="bottom" />
      </div>
      <el-pagination
        :current-page="pagination.page"
        :page-sizes="pageSizes"
        :page-size="pagination.limit"
        :total="pagination.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import {
  calShortcuts,
  isEmptyObj,
  error,
  mergeObserveObj,
  clearObserveObj,
  replaceObserveArray
} from '@/utils'
import moment from 'moment'

export default {
  name: 'ComTable',
  props: {
    // 按钮、输入框等控件的大小
    controlSize: {
      type: String,
      default: 'medium'
    },
    /******** 搜索栏属性 *********/
    // 搜索栏
    showSearchBar: {
      type: Boolean,
      default: false
    },
    // 搜索栏搜索区域
    showSearchBlock: {
      type: Boolean,
      default: true
    },
    // 可搜索的字段
    searchFields: {
      type: Array,
      default: () => []
    },
    // 搜索参数
    searchParams: {
      type: Object,
      default: () => {
        return {
          key: '',
          word: ''
        }
      }
    },
    // 显示更多选项按钮
    showMoreBtn: {
      type: Boolean,
      default: false
    },
    // 更多选项drawer组件的属性
    moreBlockProp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否显示隐藏区域
    showHide: {
      type: Boolean,
      default: true
    },
    // 是否显示新增按键
    showAdd: {
      type: Boolean,
      default: false
    },
    // 重置之后是否回调getList事件
    autoReset: {
      type: Boolean,
      default: true
    },
    /******** 表格属性 *********/
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格列字段
    tableColumn: {
      type: Array,
      default: () => []
    },
    // 表格过滤的参数
    filterParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表格排序参数
    sortParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表格格式化函数
    tableFormatter: {
      type: Function,
      default: null
    },
    // 表格获取过滤参数的函数
    tableFilters: {
      type: Function,
      default: null
    },
    // 表格已选择行
    selected: {
      type: Array,
      default: () => []
    },
    // table组件其他属性
    tableProp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表格行是否可拖动
    draggable: {
      type: Boolean,
      default: false
    },

    /******** 分页栏属性 *********/
    // 是否显示分页栏
    showPagination: {
      type: Boolean,
      default: false
    },
    // 分页参数
    pagination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageSizes: {
      type: Object,
      default: () => {
        return [10, 20, 30, 50, 100]
      }
    },
    // 显示批量删除按键
    showMutilDel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: calShortcuts
      },
      draggableElement: null,
      // 模糊搜索
      searchKey: '',
      searchWord: '',
      // 侧弹更多选项
      showMore: false
    }
  },
  computed: {
    // 控件提示文字大小，设置比控件里的文字大1px
    controlFontStyle() {
      let fontSize = 14
      switch (this.controlSize) {
        case 'mini':
        case 'small':
          fontSize = 12
          break
        case 'medium':
        case 'large':
          fontSize = 14
          break
      }
      return {
        fontSize: fontSize + 1 + 'px'
      }
    },
    // 搜索栏所有字段
    defaultTableColumn() {
      return this.tableColumn.reduce((list, cur) => {
        if (cur.field) {
          list.push(cur.field)
        }
        return list
      }, [])
    },
    // tableColumn转为以filed为键值的map
    columnMap() {
      const map = {}
      this.tableColumn.forEach(item => {
        map[item.field] = item
      })
      return map
    },
    mutilFilters() {
      const map = {}
      this.tableColumn.forEach(item => {
        if (item.mutilFilter) {
          map[item.field] = true
        }
      })
      return Map
    },
    // 搜索栏隐藏字段
    hiddenTableColumn: {
      get: function() {
        return this.tableColumn.reduce((list, item) => {
          if (item.hidden) {
            list.push(item.field)
          }
          return list
        }, [])
      },
      set: function(newVal) {
        this.tableColumn.forEach(item => {
          this.$set(item, 'hidden', newVal.includes(item.field))
        })
      }
    }
  },
  watch: {
    async tableData(newVal) {
      if (newVal.length > 0) {
        await this.$nextTick()
        if (this.draggable) {
          this.setDraggable()
        }
      }
    },
    // 更新搜索参数
    searchKey(value) {
      this.searchParams.key = value
    },
    searchWord(value) {
      this.searchParams.word = value
    }
  },
  mounted() {},
  methods: {
    getTableProp() {
      return {
        fit: true,
        border: true,
        ...this.tableProp
      }
    },
    getMoreBlockProp() {
      return {
        direction: 'rtl',
        size: '400px',
        ...this.moreBlockProp
      }
    },
    getColumnLabel(field) {
      const item = this.columnMap[field]
      return item ? item.label : ''
    },
    columnName(val) {
      if (val.label) return val.label
      return val.field
    },
    filterValue(filed) {
      if (filed in this.filterParams) {
        return this.filterParams[filed]
      } else {
        return []
      }
    },
    // 修改分页每页长度
    onSizeChange(val) {
      this.$set(this.pagination, 'listRows', val)
      this.$emit('getList')
    },
    // 修改分页页数
    onCurrentChange(val) {
      this.$set(this.pagination, 'page', val)
      this.$emit('getList')
    },
    // 搜索参数已自动更新，需要在getList回调中使用
    onSearch() {
      this.$set(this.pagination, 'page', 1)
      this.$emit('getList')
    },
    // 勾选操作
    onSelectionChange(selected) {
      replaceObserveArray(this.selected, selected)
    },
    // 修改过滤参数
    onFilterChange(filter) {
      mergeObserveObj(this.filterParams, filter)
      this.$set(this.pagination, 'page', 1)
      this.$emit('getList')
    },
    // 修改排序参数
    onSortChange(sort) {
      const key = [`sort[${sort.prop}]`]
      if (!sort.order) {
        // 删除排序参数
        this.$delete(this.sortParams, key)
      } else {
        // 更新排序参数
        const value = sort.order === 'ascending' ? 'asc' : 'desc'
        this.$set(this.sortParams, key, value)
      }
      // 更改排序会使当前数据重新排序，但是完整列表需要重新排序，当前列表数据不正确，需要重新从第一页请求数据。
      this.$set(this.pagination, 'page', 1)
      this.$emit('getList')
    },
    // 重置操作
    onResetCommand(command) {
      switch (command) {
        case 'search':
          // 重置搜索
          if (this.searchParams.key === '' && this.searchParams.word === '')
            return
          this.searchKey = ''
          this.searchWord = ''
          break
        case 'filter':
          // 重置过滤
          if (isEmptyObj(this.filterParams)) return
          clearObserveObj(this.filterParams)
          this.$refs.dataTable.clearFilter()
          break
        case 'sort':
          // 重置排序
          if (isEmptyObj(this.sortParams)) return
          clearObserveObj(this.sortParams)
          this.$refs.dataTable.clearSort()
          break
        default:
          break
      }
      // 重置会重新请求数据，需要重置勾选项
      this.$refs.dataTable.clearSelection()
      this.$set(this.pagination, 'page', 1)
      this.$emit('onReset')
      if (this.autoReset) {
        this.$emit('getList')
      }
    },
    // 全部重置按钮
    onResetClick() {
      this.searchKey = ''
      this.searchWord = ''
      clearObserveObj(this.filterParams)
      clearObserveObj(this.sortParams)
      this.$refs.dataTable.clearFilter()
      this.$refs.dataTable.clearSort()
      this.$refs.dataTable.clearSelection()
      this.$emit('onReset')
      if (this.autoReset) {
        this.$set(this.pagination, 'paeg', 1)
        this.$emit('getList')
      }
    },
    // 批量删除功能
    onMutilDelete() {
      if (this.selected.length === 0) {
        error('请选择要操作的项')
        return
      }
      this.$emit('onMutilDel')
    },
    // 更多选项drawer确认按钮
    onMoreSumbit() {
      this.showMore = false
      this.$emit('onMoreSubmit')
    },
    setDraggable() {
      const el = document.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.draggableElement = Sortable.create(el, {
        onEnd: evt => {
          // 更新顺序
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0]
          this.tableData.splice(evt.newIndex, 0, targetRow)
        }
      })
    },
    toggleRowSelection(...params) {
      this.$refs.dataTable.toggleRowSelection(...params)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/flex.scss';
.search-bar {
  @include flex-row;
  @include align-center;
  @include flex-wrap;

  .left-block {
    @include flex-row;
    @include align-center;
    padding-bottom: 10px;

    .search-key,
    .search-input {
      width: 150px;
      margin-right: 5px;
    }
    .search-btn,
    .show-more-btn {
      margin: 0 5px 0 0;
    }
  }

  .search-front,
  .search-before-search {
    margin-right: 5px;
  }

  .add-btn {
    margin-left: auto;
    margin-right: 5px;
    margin-bottom: 10px;
  }
}
.common-table {
  .pagination-container {
    @include flex-row;
    @include align-center;
    margin-top: 30px;
  }
}
.more-options-drawer {
  @include flex-column;
  padding: 10px 20px 20px;

  .hidden-select-block {
    @include flex-row;
    @include align-center;
    .hidden-select {
      @include flex-main;
      margin-left: 15px;
    }
  }
  .btn-block {
    @include flex-column;
    .hidden-reset {
      margin-bottom: 15px;
      // width: 100%;
      .el-button {
        @include flex-main;
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/assets/css/flex.scss';
.common-table {
  .el-table {
    .operation {
      .el-button {
        margin: 5px 5px 5px 5px;
      }
    }
  }
  // 重置筛选icon大小
  .el-table__column-filter-trigger {
    .el-icon-arrow-down {
      font-size: 16px !important;
      color: black !important;
    }
  }

  .el-drawer__body {
    @include flex-column;
  }
  .more-options-drawer {
    .btn-block {
      .hidden-reset {
        .el-button-group {
          @include flex-row;
          .el-button {
            flex: 4;
          }
          .el-dropdown__caret-button {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
