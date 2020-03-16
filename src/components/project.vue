<template>
  <div id="project" class="flex flex-clo noselect">
    <div class="poster-box" :title="projectInfo.projectName">
      <div class="poster-screen flex flex-ai flex-jcc">
        <i @click="editProject" class="icon iconfont icon-genggai1" :title="langProjectMenuList[1]"></i>
      </div>
      <img class="poster" :src="projectInfo.poster" alt="">
    </div>
    <div class="project-opt-box flex flex-ai">
      <div class="project-title" v-if="showInput">
        <input @blur="updateName" class="name-input" type="text" v-focus="isFocus" v-model="projectInfo.projectName" />
        <div class="input-box"></div>
      </div>
      <span class="project-name" v-if="!showInput">{{projectInfo.projectName}}</span>
      <i @click="changeName" :title="langProjectDetail.rename" class="icon iconfont icon-genggai rename"
        style="font-size:16px" v-if="!showInput"></i>
      <el-dropdown class="dropdown-menu" placement="top-end" trigger="click">
        <i class="icon iconfont icon-gengduo more" style="font-size:25px"></i>
        <el-dropdown-menu class="menu" slot="dropdown" placement="bottom">
          <el-dropdown-item v-show="!projectInfo.status" icon="icon iconfont icon-dingzi">
            {{langProjectMenuList[0]}}
          </el-dropdown-item>
          <el-dropdown-item @click="editProject" v-show="!projectInfo.status" icon="icon iconfont icon-genggai1">
            {{langProjectMenuList[1]}}
          </el-dropdown-item>
          <el-dropdown-item v-show="!projectInfo.status" @click.native="delDialogVisible=true"
            icon="icon iconfont icon-recyclebin">
            {{langProjectMenuList[2]}}
          </el-dropdown-item>
          <el-dropdown-item v-show="projectInfo.status" icon="icon iconfont icon-huifu">{{langProjectMenuList[3]}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog class="delete-dialog" :title="langDelDialog.title" :visible.sync="delDialogVisible"
      :modal-append-to-body='false' :before-close="handleClose" width="30%">
      <span>{{langDelDialog.content}}</span><br>
      <span class="describe">{{langDelDialog.describe}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible=false">{{langDelDialog.cancel}}</el-button>
        <el-button type="danger" @click="handleClose">{{langDelDialog.confirm}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import reqUserInfo from '@/utils/requestUserInfo'
export default {
  props: {
    projectInfo: Object
  },
  data() {
    return {
      showInput: false,
      isFocus: false,
      delDialogVisible: false,
      append: true
    }
  },
  watch: {
    isFocus(newVal) {
      // 用户修改完项目名称，更新到数据库
      if (newVal) return void 0
      const projectInfo = this.projectInfo
      reqUserInfo.updateProjectName(projectInfo._id, projectInfo.projectName)
    }
  },
  computed: {
    langLanguage() {
      return window.Global.language
    },
    langProjectDetail() {
      return this.langLanguage.profileInfo.projectDetail
    },
    langProjectMenuList() {
      return this.langProjectDetail.projectMenuList
    },
    langDelDialog() {
      return this.langLanguage.profileInfo.deleteTip
    },
    language() {
      return this.$store.state.language
    }
  },
  methods: {
    changeName() {
      this.showInput = true
      this.isFocus = true
    },
    updateName() {
      this.isFocus = false
      this.showInput = false
    },
    editProject() {
      /**
       * 编辑项目
       * 先根据项目id获取项目详情
       * 再将项目详情更新到state
       * 再跳转到editor界面
       */
      const projectInfo = this.projectInfo
      const id = projectInfo._id
      reqUserInfo.getProjectDetail(id).then(res => {
        if (!res && !Object.keys(res)) return void 0
        const commit = this.$store.commit
        commit('updateCodeAreaAllMessage', res.content)
        commit('updateAllPreprocess', res.prep)
        commit('updateCdnJS', res.CDNList)
        commit('updateLinkList', res.linkList)
        commit('updateProjectId', res.projectId)
        commit('updateProjectTags', projectInfo.tags)
        commit('updateProjectName', projectInfo.projectName)
        this.$router.push({ path: '/editor' })
      })
    },
    handleClose() {
      // 将项目移入回收站
      this.delDialogVisible = false
      const userId = this.$store.state.userInfo._id
      const id = this.projectInfo._id
      reqUserInfo.removeProject(userId, id).then(res => {
        const langDelDialog = this.langDelDialog
        const message = res ? langDelDialog.success : langDelDialog.fail
        const icon = res ? 'icon-success' : 'icon-error1'
        this.$notify({
          message,
          position: 'bottom-right',
          showClose: false,
          iconClass: 'icon iconfont icon-success ' + icon,
          duration: 1500
        })
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  background-color: $primaryHued;
  border: none;
  color: $describe;
  overflow: hidden;
  & >>> .el-dropdown-menu__item {
    @include setTransition(all, 0.3s, ease);
    i {
      @include setTransition(all, 0.3s, ease);
    }
    &:hover {
      background-color: $deepColor;
      color: $afterFocus;
      i {
        color: $afterFocus;
      }
    }
  }
}
#project {
  @include setWAndH(360px, 250px);
  @include setTransition(all, 0.3s, ease);
  background-color: $primaryHued;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
  margin: 20px 0;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 10px 0 #bebebe;
  }
  .poster-box {
    position: relative;
    @include setWAndH(100%, 200px);
    &:hover .poster-screen {
      @include setWAndH(100%, 100%);
      opacity: 1;
    }
    .poster-screen {
      @include setWAndH(100%, 0px);
      @include setTransition(all, 0.3s, ease);
      opacity: 0;
    }
    .poster-screen {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.2);
      & > i {
        color: $afterFocus;
        opacity: 0.8;
        font-size: 40px;
        @include setTransition(all, 0.3s, ease);
        cursor: pointer;
        &:hover {
          opacity: 1;
        }
      }
    }
    .poster {
      @include setWAndH(100%, 100%);
      cursor: pointer;
      background-color: #fff;
    }
  }
  .project-opt-box {
    @include setWAndH(100%, 50px);
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    color: $afterFocus;
    font-size: 16px;
    &:hover .rename {
      opacity: 1;
    }
    .rename {
      padding: 10px;
      color: $describe;
      opacity: 0;
      @include setTransition(all, 0.3s, ease);
      cursor: pointer;
      &:hover {
        color: $afterFocus;
        opacity: 1;
      }
    }
    .project-name {
      width: auto;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .project-title {
      .input-box {
        width: 0;
        border-bottom: 1px solid $describe;
        @include setTransition(all, 0.3s, ease);
      }
      .name-input {
        width: 200px;
        border: none;
        outline: none;
        color: $afterFocus;
        font-size: 16px;
        font-family: $josefinSans;
        background-color: transparent;
      }
    }
    .name-input:focus + .input-box {
      width: 100%;
    }
    .dropdown-menu {
      position: absolute;
      cursor: pointer;
      color: $describe;
      right: 10px;
      outline: none;
      &:hover {
        color: $afterFocus;
      }
    }
  }
  .delete-dialog {
    & >>> .el-dialog {
      background-color: $primaryHued;
      .el-dialog__title,
      .el-dialog__body {
        color: $afterFocus;
        font-size: 16px !important;
      }
      .el-button--danger {
        background-color: #ff3c41;
      }
      .el-dialog__headerbtn {
        display: none;
      }
    }
  }
}
</style>
