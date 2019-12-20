import { Message } from 'element-ui'
import Vue from 'vue'

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

/**
 * 通过delete函数删除观察对象的所有值
 * @param {object} obj 观察的对象
 */
export const clearObserveObj = obj => {
  for (const key in obj) {
    Vue.delete(obj, key)
  }
}

/**
 *  通过set函数合并对象到观察对象中
 * @param {object} to 被合并的观察对象
 * @param {object} from 合并的对象
 */
export const mergeObserveObj = (to, from) => {
  for (const key in from) {
    Vue.set(to, key, from[key])
  }
}

/**
 *  通过set函数替换观察数组
 * @param {object} to 被替换的观察数组
 * @param {object} from 替换的数组
 */
export const replaceObserveArray = (to, from) => {
  while (to.length > 0) {
    to.pop()
  }
  from.forEach(item => {
    to.push(item)
  })
}
