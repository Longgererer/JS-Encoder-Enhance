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
import { getUrlParams } from '@/utils/handleUrl'
import { post, get } from '@/utils/request'
import handleCookie from '@/utils/handleCookie'
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
  mounted() {
    // 获取用户跳转到github进行注册之后会跳转回来，进行用户信息获取
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      showBg: 'showBg',
      showSlideUserMenu: 'showSlideUserMenu',
      currentDialog: 'currentDialog',
      language: 'language',
      loginStatus: 'loginStatus'
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
    },
    async getCode() {
      /**
       * 判断环境以使用不同的方式截取参数
       * 获取code参数，开发模式下去除尾部的#/
       * 如果没有code参数，直接返回
       */
      const href = window.location.href
      let url = ''
      let paramObj = {}
      let userInfo = {}
      if (process.env.NODE_ENV === 'development') {
        url = href.substr(0, href.indexOf('#/'))
        paramObj = getUrlParams(url)
      } else {
        paramObj = this.$route.query
      }

      if (!paramObj.code) return 'NO CODE'

      // 向后台发送code，后台请求用户信息
      await get('/loginJSE/login/loginGithub', {
        params: {
          code: paramObj.code
        }
      }).then(res => {
        userInfo = res
      })
      return userInfo
    },
    getUserInfo() {
      // 查看用户登录状态，如果已登录就不需要进行用户信息获取
      if (this.loginStatus) return void 0
      // 如果url中没有带参数，也不能获取用户信息
      if (window.location.href.indexOf('?') < 0) return void 0
      this.getCode().then(res => {
        if (res !== 'NO CODE') {
          const commit = this.$store.commit
          console.log(res)
          handleCookie.setCookie('_id', res._id, 30)
          commit('updateLoginStatus', true)
        }
      })
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