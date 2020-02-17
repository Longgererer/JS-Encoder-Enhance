<template>
  <div id="editor" class="flex">
    <div class="bg" v-if="showBg" @click.stop="closeBg"></div>
    <Sidebar v-if="refresh"></Sidebar>
    <MainBody></MainBody>
    <div class="slide-user-info" :class="showSlideUserMenu ? 'slide-user-info-show' : ''">
      <SlideUserMenu v-if="showSlideUserMenu"></SlideUserMenu>
    </div>
    <transition name="dialog-fade">
      <div class="dialog-box" v-if="currentDialog !== ''">
        <Dialog :dialogName="currentDialog"></Dialog>
      </div>
    </transition>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import MainBody from './mainbody'
import SlideUserMenu from './slideUserMenu'
import Dialog from './dialog'
import { mapState } from 'vuex'
export default {
  components: {
    Sidebar,
    MainBody,
    SlideUserMenu,
    Dialog
  },
  data() {
    return {
      refresh: true
    }
  },
  computed: {
    ...mapState({
      showBg: 'showBg',
      showSlideUserMenu: 'showSlideUserMenu',
      currentDialog: 'currentDialog',
      language: 'language'
    })
  },
  watch: {
    language() {
      // 重新渲染组件
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    }
  },
  methods: {
    closeBg() {
      const commit = this.$store.commit
      commit('updateShowBg', false)
      commit('updateShowSlideUserMenu', false)
      commit('updateCurrentDialog', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  @include setTransition(all, 0.3s, ease);
}
.dialog-fade-enter,
.dialog-fade-leave-active {
  opacity: 0;
  transform: scale(0);
  visibility: hidden;
}
#editor {
  @include setWAndH(100%, 100%);
  position: relative;
  .bg {
    position: absolute;
    z-index: 999;
    @include setWAndH(100%, 100%);
    @include setTransition(all, 0.3s, ease);
    background-color: rgba(0, 0, 0, 0.5);
  }
  .slide-user-info {
    @include setWAndH(300px, 100%);
    @include setTransition(all, 0.3s, ease);
    position: absolute;
    background-color: $dominantHue;
    z-index: 1000;
    top: 0;
    left: 100%;
  }
  .slide-user-info-show {
    box-shadow: 0 0 5px 0 #000000;
    left: calc(100% - 300px);
  }
  .dialog-box {
    @include setWAndH(500px);
    max-height: 500px;
    overflow: auto;
    left: calc(50% - 250px);
    top: 100px;
    position: absolute;
    z-index: 1000;
    background-color: $primaryHued;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 $deepColor;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;
  }
}
</style>