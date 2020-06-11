<template>
  <el-form
    ref="el-form"
    :model="form"
    :inline="inline"
    :label-position="labelPosition"
    :rules="formRules"
    :disabled="loading"
    @submit.native.prevent
  >
    <slot v-if="renderAll" />
    <template v-else>
      <div v-for="(row, i_row) in rowList" :key="`row-${i_row}}`">
        <div v-if="Array.isArray(row)" class="com-form-row">
          <div
            v-for="(item, i_item) in row"
            :key="`fotm-item-${i_item}`"
            :style="formItemStyle(item)"
          >
            <com-form-item
              v-if="!item.hidden"
              :label-width="getLabelWidth(item)"
              :label="getLabel(item)"
              :prop="item.prop"
              :required="item.required"
              :show-tool-tip="!!item.toolTipLabel"
              :tool-tip-label="item.toolTipLabel"
              class="com-form-item"
            >
              <slot
                v-if="item.render"
                :prop="item.prop"
                :item="item"
                :formData="form"
                :indexRow="i_row"
                :indexItem="i_item"
                name="render-item"
              />
              <template v-else>
                <el-radio-group
                  v-if="item.type === 'radio-group'"
                  v-model="form[item.prop]"
                  v-bind="getCompProp(item)"
                >
                  <template v-if="item.options">
                    <el-radio
                      v-for="(opt, index) in item.options"
                      :key="`${item.prop}-radio-${index}`"
                      :label="opt.value"
                      :disabled="opt.disabled"
                    >{{ opt.label }}</el-radio>
                  </template>
                </el-radio-group>
                <component
                  v-else
                  :is="getCompName(item)"
                  v-model="form[item.prop]"
                  v-bind="getCompProp(item)"
                />
              </template>
            </com-form-item>
          </div>
        </div>
        <slot v-else-if="row.render" name="render-row" :type="row.type" :formData="form" />
      </div>
    </template>

    <div v-if="!$slots['bottom-btn']" class="btn-block">
      <template v-if="showBottomBtn">
        <el-button
          v-if="showSubmitBtn"
          type="primary"
          size="small"
          native-type="submit"
          :loading="loading"
          @click="submit"
        >{{ submitBtnLabel }}</el-button>
        <el-button v-if="showCancelBtn" size="small" @click="cancel">{{ cancelBtnLabel }}</el-button>
      </template>
    </div>
    <slot v-else name="bottom-btn" />
  </el-form>
</template>

<script>
import { getPlaceholder } from './placeholder.js'
import ComFormItem from '../com-form-item'
import { error } from '@/utils'

const ClearableType = ['select', 'input', 'input-number', 'date-picker']
export default {
  name: 'ComForm',
  components: { ComFormItem },
  filters: {},
  props: {
    // 表单数据
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表单元素和标题是否显示在同一行
    inline: {
      type: Boolean,
      default: false
    },
    // 是否全部表单元素通过插槽插入，不使用自动生成组件功能
    renderAll: {
      type: Boolean,
      default: false
    },
    // 表单校验规则，非空时才有效，与 renderAll 搭配使用
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 表单元素标题位置，可选值：top/left/right
    labelPosition: {
      type: String,
      default: 'left'
    },
    // 表单元素标题宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 是否显示加载状态。加载时，表单区域会显示半透明，不可输入和点击
    loading: {
      type: Boolean,
      default: false
    },
    // 可根据该属性自动生成表单元素
    rowList: {
      type: Array,
      default: () => []
    },
    // 每一行容纳的表单元素数量
    rowLen: {
      type: Number,
      default: 2
    },
    //显示底部确认和取消按钮
    showBottomBtn: {
      type: Boolean,
      default: true
    },
    //显示底部确认按钮
    showSubmitBtn: {
      type: Boolean,
      default: true
    },
    //显示底部取消按钮
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    // 确认按钮文字
    submitBtnLabel: {
      type: String,
      default: '确定'
    },
    // 取消按钮文字
    cancelBtnLabel: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    itemMap() {
      const map = {}
      this.rowList.forEach(row => {
        const list = (Array.isArray(row) ? row : row.list) || []
        list.forEach(item => {
          map[item.prop] = item
        })
      })
      return map
    },
    formRules() {
      if (!Object.keys(this.rules).length === 0) return this.rules
      const map = {}
      for (const prop in this.itemMap) {
        const item = this.itemMap[prop]
        const { required, rules, type } = item
        const emptyValidator = (rule, value, callback) => {
          // 加入loading的判断，避免页面打开时候报错
          if (!required || this.loading) return callback()
          if (value === '' || value === undefined || value === null) {
            if (
              type === 'select' ||
              type === 'com-select' ||
              type === 'radio-group'
            ) {
              const msg = '请选择' + item.label
              return callback(new Error(msg))
            }
            const msg = '请输入' + item.label
            return callback(new Error(msg))
          } else {
            callback()
          }
        }
        // TODO 去除除非空校验之前的其他校验错误log
        // required的属性必须有默认值,避免空值报错
        map[prop] = rules || []
        map[prop] = map[prop].concat([
          {
            required,
            type: 'number',
            validator: emptyValidator
          }
        ])
      }
      return map
    }
  },
  methods: {
    formItemStyle(item) {
      if (item.hidden) {
        return {
          width: '0px'
        }
      }
      const { width } = item
      if (width) {
        return { width }
      }
      return {
        width: (100 / this.rowLen).toFixed(3) + '%'
      }
    },
    getLabel(item) {
      if (item.hideLabel) return ''
      return item.label || ''
    },
    getLabelWidth(item) {
      if (item.hideLabel) return '0px'
      return item.labelWidth || this.labelWidth
    },
    getCompName(item) {
      if (item.customComp) {
        return item.type
      } else {
        return `el-${item.type}`
      }
    },
    // 预处理placeholder
    getItemPlaceholder(item) {
      const { type, label, compProp } = item
      if (compProp && compProp.placeholder != undefined)
        return compProp.placeholder
      return getPlaceholder(type, label)
    },
    getCompProp(item) {
      const res = {
        placeholder: this.getItemPlaceholder(item)
      }
      // 默认clearable都设置为true
      if (ClearableType.includes(item.type)) {
        res.clearable = true
      }
      const { compProp } = item
      if (!compProp) return res
      for (const prop in compProp) {
        if (prop !== 'placeholder') {
          res[prop] = compProp[prop]
        }
      }
      return res
    },
    async validate() {
      try {
        await this.$refs['el-form'].validate()
        return true
      } catch (e) {
        error('填写的内容有误', { customClass: 'com-form-validate-error' })
        return false
      }
    },
    // 清空校验值
    clearValidate() {
      this.$refs['el-form'].clearValidate()
    },
    submit() {
      this.$emit('submit')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/flex.scss';
.btn-block {
  @include flex-row;
  @include flex-center;
  margin: 15px 0 0;
}
</style>

<style lang="scss">
@import '@/assets/css/flex.scss';
.com-form-validate-error {
  z-index: 3000 !important;
}
.com-form-row {
  @include flex-row;
  @include align-center;
  .com-form-item {
    padding: 0 10px;
  }
  // 扩展选择框宽度
  .el-input-number,
  .el-select,
  .el-date-editor {
    width: 100%;
  }
}
</style>
