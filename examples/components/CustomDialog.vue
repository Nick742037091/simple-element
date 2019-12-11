<template>
  <com-dialog
    :visible="show"
    :before-close="close"
    title="Form表单标题"
    :loading="loading"
    max-height="60vh"
  >
    <com-form
      ref="com-form"
      :form="form"
      :row-list="rowList"
      :loading="loading"
      @submit="submit"
      @cancel="close"
    />
  </com-dialog>
</template>

<script>
import ComDialog from '@pkg/com-dialog'
import ComForm from '@pkg/com-form'
import formRules, { getRangeNumber } from '@/utils/formRules'

// 表单选项
const rowList = [
  [
    {
      type: 'input',
      label: '姓名',
      prop: 'name',
      required: true
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'phone',
      required: true,
      rules: [formRules.mobile]
    }
  ],
  [
    {
      type: 'radio-group',
      label: '性别',
      prop: 'sex',
      required: true,
      options: [
        { value: 0, label: '男' },
        { value: 1, label: '女' }
      ]
    },
    {
      type: 'input-number',
      label: '年龄',
      prop: 'age',
      required: true,
      compProp: {
        min: 0
      },
      rules: [getRangeNumber({ min: 0 })]
    }
  ],
  [
    {
      type: 'input',
      label: '备注',
      prop: 'remark',
      compProp: { type: 'textarea', rows: 3 },
      width: '100%'
    }
  ]
]

const defaultForm = {
  name: '',
  phone: '',
  sex: 0,
  age: 0,
  remark: ''
}

export default {
  name: 'CustomDialog',
  components: { ComDialog, ComForm },

  model: {
    prop: 'show',
    event: 'setShow'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      form: { ...defaultForm },
      rowList
    }
  },
  watch: {
    async show(value) {
      if (!value) {
        this.form = { ...defaultForm }
        await this.$nextTick()
        this.$refs['com-form'].clearValidate()
      }
    }
  },
  methods: {
    async submit() {
      const valid = await this.$refs['com-form'].validate()
      if (!valid) return
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.close()
      }, 2000)
    },
    close() {
      this.$emit('setShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.form-block {
  height: 2000px;
  background-color: red;
}
</style>
