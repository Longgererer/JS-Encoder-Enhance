<template>
  <div id="newProject" class="flex flex-clo">
    <div class="project-name flex flex-clo">
      <span class="title">{{langNewProject.name}}</span>
      <el-input class="input" v-model="projectName" :placeholder="langNewProject.name"></el-input>
    </div>
    <div class="project-tags flex flex-clo">
      <span class="title">{{langNewProject.tags}}</span>
      <span class="describe">{{langNewProject.tagsDescribe}}</span>
      <el-input class="input" :disabled="disabled" @keyup.enter.native="addTags" v-model="currentTag" placeholder="">
      </el-input>
      <div class="tags-box flex flex-ai" v-show="tags.length">
        <el-tag v-for="(tag,index) in tags" :key="index" closable @close="handleClose(index)">{{tag}}</el-tag>
      </div>
    </div>
    <button class="btn-def" @click="createNewProject" :class="!projectName?'disable-btn':''"
      :disabled="!projectName">{{langNewProject.title}}</button>
  </div>
</template>

<script>
import handleCookie from '@/utils/handleCookie'
export default {
  data() {
    return {
      projectName: '',
      currentTag: '',
      tags: [],
      disabled: false
    }
  },
  computed: {
    langNewProject() {
      return window.Global.language.dialogInfo.newProject
    }
  },
  methods: {
    addTags() {
      const tags = this.tags
      tags.push(this.currentTag)
      this.currentTag = ''
      if (tags.length >= 3) this.disabled = true
      else this.disabled = false
    },
    handleClose(index) {
      const tags = this.tags
      tags.splice(index, 1)
      this.disabled = false
    },
    createNewProject() {
      /**
       * 创建项目
       * 如果cookie中存在个人设置，将初始预处理语言和初始代码更新到state
       * 否则使用默认初始化
       */
      const store = this.$store
      const state = store.state
      const commit = store.commit
      let HTMLMessage = ''
      let CSSMessage = ''
      let JSMessage = ''
      let defaultCode = handleCookie.getCookieValue('defaultCode')
      let preprocess = handleCookie.getCookieValue('preprocess')
      if (defaultCode) {
        defaultCode = JSON.parse(defaultCode)
        HTMLMessage = defaultCode.HTML
        CSSMessage = defaultCode.CSS
        JSMessage = defaultCode.JavaScript
      }
      preprocess = preprocess
        ? JSON.parse(preprocess)
        : ['HTML', 'CSS', 'JavaScript']
      commit('updateShowBg', false)
      commit('updateCurrentDialog', '')
      commit('updateProjectName', this.projectName)
      commit('updateProjectTags', this.tags)
      commit('updateCodeAreaMessage', {
        mode: 'HTML',
        message: HTMLMessage
      })
      commit('updateCodeAreaMessage', {
        mode: 'CSS',
        message: CSSMessage
      })
      commit('updateCodeAreaMessage', {
        mode: 'JavaScript',
        message: JSMessage
      })
      this.$router.push({ path: '/editor' })
    }
  }
}
</script>

<style lang="scss" scoped>
#newProject {
  .project-name,
  .project-tags {
    .title {
      font-weight: 600;
      font-size: 17px;
      color: $afterFocus;
      margin-top: 10px;
    }
    .describe {
      font-size: 12px;
      color: $describe;
      margin-top: 5px;
    }
    .input {
      margin-top: 5px;
    }
    .tags-box {
      height: 50px;
      & >>> .el-tag {
        height: 35px;
        background-color: $deepColor;
        font-size: 16px;
        display: flex;
        align-items: center;
        margin-right: 5px;
        i {
          color: $describe;
          @include setTransition(all, 0.3s, ease);
          &:hover {
            background-color: $deepColor;
            color: $afterFocus;
          }
        }
      }
    }
  }
  .btn-def {
    margin: 10px 0;
    padding: 8px 0;
    font-size: 16px;
  }
  .disable-btn {
    background-color: gray;
    color: $afterFocus;
    &:hover {
      background-color: gray;
      box-shadow: none;
    }
  }
}
</style>
