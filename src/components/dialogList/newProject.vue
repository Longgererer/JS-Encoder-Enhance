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
  </div>
</template>

<script>
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
      width: 300px;
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
}
</style>
