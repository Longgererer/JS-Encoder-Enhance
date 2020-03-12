export default {
  // 网站语言
  language: 'zh',
  // 当前对话框
  currentDialog: '',
  // 当前显示二级选项栏
  currentSecOpt: '',
  // 当前显示代码窗口
  currentTab: 'HTML',
  // 控制台尺寸
  consoleSize: 0,
  // 代码窗口高度
  codeAreaHeight: 0,
  // 代码窗口宽度
  codeAreaWidth: 0,
  // 项目名称
  projectName: '',
  // 预处理语言
  preprocess: [
    'HTML',
    'CSS',
    'JavaScript'
  ],
  // 项目标签
  tags:[],
  // 代码窗内容
  codeAreaContent: {
    HTML: '<div>\n\tHello World!\n</div>',
    CSS: '* {\n\tmargin: 0;\n\tpadding: 0;\n}',
    JavaScript: 'console.log(1)'
  },
  // js外部链接
  CDNList: [],
  // css外部链接
  linkList: [],
  // 是否显示遮罩层
  showBg: false,
  // 是否显示侧边用户信息栏
  showSlideUserMenu: false,
  // 是否显示储存按钮
  showSaveBtn: false,
  // 是否显示储存提示
  showSaveTip: true,
  // 用户登录状态
  loginStatus: false,
  // 设置项
  codeOptions: {
    replace: true,
    autoUp: true,
    waitTime: 1000,
    showHistoryLog: false,
    tabIndent: 2
  },
  // iframe宽度
  iframeWidth: 0,
  // iframe遮罩层
  iframeScreen: false,
  // 显示iframe高度
  showIframeHeight: false,
  // 显示iframe宽度
  showIframeWidth: false,
  // 日志列表
  consoleInfo: [],
  // console过滤器
  isFilterShow: false,
  filterList: [
    'log',
    'info',
    'warn',
    'error'
  ]
}
