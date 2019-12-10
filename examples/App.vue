<template>
  <div id="app">
    <el-button @click="showDialog = true">显示弹窗</el-button>
    <custom-dialog v-model="showDialog" />
  </div>
</template>

<script>
import CustomDialog from './components/CustomDialog'

export default {
  name: 'app',
  components: { CustomDialog },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {}
}
</script>
