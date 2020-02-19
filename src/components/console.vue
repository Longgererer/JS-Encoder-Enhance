<template>
  <div id="console" ref="resize">
    <div class="console-tab flex flex-ai noselect">
      <i class="icon iconfont icon-console"></i>
      <span>console</span>
      <div class="resize-box flex flex-ai"
           @mousedown="boxMouseDown"
           >
        <i class="icon iconfont icon-resize"></i>
      </div>
    </div>
    <div class="console-body" id="console" ref="console"></div>
  </div>
</template>

<script>

export default {
  methods: {
    boxMouseDown(e) {
      // 拖拉console栏改变代码窗口和console的高度
      const store = this.$store
      const state = store.state
      const commit = store.commit
      // 在iframe上面显示遮罩层，否则会影响窗口拖拉
      commit('updateIframeScreen', true)
      // 显示iframe的尺寸
      commit('updateShowIframeSize', true)
      const starY = e.clientY
      const consoleSize = state.consoleSize
      const codeAreaSize = state.codeAreaSize
      const wholeSize = codeAreaSize + consoleSize
      document.onmousemove = ev => {
        const iEvent = ev || event
        const finSize = consoleSize - iEvent.clientY + starY
        if(finSize > 25 && wholeSize - finSize > 0){
          commit('updateConsoleSize', finSize)
          commit('updateCodeAreaSize', wholeSize - finSize) 
        }
        document.onmouseup = () => {
          document.onmousemove = null
          commit('updateIframeScreen', false)
          commit('updateShowIframeSize', false)
        }
      }
    },
    async initConsole(){
    }
  },
  mounted(){
    const consoleH = this.$refs.resize.offsetHeight
    this.$store.commit('updateConsoleSize', 150)
    this.initConsole()
  }
}
</script>

<style lang="scss" scoped>
#console {
  @include setWAndH(100%, 100%);
  min-height: 20px;
  .console-tab {
    @include setWAndH(100%, 25px);
    background-color: $primaryHued;
    color: $afterFocus;
    box-sizing: border-box;
    padding-left: 20px;
    position: relative;
    & > i {
      font-size: 15px;
      margin-right: 5px;
    }
    & > span {
      font-size: 14px;
      margin-left: 5px;
    }
    .resize-box {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: gray;
      cursor: n-resize;
      @include setTransition(all, 0.3s, ease);
      & > i {
        font-size: 8px;
      }
      &:hover {
        color: $afterFocus;
      }
    }
  }
  .console-body{
    overflow: auto;
    @include setWAndH(100%, calc(100% - 25px));
  }
}
</style>