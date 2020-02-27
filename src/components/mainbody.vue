<template>
  <div id="mainbody" class="flex flex-clo">
    <div class="tabs-list flex">
      <div class="tabs flex">
        <Tabs :key="index" :tabInfo="item" v-for="(item, index) in tabsInfo"></Tabs>
      </div>
      <div class="tabs-commands">
        <div v-for="(item, index) in tabsCommands" :key="index" :title="tabsLang[index]" class="flex flex-ai flex-jcc"
          @click="judgeTabsCommands(item.name)">
          <i class="icon iconfont" :class="item.class"></i>
        </div>
      </div>
    </div>
    <div class="code-area-box" ref="codeArea" :style="{ height: codeAreaSize + 'px' }" v-show="currentTab !== 'Output'">
      <CodeArea v-for="(item, index) in preprocess" :key="index" :codeMode="item" v-show="item === currentTab"
        :showCodeArea="item === currentTab" :index="index" @runCode="runCode"></CodeArea>
    </div>
    <div class="iframe-box" :style="{ height: codeAreaSize + 'px' }" v-show="currentTab === 'Output'">
      <div class="iframe-screen" v-show="iframeScreen"></div>
      <div class="iframe-size-height" v-show="showIframeSize">{{codeAreaSize + 'px'}}</div>
      <iframe
        allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        frameborder="0" id="iframe" name="iframe" ref="iframeBox"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
        scrolling="yes" src="static/html/runner.html"></iframe>
    </div>
    <div class="console-box" :style="{ height: consoleSize + 'px' }">
      <Console></Console>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tabs from './tabs.vue'
