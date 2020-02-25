import * as judge from './judgeType'

/**
 * 获取对象的所有键，包括不可枚举的键
 * @param Object obj 
 * @return Array
 */
function getObjAllKeys (obj) {
  const type = judge.judgeType(obj)
  if (type !== 'Object' && type !== 'Array') return []
  if (type === 'Array') {
    const arr = []
    obj.forEach((_, index) => {
      arr.push(index)
    })
    return arr
  }
  return Object.getOwnPropertyNames(obj).sort()
}
/**
 * 将对象转化成字符串（最顶层的键值对）
 * @param Object stringObject
 * @return String
 */
function JSONStringify (stringObject) {
  const type = judge.judgeType(stringObject)
  if (type !== 'Object' && type !== 'Array') {
    return JSON.stringify(stringObject)
  }

  let prefix = '{', suffix = '}'
  if (type === 'Array') {
    prefix = '['
    suffix = ']'
  }
  let str = prefix

  const keys = getObjAllKeys(stringObject)
  for (let i = 0;i < keys.length;i++) {
    const key = keys[i]
    const value = stringObject[key]
    try {
      // key
      if (type !== 'Array') {
        const keyType = judge.judgeType(key)
        switch (keyType) {
          case 'Object':
          case 'Array':
          case 'Symbol':
            str += Object.prototype.toString.call(key)
            break
          default:
            str += key
        }
        str += ': '
      }

      // value
      const valueType = judge.judgeType(value)
      switch (valueType) {
        case 'Array':
          str += 'Array[' + value.length + ']'
          break
        case 'Object':
        case 'Function':
        case 'Symbol':
          str += Object.prototype.toString.call(value)
          break
        default:
          str += JSON.stringify(value)
      }
      if (i < keys.length - 1) str += ', '
    } catch (e) {
      continue
    }
  }
  str += suffix
  return str
}
/**
 * 检测对象是否为普通对象（不包含window、结点、特殊对象：数组，函数等。。。）
 * @param Object obj
 * @return Boolean
 */
function judgePlainObj (obj) {
  const hasOwnProp = Object.prototype.hasOwnProperty
  if (!obj || typeof obj !== 'object' || obj.nodeType || judgeWindow(obj)) {
    return false
  }
  try {
    if (obj.constructor
      && !hasOwnProp.call(obj, 'constructor')
      && !hasOwnProp.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false
    }
  } catch (e) {
    return false
  }
  let key
  for (key in obj) { }
  return key === undefined || hasOwnProp.call(obj, key)
}
/**
 * 判断对象是否为window
 * @param Object obj
 * @return Boolean
 */
function judgeWindow (obj) {
  const type = judge.judgeType(obj)
  return type === 'global' || type === 'Window' || type === 'DOMWindow'
}

export default {
  getObjAllKeys,
  JSONStringify,
  judgePlainObj,
  judgeWindow
}