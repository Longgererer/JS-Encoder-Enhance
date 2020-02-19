<template>
  <div id="dialog" class="flex flex-clo noselect">
    <header class="dialog-header flex flex-ai">
      <span class="dialog-title">{{ dialogInfo.title }}</span>
      <i class="icon iconfont icon-close" @click.stop="closeDialog"></i>
    </header>
    <Preprocessor v-if="dialogName==='preprocessor'"></Preprocessor>
    <Library v-else-if="dialogName==='library'"></Library>
    <MoreOpt v-else-if="dialogName==='more'"></MoreOpt>
    <Upload v-else-if="dialogName==='upload'"></Upload>
    <Download v-else-if="dialogName==='download'"></Download>
    <SwitchColor v-else-if="dialogName==='switch'"></SwitchColor>
    <SelectColor v-else-if="dialogName==='select'"></SelectColor>
    <NewFeature v-else-if="dialogName==='newFeature'"></NewFeature>
    <Shortcut v-else-if="dialogName==='shortcut'"></Shortcut>
    <div class="feedback" v-else-if="dialogName==='feedback'">
      <span>{{feedbackInfo.feedbackDescribe}}</span>
      🧐<a target="black" href="https://github.com/Longgererer/JS-Encoder/issues">{{feedbackInfo.toFeedback}}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as judge from '@/utils/judgeMode'
import Upload from './dialogList/upload'
import Download from './dialogList/download'
import SwitchColor from './dialogList/switchColor'
import SelectColor from './dialogList/selectColor'
import NewFeature from './dialogList/newFeature'
import Shortcut from './dialogList/shortcut'
import Preprocessor from './dialogList/preprocessor'
import Library from './dialogList/library'
import MoreOpt from './dialogList/moreOpt'
export default {
  props: {
    dialogName: String
  },
  components: {
    Upload,
    Download,
    SwitchColor,
    SelectColor,
    NewFeature,
    Shortcut,
    Preprocessor,
    Library,
    MoreOpt
  },
  computed: {
    dialogInfo() {
      const dialogInfo = globalThis.Global.language.dialogInfo
      const dialogName = this.dialogName
      return dialogInfo[this.dialogName]
    },
    feedbackInfo(){
      return globalThis.Global.language.dialogInfo.feedback
    }
  },
  methods: {
    closeDialog() {
      const commit = this.$store.commit
      commit('updateShowBg', false)
      commit('updateCurrentDialog', '')
    }
  }
}
</script>

<style lang="scss" scoped>
#dialog {
  .dialog-header {
    @include setWAndH(100%, 30px);
    border-bottom: 2px solid $describe;
    position: relative;
    .dialog-title {
      color: $afterFocus;
      font-weight: 600;
      font-size: 18px;
    }
    & > i {
      @include setTransition(all, 0.3s, ease);
      color: $beforeFocus;
      position: absolute;
      right: 0;
      &:hover {
        color: $afterFocus;
      }
    }
  }
  .feedback{
    margin: 5px 0;
    color: $afterFocus;
    a{
      color: blue;
    }
  }
}
</style>