import CommonDialog from '@pkg/common-dialog/main'
import CommonForm from '@pkg/common-form-item/main'
import CommonFormItem from '@pkg/common-form/main'
import formRules from '@/utils/formRules'
import pkg from '../package.json'

export * from '@/utils/formRules'
const version = pkg.version

const install = function(Vue) {
  Vue.component(CommonDialog.name, CommonDialog)
  Vue.component(CommonForm.name, CommonForm)
  Vue.component(CommonFormItem.name, CommonFormItem)
}

export default {
  install,
  version
}

export { CommonDialog, CommonForm, CommonFormItem, formRules }
