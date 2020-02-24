import consoleTool from './consoleTool'
import * as judge from './judgeType'

export default class Console {
  constructor(iframe) {
    if (!Console.instance) {
      this.window = iframe.contentWindow
      this.console = this.window.console
      this.consoleInfo = []
      this.ableMethods = ['log', 'info', 'warn', 'error']
      this.init()
      Console.instance = this
    }
    return Console.instance
  }
  /**
   * 判断该方法是否可用
   * @param String methodStr
   * @return Boolean
   */
  judgeMethodsAllowed (methodStr) {
    return this.ableMethods.indexOf(methodStr) > -1 ? true : false
  }
  /**
   * 初始化控制台
   */
  init () {
    const iframeConsole = this.console
    // 重写window的onerror事件
    this.window.onerror = (msg, _, row, col) => {
      this.consoleInfo.push({
        type: 'system-error',
        content: msg,
        row,
        col
      })
      return true
    }
    // 重写console的一些方法
    this.ableMethods.forEach(item => {
      iframeConsole[item] = (...arg) => {
        this.consoleInfo.push(
          this.printLog({
            type: item,
            content: arg
          })
        )
      }
    })
  }
  /**
   * 将日志打印到日志显示窗口
   * @param Object item
   * @param String type 日志类型  log|info|debug|error|warn 必要！
   * @param Array content 日志内容
   * @return finLog 最终显示在页面上的日志html
   */
  printLog (item) {
    const type = item.type
    const content = item.content
    if (!this.judgeMethodsAllowed(type)) {
      return {
        type: 'error',
        logs: `console.${type} is not a function`
      }
    }
    let finLog = []
    switch (type) {
      case 'log':
        finLog = {
          type,
          logs: this.log(content)
        }
        break
      case 'error':

    }
    return finLog
  }
  /**
   * 获取所有日志
   * @return consoleInfo
   */
  getConsoleInfo () {
    return this.consoleInfo
  }
  /**
   * 生成带有log的html字符串
   * @param Array content 输出内容
   * @return finLog 最终显示在页面上的日志
   */
  log (content) {
    const finLog = []
    if (!content.length) return ''
    content.forEach(item => {
      const type = judge.judgeType(item)
      let html = ''
      switch (type) {
        case 'string':
          html = this.renderString(item)
          break
        case 'number':
          html = this.renderNumber(item)
          break
        case 'boolean':
          html = this.renderBoolean(item)
          break
        case 'symbol':
          html = this.renderSymbol(item)
          break
        case 'null':
          html = this.renderNull(item)
          break
        case 'undefined':
          html = this.renderUndefined(item)
          break
        case 'Object':
          html = this.renderObject(item)
          break
      }
      finLog.push(html)
    })
    return finLog
  }
  /**
   * 
   * @param String str 
   * @param Number num
   * @return String html string
   */
  renderString (str) {
    return `<span class="cm-string">"${str}"</span>`
  }
  renderNumber (num) {
    return `<span class="cm-keyword">${num}</span>`
  }
  renderBoolean (bool) {
    return `<span class="cm-keyword">${bool}</span>`
  }
  renderSymbol (sym) {
    sym = String(sym)
    return `<span style="color: #dd0a20">${sym}</span>`
  }
  renderNull (nul) {
    return `<span class="js-encoder-console-null">${nul}</span>`
  }
  renderUndefined (und) {
    return `<span class="js-encoder-console-undefined">${und}</span>`
  }
  renderObject (obj) {

  }
}