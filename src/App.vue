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
    }
  },
  computed:{
    ...mapState({
      language: 'language',
      currentSecOpt: 'currentSecOpt',
      iframeScreen: 'iframeScreen',
      isFilterShow: 'isFilterShow'
    })
  },
  watch:{
    language(newLang){
      const lang = newLang === 'zh' ? zh : en
      globalThis.Global.language = lang
    }
  },
  methods:{
    closeDialog(){
      // 关掉其他窗口
      const commit = this.$store.commit
      if(this.currentSecOpt !== ''){
        commit('updateCurrentSecOpt', '')
        if(this.iframeScreen)commit('updateIframeScreen', false)
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
