<template>
  <div id="project" class="flex flex-clo noselect">
    <img class="poster" :title="projectName" src="https://img.xiaopiu.com/userImages/img117170a3b6d810.jpg" alt="">
    <div class="project-opt-box flex flex-ai">
      <div class="project-title" v-if="showInput">
        <input @blur="updateName" class="name-input" type="text" v-focus="isFocus" v-model="projectName" />
        <div class="input-box"></div>
      </div>
      <span class="project-name" v-if="!showInput">{{projectName}}</span>
      <i @click="changeName" :title="langProjectDetail.rename" class="icon iconfont icon-genggai rename"
        style="font-size:16px" v-if="!showInput"></i>
      <el-dropdown class="dropdown-menu" placement="top-end" trigger="click">
        <i class="icon iconfont icon-gengduo more" style="font-size:25px"></i>
        <el-dropdown-menu class="menu" slot="dropdown" placement="bottom">
          <el-dropdown-item icon="icon iconfont icon-dingzi">{{langProjectMenuList[0]}}</el-dropdown-item>
          <el-dropdown-item icon="icon iconfont icon-genggai1">{{langProjectMenuList[1]}}</el-dropdown-item>
          <el-dropdown-item icon="icon iconfont icon-recyclebin">{{langProjectMenuList[2]}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInput: false,
      isFocus: false,
      projectName: 'Project Name'
    }
  },
  computed: {
    langProjectDetail() {
      return window.Global.language.profileInfo.projectDetail
    },
    langProjectMenuList() {
      return this.langProjectDetail.projectMenuList
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
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
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
  .poster {
    @include setWAndH(100%, 200px);
    cursor: pointer;
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
}
</style>
