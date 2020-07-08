<template>
  <div class="com-form-item-block" :class="{'com-form-item__newline': newline}">
    <el-tooltip
      v-if="showToolTip"
      :content="toolTipLabel || label"
      placement="bottom"
      popper-class="medium-tooltip"
    >
      <el-form-item
        :label="label ? `${label}:` : ''"
        :label-width="labelWidth"
        :prop="prop"
        :required="required"
        class="com-form-item"
      >
        <slot />
      </el-form-item>
    </el-tooltip>
    <el-form-item
      v-else
      :label="label ? `${label}:` : ''"
      :label-width="labelWidth"
      :prop="prop"
      :required="required"
      class="com-form-item"
    >
      <slot />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'ComFormItem',
  props: {
    showToolTip: {
      type: Boolean,
      default: false
    },
    toolTipLabel: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    newline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
@import '@/assets/css/flex.scss';
.com-form-item-block {
  padding: 0 10px;

  //设置表单元素块换行并铺满整行
  &.com-form-item__newline {
    .com-form-item {
      width: 100%;
    }
    .el-form-item__content {
      clear: both;
      margin-left: 0 !important;
    }
  }
}
.medium-tooltip {
  font-size: 15px;
  line-height: 1.5;
}
</style>
