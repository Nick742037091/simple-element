<template>
  <div id="app">
    <com-table
      v-loading="loading"
      class="com-table"
      :search-fields="searchFields"
      :search-params.sync="searchParams"
      :time-params.sync="timeParams"
      :table-data="tableData"
      :table-column.sync="tableColumn"
      :table-formatter="tableFormatter"
      :table-filters="tableFilters"
      :filter-params.sync="filterParams"
      :sort-params.sync="sortParams"
      :pagination.sync="pagination"
      :selected.sync="selected"
      :tableProp="tableProp"
      show-more-btn
      show-search-bar
      show-pagination
      show-add
      show-mutil-del
      draggable
      @getList="getList"
      @onAdd="showDialog = true"
      @onMoreSubmit="getList"
    >
      <div slot="search-middle">测试</div>
      <template slot="table-custom" slot-scope="{row,colKey}">
        <div v-if="colKey === 'operation'">
          <el-button type="primary" size="small">编辑</el-button>
        </div>
      </template>
    </com-table>
    <custom-dialog v-model="showDialog" />
  </div>
</template>

<script>
import { setAsyncTimeout, listToFilters } from '@/utils'
import CustomDialog from './components/CustomDialog'
import ComTable from '@pkg/com-table'

const SexType = ['男', '女']

const dataList = [
  { id: 1, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { id: 2, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { id: 3, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { id: 4, name: 'lily', phone: '12345678910', sex: 1, age: 26 },
  { id: 5, name: 'nick', phone: '12345678910', sex: 0, age: 28 },
  { id: 6, name: 'lily', phone: '12345678910', sex: 1, age: 26 }
]
export default {
  name: 'app',
  components: { CustomDialog, ComTable },
  data() {
    return {
      showDialog: false,
      loading: false,
      tableProp: {},
      tableColumn: [
        { type: 'drag' },
        { type: 'selection' },
        { field: 'name', label: '姓名' },
        { field: 'phone', label: '手机' },
        { field: 'sex', label: '性别' },
        { field: 'age', label: '年龄', sortable: true },
        { field: 'operation', label: '操作', render: true, width: 150 }
      ],
      searchFields: ['name', 'phone'],
      searchParams: { key: '', word: '' },
      pagination: {
        total: 1,
        listRows: 10,
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
    tableFormatter(row, column, value, index) {
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
        listRows: 10,
        page: this.pagination.page
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.com-table {
  margin-top: 20px;
}
</style>
