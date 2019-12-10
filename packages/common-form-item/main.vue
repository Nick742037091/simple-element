<template>
  <div class="common-form-item">
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
.common-form-item {
  padding: 0 10px;
}
.medium-tooltip {
  font-size: 15px;
  line-height: 1.5;
}
</style>
