<template>
  <div class="app">
    <com-table
      v-loading="loading"
      class="com-table"
      :search-fields="searchFields"
      :search-params="searchParams"
      :table-data="tableData"
      :table-column="tableColumn"
      :table-formatter="tableFormatter"
      :table-filters="tableFilters"
      :filter-params="filterParams"
      :sort-params="sortParams"
      :pagination="pagination"
      :selected="selected"
      :tableProp="tableProp"
      table-row-key="uid"
      show-more-btn
      show-search-bar
      show-pagination
      show-add
      show-mutil-del
      draggable
      :auto-reset="true"
      :show-search-block="true"
      @getList="getList"
      @onAdd="showDialog = true"
      @onMoreSubmit="getList"
    >
      <div slot="search-front" class="flex-row">
        <div class="text-block">搜索前置插槽</div>
      </div>
      <div slot="search-before-search" class="flex-row">
        <div class="text-block">搜索按钮前置插槽</div>
      </div>
      <div slot="search-middle" class="flex-row">
        <div class="text-block">搜索中间插槽</div>
      </div>

      <template slot="table-custom" slot-scope="{ colKey }">
        <div v-if="colKey === 'operation'">
          <el-button type="primary" size="small">编辑</el-button>
        </div>
      </template>
    </com-table>

    <custom-dialog v-model="showDialog" />
    <el-backtop target=".app"></el-backtop>
  </div>
</template>

<script>
import { setAsyncTimeout, listToFilters } from '@/utils'
import CustomDialog from './components/CustomDialog'
import ComTable from '@pkg/com-table'

const SexType = ['男', '女']

const dataList = [
  { uid: 1, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 2, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 3, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 4, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 5, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 6, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 7, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 8, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 9, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 10, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 11, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 12, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 13, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 14, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 15, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 16, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { uid: 17, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { uid: 18, name: 'lily', phone: '12345678910', sex: 1, age: 26 }
]
export default {
  name: 'app',
  components: {
    CustomDialog,
    ComTable
  },
  data() {
    return {
      showDialog: false,
      loading: false,
      tableProp: {},
      tableColumn: [
        { type: 'selection' },
        { field: 'name', label: '姓名', fixed: 'right' },
        { field: 'phone', label: '手机', sortable: true },
        { field: 'sex', label: '性别', singleFilter: true },
        {
          field: 'age',
          label: '年龄',
          sortable: true,
          render: true
        },
        { type: 'drag' },
        { field: 'operation', label: '操作', render: true, width: 150 }
      ],
      searchFields: ['name', 'phone'],
      searchParams: { key: 'name', word: 'aaa' },
      pagination: {
        total: 1,
        listRows: 20,
        page: 1
      },
      filterParams: {},
      sortParams: {},
      selected: [],
      tableData: [],
      timeParams: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tableFilters(colName) {
      switch (colName) {
        case 'sex':
          return listToFilters(SexType)
        default:
          break
      }
    },
    tableFormatter(row, column, value) {
      switch (column.property) {
        case 'sex':
          return SexType[value]
        default:
          break
      }
      return value
    },
    async getList() {
      this.loading = true
      await setAsyncTimeout(500)
      // 模拟表格数据
      this.tableData = dataList
      // 模拟表格分页
      this.pagination = {
        total: 100,
        listRows: 20,
        page: this.pagination.page
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  overflow: auto;
}
.com-table {
  margin-top: 20px;
}
// .search-middle {
// }
.text-block {
  // width: 100px;
  outline: 1px solid gray;
}
</style>
