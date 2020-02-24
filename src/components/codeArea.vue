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
      updateCode: null,
      init: false
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
    },
    codeAreaContent(){
      const mode = judge.judgeMode(this.codeMode)
      return this.$store.state.codeAreaContent[mode]
    }
  },
  watch:{
    currentPrep(newVal){
      this.cmOptions.mode = judge.getStyleMode(newVal)
    },
    showCodeArea(newVal){
      if(newVal){
        this.refreshCodeArea()
        this.getFocus()
      }
    },
    codeAreaContent(newVal){
      this.message=newVal
    }
  },
  methods: {
    initCoder(){
      // 初始化代码及编辑器配置
      if (this.unwatch) this.unwatch()
      const content = this.$store.state.codeAreaContent
      const codeMode = this.codeMode
      this.cmOptions = getEditor(codeMode)
      this.cmOptions.mode = judge.getStyleMode(codeMode)
      this.message = content[judge.judgeMode(codeMode)]
      // 第一次初始化完毕再开始监听内容变化
      this.unwatch = this.$watch('message', this.messageChangeHandler)
    },
    refreshCodeArea(){
      // 使用v-show切换codemirror元素显示时，会出现需要点击才能显示内容的问题，需要在显示的时候执行刷新
      this.$refs.codeArea.refresh()
    },
    getFocus(){
      // 使当前显示的代码窗口获取焦点
      this.$refs.codeArea.codemirror.focus()
    },
    runCode(){
      // 内容改变，执行父组件的方法来更新视图
      this.$emit('runCode')
    },
    messageChangeHandler(newVal){
      // 防抖，监听代码内容变化更新state
      if(this.updateCode) clearTimeout(this.updateCode)
      this.updateCode = setTimeout(() => {
        const mode = judge.judgeMode(this.codeMode)
        this.$store.commit('updateCodeAreaMessage', {
          mode,
          message: newVal
        })
        this.runCode()
      }, this.codeOptions.waitTime)
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
