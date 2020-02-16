module.exports = {
  // 侧边栏
  sbOpt: [
    '设置',
    '上传&下载',
    '色彩',
    '语言',
    '新功能',
    '问题',
    'Github'
  ],
  // 侧边栏延申
  secSbOpt: {
    conf: ['预处理', '库', '其他'],
    ud: ['上传', '下载'],
    color: ['颜色转换', '颜色选择'],
    lang: ['简体中文', 'English'],
    help: ['快捷键', '反馈']
  },
  tabsCommands: [
    'Run',
    'Reset'
  ],
  slideUserMenu: [
    '工作空间',
    '个人设置',
    '回收站',
    '登出'
  ],
  loginHint: '登陆以查看用户信息',
  loginBtn: '使用 github 登陆',
  dialogInfo: {
    preprocessor: {
      title: '预处理'
    },
    library: {
      title: '库',
      cssTitle: '添加外部样式',
      jsTitle: '添加外部脚本',
      cssDescribe: '这里添加的链接都是在运行 JavaScript 之前按顺序运行的，这些链接支持 HTTP 或 HTTPS 协议',
      jsDescribe: '这里添加的链接都是在运行 JavaScript 之前按顺序运行的，这些链接支持 HTTP 或 HTTPS 协议',
      add: '添加'
    },
    more: {
      title: '更多设置',
      waitTime: '延迟执行时间',
      waitTimeDescribe: '在您完成代码之后，我们将等待一段时间来执行它',
      autoExecute: '自动执行',
      autoExecuteDescribe: '打开自动执行会自动更新视图，关闭这个选项则需要在点击执行按钮时更新视图',
      replaceTab: '用 Tab 替换等同于 Tab 宽度的空格'
    },
    upload: {
      title: '上传',
      describe: '上传本地文件，格式包含 html, css, js, md, sass, scss, less, styl, ts 和 coffee。文件内容覆盖编辑器内容',
      chooseBtn: '选择文件',
      uploadBtn: '上传',
      chooseFiles: '已选择的文件',
      fileWarn: '只显示符合格式要求的文件'
    },
    download: {
      title: '下载',
      singleFileTitle: '单文件下载',
      singleFileDescribe: '将 HTML、CSS、JS 整合成一个HTML文件',
      multiFileTitle: '多文件下载',
      multiFileDescribe: '将 HTML、CSS、JS 分成三个文件放在文件夹中',
      beforeCompile: '下载编译前的文件',
      downloadBtn: '下载'
    },
    switch: {
      title: '颜色格式转换',
      switchDescribe: 'RGB 和 HEX 格式转换'
    },
    select: {
      title: '颜色选择',
      selectDescribe: '点击复制 HEX 格式颜色到剪贴板',
      GAndB: '绿/蓝',
      RAndB: '红/蓝',
      RAndG: '红/绿',
      Gray: '灰',
      inform: 'HEX颜色已添加到剪切板'
    },
    newFeature:{
      title: '新特性',
      featureList: [
      ],
      noFeature: '暂无更新' 
    },
    shortcut:{
      title: '快捷键',
      shortcutList: [
        '缩进代码',
        '格式化代码',
        '智能提示',
        '收起代码',
        '注释',
        '行赋值',
        '选择当前行',
        '向上互换行',
        '向下互换行'
      ]
    },
    feedback:{
      title: '反馈',
      feedbackDescribe: '如果您发现了 bug，您可以在 github 上提供反馈',
      toFeedback: '去反馈'
    }
  }
}