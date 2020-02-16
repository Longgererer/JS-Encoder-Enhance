<template>
  <div id="upload" class="flex flex-clo">
    <span class="describe">{{ uploadInfo.describe }}</span>
    <div class="flex flex-ai flex-clo upload-box">
      <a @change="chooseFile" class="upload-input btn-def" href="javascript:;">
        <input class="flex flex-ai" id multiple="multiple" name ref="fileInput" type="file" />{{
          uploadInfo.chooseBtn
        }}
      </a>
      <button class="btn-def">
        <i class="icon iconfont icon-feiji"></i>
        {{ uploadInfo.uploadBtn }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    chooseFile(){
      
    }
  },
  components: {},
  computed: {
    uploadInfo(){
      return globalThis.Global.language.dialogInfo.upload
    }
  }
}
</script>

<style lang="scss" scoped>
#upload{
  @include setWAndH(100%);
  &>span{
    margin-top: 5px;
  }
  .upload-box{
    margin: 5px 0;
    .upload-input{
      padding: 4px 50px;
      height: 20px;
      line-height: 20px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      display: inline-block;
      font-size: 17px;
      font-weight: 600;
      input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
      }
    }
    button{
      margin-top: 5px;
      padding: 5px 10px;
      font-weight: 600;
    }
  }
}
</style>
