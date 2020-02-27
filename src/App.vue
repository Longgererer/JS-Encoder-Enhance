<template>
  <div id="app" @click="closeDialog">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as zh from './common/lang/zh'
import * as en from './common/lang/en'
export default {
  name: 'App',
  data(){
    return {
      clientHeight: document.documentElement.clientHeight
    }
  },
  mounted(){
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight
    }
  },
  computed:{
    ...mapState({
      language: 'language',
      currentSecOpt: 'currentSecOpt',
      iframeScreen: 'iframeScreen',
      isFilterShow: 'isFilterShow',
      consoleSize: 'consoleSize',
      codeAreaSize: 'codeAreaSize'
    })
  },
  watch:{
    language(newLang){
      const lang = newLang === 'zh' ? zh : en
      globalThis.Global.language = lang
    },
    clientHeight(newVal, oldVal){
      // 浏览器可视窗口大小改变时同时改变console和代码窗口大小
      // 改变策略：高度减小时等比缩小两个窗口高度，console不能小于25，代码窗口不小于100，有任何一个窗口达到最小值，那么只减少另一个窗口的高度
      const commit = this.$store.commit
      const consoleSize = this.consoleSize
      const codeAreaSize = this.codeAreaSize
      let resizeHeight = newVal - oldVal
      if(consoleSize <= 25 && codeAreaSize <= 100 && resizeHeight < 0) return void 0
      resizeHeight < 0 ? resizeHeight : -resizeHeight
      if(consoleSize <= 25 && resizeHeight < 0) {
        commit('updateCodeAreaSize', codeAreaSize + resizeHeight)
        return void 0
      }
      if(codeAreaSize <= 100 && resizeHeight < 0){
        commit('updateConsoleSize', consoleSize + resizeHeight)
        return void 0
      }
      commit('updateCodeAreaSize', codeAreaSize + resizeHeight / 2)
      commit('updateConsoleSize', consoleSize + resizeHeight / 2)
    }
  },
  methods:{
    closeDialog(){
      // 关掉其他窗口
      const commit = this.$store.commit
      if(this.currentSecOpt !== ''){
        commit('updateCurrentSecOpt', '')
        if(this.iframeScreen) commit('updateIframeScreen', false)
      } 
      if(this.isFilterShow) commit('updateIsFilterShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  @include setWAndH(100%, 100%);
  position: relative;
  font-family: $josefinSans;
  background-color: $dominantHue;
}
</style>
