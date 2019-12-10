const compType = {
  'com-select': 'select',
  'date-picker': 'select',
  input: 'input'
}

const typePhrase = {
  select: '请选择',
  input: '请输入'
}

export const addCompType = (comp, type) => {
  if (compType[comp]) {
    console.log('组件placeholder类型已存在')
    return
  }
  compType[comp] = type
}

export const removeCompType = comp => {
  if (!compType[comp]) {
    console.log('组件placeholder类型不存在')
    return
  }
  delete compType[comp]
}

export const getPlaceholder = (comp, label) => {
  const type = compType[comp]
  if (!type) return typePhrase.input
  const pharse = typePhrase[type]
  if (!pharse) return typePhrase.input
  return typePhrase[type] + label
}
