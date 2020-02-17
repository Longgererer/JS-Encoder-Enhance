<template>
  <div id="codeArea">
    <codemirror
      :options="cmOptions"
      :value="message"
      v-model="message"
      class="code"
      ref="codeArea"
    ></codemirror>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import getEditor from '@/utils/codeEditor'
import { mapState } from 'vuex'
import * as judge from '@/utils/judgeMode'
export default {
  props:{
    codeMode: String,
    index: Number,
    showCodeArea: Boolean
  },
  data() {
    return {
      cmOptions: {},
      message: '',
      updateCode: null
    }
  },
  mounted(){
    this.initCoder()
  },
  computed:{
    ...mapState({
      codeOptions: 'codeOptions',
    }),
    currentPrep(){
      return this.$store.state.preprocess[this.index]
    }
  },
  watch:{
    message(newVal){
      // 防抖，监听代码内容变化更新state
      if(this.updateCode) clearTimeout(this.updateCode)
      this.updateCode = setTimeout(() => {
        const mode = judge.judgeMode(this.codeMode)
        this.$store.commit('updateCodeAreaMessage', {
          mode,
          message: newVal
        })
      }, this.codeOptions.waitTime)
    },
    currentPrep(newVal){
      this.cmOptions = newVal
    },
    showCodeArea(newVal){
      if(newVal)this.refreshCodeArea()
    }
  },
  methods: {
    initCoder(){
      // 初始化代码及编辑器配置
      const content = this.$store.state.codeAreaContent
      const codeMode = this.codeMode
      this.cmOptions = getEditor(codeMode)
      this.cmOptions.mode = judge.getStyleMode(codeMode)
      this.message = content[judge.judgeMode(codeMode)]
    },
    refreshCodeArea(){
      // 使用v-show切换codemirror元素显示时，会出现第一次需要点击才能显示内容的问题，需要在显示的时候执行刷新
      this.$refs.codeArea.refresh()
    }
  },
  components: {
    codemirror
  }
}
</script>

<style lang="scss" scoped>
#codeArea {
  @include setWAndH(100%, 100%);
  .code{
    @include setWAndH(100%, 100%);
    background-color: $dominantHue;
    resize: none;
    outline: none;
    border: none;
    color: $primaryHued;
  }
}
</style>
