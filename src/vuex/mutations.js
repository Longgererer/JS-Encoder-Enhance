import * as judge from '../utils/judgeMode'

export default {
  updateLang: (state, lang) => {
    if (state.language !== lang) state.language = lang
  },
  updateCodeAreaMessage: (state, newMessage) => {
    state.codeAreaContent[newMessage.mode] = newMessage.message
  },
  updateCurrentDialog: (state, newCurrent) => {
    state.currentDialog = newCurrent
  },
  updateCurrentSecOpt: (state, newCurrent) => {
    state.currentSecOpt = newCurrent
  },
  updateCurrentTab: (state, newCurrent) => {
    state.currentTab = newCurrent
  },
  updateConsoleSize: (state, size) => {
    state.consoleSize = Number.parseFloat(size)
  },
  updateCodeAreaSize: (state, size) => {
    state.codeAreaSize = Number.parseFloat(size)
  },
  updateShowBg: (state, status) => {
    state.showBg = status
  },
  updateShowSlideUserMenu: (state, status) => {
    state.showSlideUserMenu = status
  },
  updateLoginStatus: (state, status) => {
    state.loginStatus = status
  },
  updatePreprocess: (state, obj) => {
    state.preprocess.splice(obj.index, 1, obj.newPrep)
  },
  updateCodeOptions: (state, newOptions) => {
    state.codeOptions[newOptions.option] = newOptions.conf
  },
  updateCdnJS: (state, newCDNList) => {
    state.CDNList = newCDNList
  },
  updateLinkList: (state, newLinkList) => {
    state.linkList = newLinkList
  }
}
