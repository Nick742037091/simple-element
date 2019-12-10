const LogPref = '表格参数校验：'
const SmallNum = 0.000001
const nozeroValidator = (rule, value, callback) => {
  if (+value === 0) {
    return callback(new Error('数字不能为0'))
  } else {
    callback()
  }
}

export const getRequierdSelect = option => {
  return { required: true, message: `请选择${option.label}` }
}
export const getRequierdInput = option => {
  return { required: true, message: `请输入${option.label}` }
}
export const getRangeNumber = option => {
  const { min, max, larger, less } = option
  if (
    min === undefined &&
    max === undefined &&
    larger === undefined &&
    less === undefined
  ) {
    console.log(LogPref + '缺少最小值或者最大值')
    return {}
  }

  if (min !== undefined && max !== undefined) {
    return {
      type: 'number',
      min,
      max,
      message: `请输入${min}~${max}之间的数字`
    }
  } else if (max !== undefined) {
    return { type: 'number', max, message: `请输入不大于${max}的数字` }
  } else if (min !== undefined) {
    return { type: 'number', min, message: `请输入不小于${min}的数字` }
  }

  if (larger !== undefined && less !== undefined) {
    return {
      type: 'number',
      min: larger + SmallNum,
      max: less - SmallNum,
      message: `请输入大于${larger}，小于${less}之间的数字`
    }
  } else if (larger !== undefined) {
    return {
      type: 'number',
      min: larger + SmallNum,
      message: `请输入大于${larger}的数字`
    }
  } else if (less !== undefined) {
    return {
      type: 'number',
      max: less - SmallNum,
      message: `请输入小于${less}的数字`
    }
  }
}

export default {
  // 手机号码校验
  mobile: {
    len: 11,
    message: '请输入正确的手机号',
    trigger: 'blur'
  },
  // 邮箱校验
  emial: { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
  // 整型数字校验
  number: { type: 'number', message: '请输入数字', trigger: 'blur' },
  // 字符串和整型数字非零校验
  nozero: { type: 'message', trigger: 'blur', validator: nozeroValidator }
}