import Console from './console.vue'
import CodeArea from './codeArea.vue'
import handleIframe from '@/utils/handleIframe'
import getCompiledCode from '@/utils/getCompiledCode'
import iframeConsole from '@/utils/console'
import handleShortcut from '@/utils/handleShortcut'
export default {
  data() {
    return {
      tabsCommands: [
        {
          name: 'run',
          class: 'icon-zhihang'
        },
        {
          name: 'reset',
          class: 'icon-zhongzhi'
        }
      ],
      consoleInfo: [],
      init: false
    }
  },
  mounted() {
    const codeAreaH = document.body.clientHeight - 180
    this.$store.commit('updateCodeAreaSize', codeAreaH)
    new iframeConsole(this.$refs.iframeBox)
    new handleShortcut().init()
    this.runCode().then(consoleInfo => {
      this.consoleInfo = consoleInfo
      this.init = true
    })
  },
  computed: {
    tabsLang() {
      return globalThis.Global.language.tabsCommands
    },
    ...mapState({
      consoleSize: 'consoleSize',
      codeAreaSize: 'codeAreaSize',
      preprocess: 'preprocess',
      currentTab: 'currentTab',
      language: 'language',
      codeOptions: 'codeOptions',
      iframeScreen: 'iframeScreen',
      showIframeSize: 'showIframeSize'
    }),
    tabsInfo() {
      const preprocess = this.preprocess
      let iconHTML = 'icon-html',
        iconCSS = 'icon-style',
        iconJavaScript = 'icon-javascript',
        iconOutput = 'icon-yanjing'
      if (preprocess[0] === 'MarkDown') {
        iconHTML = 'icon-markdown'
      }
      if (preprocess[1] === 'Sass' || preprocess[1] === 'Scss') {
        iconCSS = 'icon-Sass'
      } else if (preprocess[1] === 'Stylus') {
        iconCSS = 'icon-stylus'
      } else if (preprocess[1] === 'Less') {
        iconCSS = 'icon-less'
      }
      if (preprocess[2] === 'TypeScript') {
        iconJavaScript = 'icon-typescript-def'
      } else if (preprocess[2] === 'CoffeeScript') {
        iconJavaScript = 'icon-coffeescript'
      }
      return [
        {
          name: preprocess[0],
          class: iconHTML
        },
        {
          name: preprocess[1],
          class: iconCSS
        },
        {
          name: preprocess[2],
          class: iconJavaScript
        },
        {
          name: 'Output',
          class: iconOutput
        }
      ]
    }
  },
  watch: {
    consoleInfo(newInfo) {
      this.$store.commit('updateConsoleInfo', newInfo)
    }
  },
  methods: {
    judgeTabsCommands(cmdName) {
      switch (cmdName) {
        case 'run':
          this.runCode(200)
          break
        case 'reset':
          this.resetCode()
          break
      }
    },
    async runCode(waitTime) {
      // 执行代码，将代码写入到iframe
      const iframe = this.$refs.iframeBox
      const state = this.$store.state
      const codeAreaContent = state.codeAreaContent
      const preprocessor = state.preprocess
      let link = state.linkList
      let cdn = state.CDNList
      // 传入waitTime参数代表立即显示效果(仍然有200ms延迟)，否则按照设置的时间延迟显示效果
      waitTime = waitTime ? waitTime : this.codeOptions.waitTime
      // 重新引入iframe，之前的js代码不会因为删除了原本的js代码而消失，必须重新引入
      // 第一次执行代码时不需要重新载入iframe
      if (!this.init) await handleIframe.refresh(iframe)
      // 获取已经编译成为html、css、js的代码。判断是否使用预处理语言，如果使用，将预处理语言编译完成后返回，否则直接返回
      let finCode
      await getCompiledCode(codeAreaContent, preprocessor).then(code => {
        finCode = code
      })
      // 如果html预处理为markdown，不引入外部css和js
      if (preprocessor[0] === 'MarkDown') {
        link = ['../css/github-markdown.css']
        cdn = []
      }
      // 重新加载iframe会有延迟，不加定时器会导致写入到iframe的代码消失
      await setTimeout(() => {
        handleIframe.sendCodeToIframe(iframe, finCode, link, cdn)
      }, waitTime)
      return this.getConsoleInfo()
    },
    resetCode() {
      // 重置所有代码到初始状态
      const commit = this.$store.commit
      commit('updateCodeAreaMessage', {
        mode: 'HTML',
        message: '<div>\n\tHello World!\n</div>'
      })
      commit('updateCodeAreaMessage', {
        mode: 'CSS',
        message: '* {\n\tmargin: 0;\n\tpadding: 0;\n}'
      })
      commit('updateCodeAreaMessage', {
        mode: 'JavaScript',
        message: 'console.log("hello world")'
      })
    },
    getConsoleInfo(){
      return new iframeConsole().getConsoleInfo()
    },
    cleanConsoleInfo() {
      new iframeConsole().setConsoleInfo([])
      this.$store.commit('updateConsoleInfo', [])
    }
  },
  components: {
    Tabs,
    Console,
    CodeArea
  }
}
</script>

<style lang="scss" scoped>
#mainbody {
  @include setWAndH(calc(100% - 50px), 100%);
  .tabs-list {
    width: 100%;
    height: 30px;
    background-color: $primaryHued;
    .tabs {
      background-color: $dominantHue;
    }
    .tabs-commands {
      @include setWAndH(100%, 100%);
      text-align: right;
      div {
        @include setWAndH(50px, 100%);
        @include setTransition(all, 0.3s, ease);
        color: $beforeFocus;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        i {
          font-size: 25px;
        }
        &:hover {
          background-color: $dominantHue;
          color: $afterFocus;
        }
      }
    }
  }
  .code-area-box {
    @include setWAndH(100%, calc(100% - 180px));
  }
  .console-box {
    @include setWAndH(100%, 150px);
  }
  .iframe-box {
    background-color: #ffffff;
    position: relative;
    .iframe-screen {
      @include setWAndH(100%, 100%);
      position: absolute;
      z-index: 5;
    }
    .iframe-size-height {
      @include setTransition(all, 0.3s, ease);
      position: absolute;
      box-sizing: border-box;
      padding: 5px;
      left: 0;
      bottom: 0;
      background-color: $primaryHued;
      color: $afterFocus;
    }
    iframe {
      @include setWAndH(100%, 100%);
    }
  }
}
</style>