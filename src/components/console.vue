<template>
  <div id="jsEncoderConsole" ref="resize">
    <div class="console-tab flex flex-ai noselect">
      <i class="icon iconfont icon-console"></i>
      <span>console</span>
      <div class="resize-box flex flex-ai" @mousedown="boxMouseDown">
        <i class="icon iconfont icon-resize"></i>
      </div>
      <div class="console-options">
        <div @click.stop class="filter-options flex flex-ai flex-jcc" :class="isFilterShow?'filter-options-active':''">
          <el-checkbox-group 
            v-model="passOptions"
            @change="changeFilterList">
            <el-checkbox class="el-checkbox" v-for="opt in filterOptions" :label="opt" :key="opt" size="mini">{{opt}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <i class="icon iconfont icon-filter1" title="filter" @click.stop="openFilter"></i>
        <i class="icon iconfont icon-recyclebin" title="clear" @click="clearConsole"></i>
      </div>
    </div>
    <div class="console-body" id="console" ref="console">
      <div class="CodeMirror cm-s-monokai">
        <div v-for="(item, index) in consoleInfo" :key="index" class="log-list">
          <div v-if="item.type==='log'" class="log flex flex-ai">
            <i class="icon iconfont icon-shuchu"></i>
            <pre v-for="(value, index) in item.logs" :key="index" v-html="value" class="CodeMirror-line"></pre>
          </div>
          <div v-if="item.type==='system-error'" class="system-error flex flex-ai">
            <i class="icon iconfont icon-error1"></i>
            <pre class="CodeMirror-line flex">
              <span class="content">{{item.content}}</span>
              <span class="row">row: {{item.row}}</span>
              <span class="col">col: {{item.col}}</span>
            </pre>
          </div>
          <div v-if="item.type==='error'" class="error flex flex-ai">
            <i class="icon iconfont icon-error1"></i>
            <pre class="CodeMirror-line flex">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
          <div v-if="item.type==='warn'" class="warn flex flex-ai">
            <i class="icon iconfont icon-warn1"></i>
            <pre class="CodeMirror-line flex">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
        </div>
      </div>
      <div class="textarea-box flex flex-ai">
        <i class="icon iconfont icon-lfmonth print-icon"></i>
        <textarea id="" rows="1" data-min-rows="1" @keydown="checkEnter($event)" v-model="consoleMessage"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import consoleTool from '@/utils/consoleTool'
import { codemirror } from 'vue-codemirror'
import getEditor from '@/utils/codeEditor'
import iframeConsole from '@/utils/console'
export default {
  data() {
    return {
      message: '',
      cmOptions: {},
      consoleMessage: '',
      filterOptions: [
        'log',
        'info',
        'warn',
        'error'
      ],
      passOptions: [
        'log',
        'info',
        'warn',
        'error'
      ]
    }
  },
  computed: {
    ...mapState({
      consoleInfo: 'consoleInfo',
      isFilterShow: 'isFilterShow'
    })
  },
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
        if (finSize > 25 && wholeSize - finSize > 0) {
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
    checkEnter(e) {
      // 禁用控制台回车事件
      const et = e || window.event
      var keycode = et.charCode || et.keyCode
      if (keycode === 13) {
        if (window.event) {
          window.event.returnValue = false
          this.sendConsoleCode()
        } else {
          e.preventDefault()
          this.sendConsoleCode()
        }
      }
    },
    sendConsoleCode() {
      this.consoleMessage = ''
    },
    clearConsole() {
      new iframeConsole().setConsoleInfo('')
      this.$store.commit('updateConsoleInfo', [])
    },
    openFilter(){
      this.$store.commit('updateIsFilterShow', true)
    },
    changeFilterList(newVal){
      this.$store.commit('updateFilterList', newVal)
    }
  },
  mounted() {
    const consoleH = this.$refs.resize.offsetHeight
    this.$store.commit('updateConsoleSize', 150)
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#jsEncoderConsole {
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
    .console-options {
      position: absolute;
      right: 10px;
      .filter-options{
        @include setWAndH(280px, 35px);
        position: absolute;
        background-color: #333333;
        border-radius: 5px;
        z-index: 999;
        right: 0;
        top: -20px;
        @include setTransition(all, 0.3s, ease);
        box-shadow: 0px 0px 5px 0px $dominantHue;
        visibility: hidden;
        transform: scale(0.5);
        transform-origin: bottom right;
        opacity: 0;
        .el-checkbox{
          font-size: 12px;
          color: $afterFocus;
        }
      }
      .filter-options-active{
        transform: scale(1);
        visibility: visible;
        opacity: 1;
        top: -45px;
      }
      & > i {
        color: gray;
        @include setTransition(all, 0.3s, ease);
        cursor: pointer;
        margin-left: 10px;
        &:hover {
          color: $afterFocus;
        }
      }
    }
  }
  .console-body {
    @include setWAndH(100%, calc(100% - 25px));
    .textarea-box {
      @include setWAndH(100%, 30px);
      border-top: 2px solid $primaryHued;
      border-bottom: 2px solid $primaryHued;
      box-sizing: border-box;
      textarea {
        @include setWAndH(100%, 100%);
        box-sizing: border-box;
        border: none;
        display: table-cell;
        vertical-align: middle;
        line-height: 26px;
        resize: none;
        color: $afterFocus;
        background: $dominantHue;
        outline: none;
        overflow: hidden;
      }
      & > i {
        color: #ae81ff;
        bottom: 6px;
        left: 2px;
      }
    }
    & > .CodeMirror {
      @include setWAndH(100%, calc(100% - 30px) !important);
      overflow: auto;
      .log-list {
        font-size: 13px;
        .log,
        .system-error,
        .error,
        .warn {
          box-sizing: border-box;
          padding: 0 10px;
          min-height: 25px;
          span::selection {
            background-color: $describe;
          }
        }
        .system-error,
        .error {
          background-color: #290000;
          border-bottom: 1px solid #5c0000;
          & > .icon-error1 {
            color: #ef6066;
            font-size: 12px;
            margin-right: 10px;
          }
          pre {
            @include setWAndH(100%);
            .content {
              @include setWAndH(100%, 100%);
              word-wrap: break-word;
              white-space: normal;
              color: #ef6066;
              display: block;
              margin-right: 10px;
            }
          }
        }
        .log {
          @include setWAndH(100%);
          border-bottom: 1px solid $primaryHued;
          & > .icon-shuchu {
            color: $describe;
            font-size: 12px;
            margin-right: 10px;
          }
        }
        .system-error {
          pre {
            .row,
            .col {
              margin: 0 5px;
              color: $describe;
            }
          }
        }
        .warn{
          background-color: #332b00;
          border-bottom: 1px solid #665500;    
          pre {
            @include setWAndH(100%);
            .content {
              @include setWAndH(100%, 100%);
              word-wrap: break-word;
              white-space: normal;
              color: #dfc185;
              display: block;
              margin-right: 10px;
            }
          }
          & > .icon-warn1 {
            color: #f5bd00;
            font-size: 12px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.js-encoder-console-string {
  color: #c39162;
}
.js-encoder-console-boolean {
  color: #ae81ff;
}
.js-encoder-console-symbol {
  color: #dd0a20;
}
.js-encoder-console-null {
  color: #ae81ff;
}
.js-encoder-console-undefined {
  color: #333333;
}
</style>