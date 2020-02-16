<template>
  <div id="mainbody">
    <div class="tabs-list flex">
      <div class="tabs flex">
        <Tabs :key="index" :tabInfo="item" v-for="(item, index) in tabsInfo"></Tabs>
      </div>
      <div class="tabs-commands">
        <div v-for="(item, index) in tabsCommands" :key="index" :title="tabsLang[index]" class="flex flex-ai flex-jcc" @click="judgeTabsCommands(item.name)">
          <i class="icon iconfont" :class="item.class"></i>
        </div>
      </div>
    </div>
    <div class="code-area-box" ref="codeArea" :style="{ height: codeAreaSize + 'px' }" v-show="currentTab !== 'Output'">
      <CodeArea v-for="(item, index) in preprocess" :key="index" :codeMode="item" v-if="item === currentTab"></CodeArea>
    </div>
    <div class="iframe-box" :style="{ height: codeAreaSize + 'px' }" v-show="currentTab === 'Output'">
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
      ]
    }
  },
  mounted() {
    const codeAreaH = document.body.clientHeight - 180
    this.$store.commit('updateCodeAreaSize', codeAreaH)
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
      language: 'language'
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
  components: {
    Tabs,
    Console,
    CodeArea
  },
  methods: {
    judgeTabsCommands(cmdName){
      switch(cmdName){
        case 'run':
          this.runCode()
          break
        case 'reset':
          this.resetCode()
          break
      }
    },
    async runCode(){
      // 执行代码，将代码写入到iframe
      const iframe = this.$refs.iframeBox
      const state = this.$store.state
      const codeAreaContent = state.codeAreaContent
      const preprocessor = state.preprocess
      let link = state.linkList
      let cdn = state.CDNList
      // 重新引入iframe，之前的js代码不会因为删除了原本的js代码而消失，必须重新引入
      iframe.contentWindow.location.reload(true)
      // 获取已经编译成为html、css、js的代码。判断是否使用预处理语言，如果使用，将预处理语言编译完成后返回，否则直接返回
      let finCode
      await getCompiledCode(codeAreaContent, preprocessor).then(code=>{
        finCode = code
      })
      // 如果html预处理为markdown，不引入外部css和js
      if(preprocessor[0]==='MarkDown'){
        link=['../css/github-markdown.css']
        cdn=[]
      }
      setTimeout(()=>{
        handleIframe.sendCodeToIframe(iframe, finCode, link, cdn)
      }, 500)
    },
    resetCode(){

    }
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
    background-color: #FFFFFF;
    iframe {
      @include setWAndH(100%, 100%);
    }
  }
}
</style>