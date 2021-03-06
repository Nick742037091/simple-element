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
      cancelBtnLabel="关闭"
      @submit="submit"
      @cancel="close"
    >
      <template slot="render-item" slot-scope="{ prop }">
        <el-checkbox-group v-if="prop === 'tags'" v-model="form.tags">
          <el-checkbox
            v-for="(item, index) in tagList"
            :label="index"
            :key="`tag-${index}`"
            >{{ item }}
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </com-form>
  </com-dialog>
</template>

<script>
import ComDialog from '@pkg/com-dialog'
import ComForm from '@pkg/com-form'
import formRules, { getRangeNumber } from '@/utils/formRules'

const defaultForm = {
  name: '',
  phone: '',
  sex: 0,
  age: 0,
  remark: '',
  tags: []
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
      tagList: ['篮球', '音乐', '编程']
    }
  },
  computed: {
    // 表单选项
    rowList() {
      return [
        [
          {
            type: 'input',
            label: '姓名',
            prop: 'name',
            required: true,
            hideLabel: true,
            width: '100%'
          }
        ],
        [
          {
            type: 'input',
            label: '手机号',
            prop: 'phone',
            required: true,
            newline: true,
            rules: [formRules.mobile],
            width: '100%',
            showToolTip: true,
            toolTipLabel: '请输入手机号'
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
            rules: [getRangeNumber({ min: 0 })],
            hidden: this.form.sex === 1
          }
        ],
        [
          {
            type: 'input',
            label: '备注',
            prop: 'remark',
            compProp: { type: 'textarea', rows: 3 },
            width: '100%',
            labelWidth: '150px'
          }
        ],
        [
          {
            label: '标签',
            prop: 'tags',
            render: true,
            required: true,
            requireType: 'array'
          }
        ]
      ]
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
