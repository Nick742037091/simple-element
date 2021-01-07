<template>
  <el-dialog
    :visible="visible"
    :before-close="beforeClose || close"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    custom-class="com-dialog"
    v-bind="$attrs"
    top="0px"
  >
    <div ref="content" class="dialog-content" :style="dialogStyle">
      <slot />
    </div>

    <div v-if="$slots['title']" slot="title">
      <slot name="title" />
    </div>
    <div v-else slot="title" class="dialog-title">
      {{ title }}
      <i v-if="loading" class="el-icon-loading" />
    </div>
    <div v-if="$slots['footer']" slot="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ComDialog',
  props: {
    // 当作为子组件时，搭配visible和beforeClose搭配以替换v-model，避免出现直接更改prop的问题
    // 是否显示弹窗
    visible: {
      type: Boolean,
      default: false,
    },
    // 点击关闭按钮的回调
    beforeClose: {
      type: Function,
      default: null,
    },
    // 弹窗宽度
    title: {
      type: String,
      default: '',
    },
    // 弹窗宽度，自动居中
    width: {
      type: String,
      default: '',
    },
    // 弹窗内容区域高度,自动居中
    maxHeight: {
      type: String,
      default: '70vh',
    },
    // 是否显示标题的loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 点击modal是否关闭弹窗
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
  },
  // v-model单独使用
  model: {
    prop: 'visible',
    event: 'setVisible',
  },
  data() {
    return {
      content: null,
    }
  },
  computed: {
    dialogStyle() {
      return {
        maxHeight: this.maxHeight,
      }
    },
  },
  watch: {
    async visible(newVal) {
      if (newVal) {
        await this.$nextTick()
        const content = this.$refs.content
        content.scrollTo(0, 0)
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit('setVisible', false)
    },
  },
}
</script>

<style lang="scss" scoped></style>

<style lang="scss">
@import '@/assets/css/flex.scss';
@import '@/assets/css/variable.scss';
.com-dialog {
  @include absolute-center;
  position: absolute !important;
  .dialog-content {
    overflow: auto;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .dialog-title {
    .el-icon-loading {
      color: $blue;
      font-size: 20px;
    }
  }
}
.com-dialog-fullscreen {
  width: 100% !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .el-dialog__body {
    padding: 20px;
  }
}
</style>
