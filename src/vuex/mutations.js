import * as judge from '../utils/judgeMode'

export default {
  updateLang: (state, lang) => {
    if (state.language !== lang) state.language = lang
  },
  updateCodeAreaMessage: (state, newMessage) => {
    state.codeAreaContent[newMessage.mode] = newMessage.message
  },
  updateProjectTags: (state,newTags)=>{
    state.tags = newTags
  },
  updateProjectName: (state, newName) => {
    state.projectName = newName
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
  updateCodeAreaHeight: (state, size) => {
    state.codeAreaHeight = Number.parseFloat(size)
  },
  updateCodeAreaWidth: (state, size) => {
    state.codeAreaWidth = Number.parseFloat(size)
  },
  updateIframeWidth: (state, size) => {
    state.iframeWidth = Number.parseFloat(size)
  },
  updateShowBg: (state, status) => {
    state.showBg = status
  },
  updateShowSlideUserMenu: (state, status) => {
    state.showSlideUserMenu = status
  },
  updateShowSaveBtn: (state, status) => {
    state.showSaveBtn = status
  },
  updateShowSaveTip: (state, status) => {
    state.showSaveTip = status
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
  },
  updateIframeScreen: (state, newStatus) => {
    state.iframeScreen = newStatus
  },
  updateShowIframeHeight: (state, newStatus) => {
    state.showIframeHeight = newStatus
  },
  updateShowIframeWidth: (state, newStatus) => {
    state.showIframeWidth = newStatus
  },
  updateConsoleInfo: (state, newInfo) => {
    state.consoleInfo = newInfo
  },
  updateIsFilterShow: (state, newStatus) => {
    state.isFilterShow = newStatus
  },
  updateFilterList: (state, newList) => {
    state.filterList = newList
  }
}
