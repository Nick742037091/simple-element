import ComDialog from '@pkg/com-dialog'
import ComForm from '@pkg/com-form-item'
import ComFormItem from '@pkg/com-form'
import ComTable from '@pkg/com-table'
import formRules from '@/utils/formRules'
import pkg from '../package.json'

export * from '@/utils/formRules'
const version = pkg.version

const install = function(Vue) {
  Vue.component(ComDialog.name, ComDialog)
  Vue.component(ComForm.name, ComForm)
  Vue.component(ComFormItem.name, ComFormItem)
  Vue.component(ComTable.name, ComTable)
}

export default {
  install,
  version
}

export { ComDialog, ComForm, ComFormItem, ComTable, formRules }
