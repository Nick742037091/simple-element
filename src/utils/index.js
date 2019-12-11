import { Message } from 'element-ui'

export const isEmptyObj = obj => {
  return Object.keys(obj).length === 0
}

const preDate = (text, preiod, num) => {
  return {
    text,
    onClick(picker) {
      picker.$emit(
        'pick',
        Moment()
          .subtract(num, preiod)
          .toDate()
      )
    }
  }
}

const PreiodType = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year'
}

export const calShortcuts = [
  preDate('今天', PreiodType.day, 0),
  preDate('昨天', PreiodType.day, 1),
  preDate('一周前', PreiodType.week, 1),
  preDate('一个月前', PreiodType.month, 1),
  preDate('三个月前', PreiodType.month, 3),
  preDate('半年前', PreiodType.month, 6),
  preDate('一年前', PreiodType.year, 1)
]

export const setAsyncTimeout = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const listToFilters = list => {
  return list.map((item, index) => {
    return {
      text: item,
      value: index
    }
  })
}

const MsgDuration = 3000

export const error = (message, options) => {
  Message.error({
    duration: MsgDuration,
    message,
    ...options
  })
}

export const success = (message, options) => {
  Message.success({
    duration: MsgDuration,
    message,
    ...options
  })
}
