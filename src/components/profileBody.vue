<template>
  <div id="profileBody" class="profileBody flex flex-clo flex-ai" v-if="refresh">
    <header>
      <div class="header-content flex flex-jcc">
        <div class="user-profile flex flex-ai">
          <img class="avatar" src="https://avatars2.githubusercontent.com/u/40834209?s=460&v=4" alt="">
          <div class="username">
            <span class="name ellipsis-text" title="lliiooiill">lliiooiill</span>
            <span class="nickname ellipsis-text" title="@longgererer">@longgererer</span>
          </div>
        </div>
        <span class="project-num">16 {{langProfileInfo.projectNum}}</span>
      </div>
      <div class="project-types flex flex-jcb">
        <div class="type flex flex-ai flex-jcc">
          <i class="icon iconfont icon-xiangmu"></i>
        </div>
        <div class="type flex flex-ai flex-jcc">
          <i class="icon iconfont icon-recyclebin"></i>
        </div>
      </div>
    </header>
    <div class="filters flex flex-jcb">
      <el-input class="filter-search" :placeholder="langFilter.search.placeholder" v-model="searchName" size="medium">
        <template class="search-prepend" slot="prepend">{{langFilter.search.name}}</template>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="filter-tags flex">
        <div class="tags-prepend flex flex-ai flex-jcc">{{langFilter.tags.name}}</div>
        <el-select class="tags-select" v-model="tagsList" multiple filterable allow-create default-first-option
          :placeholder="langFilter.tags.placeholder">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="filter-sort flex">
        <div class="sort-prepend flex flex-ai flex-jcc">{{langFilter.sort.name}}</div>
        <el-select class="sort-select" v-model="sort" :placeholder="langFilter.sort.placeholder">
          <el-option v-for="item in langSortList" :key="item.label" :label="item.value" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="filter-order flex">
        <div class="order-prepend flex flex-ai flex-jcc">{{langFilter.order.name}}</div>
        <div class="order-up flex flex-ai flex-jcc" :class="orderVal==='up'?'activeOrder':''" @click="orderVal='up'">
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="order-down flex flex-ai flex-jcc" :class="orderVal==='down'?'activeOrder':''"
          @click="orderVal='down'">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="project flex flex-w flex-ai flex-jcb">
      <div class="blank-tip flex flex-jcc" v-if="!projectList.length">
        <span>{{langProfileInfo.blankTip}}</span>
        <span class="create">{{langProfileInfo.create}}</span>
      </div>
      <Project v-for="(item, index) in projectList" :key="item"></Project>
      <div class="extra-virtual-project" v-for="index of extraVirProject" :key="index"></div>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="120" :page-size="12"
      :hide-on-single-page="false"></el-pagination>
  </div>
</template>

<script>
import Project from './project.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      refresh: true,
      searchName: '',
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        }
      ],
      tagsList: [],
      sort: '',
      projectList: [123, 23434, 234, 342, 423, 432, 42343],
      langProfileInfo: window.Global.language.profileInfo,
      orderVal: 'up'
    }
  },
  computed: {
    ...mapState({
      language: 'language'
    }),
    langFilter() {
      return this.langProfileInfo.filter
    },
    langSortList() {
      return this.langFilter.sort.sortList
    },
    extraVirProject() {
      // 为了防止项目数量不是4而打乱flex布局，在后面加几个透明盒子占位
      const length = this.projectList.length
      let numVirPro = 3 - (length % 3)
      return numVirPro
    }
  },
  watch: {
    language() {
      // 重新渲染组件
      this.refresh = false
      this.$nextTick(() => {
        this.langProfileInfo = window.Global.language.profileInfo
        this.refresh = true
      })
    }
  },
  methods: {},
  components: {
    Project
  }
}
</script>

<style lang="scss" scoped>
#profileBody {
  @include setWAndH(100%, 100%);
  overflow: auto !important;
  @include keyframes(fade-opt) {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @include keyframes(fade) {
    from {
      opacity: 0;
      margin-left: 20px;
    }
    to {
      opacity: 1;
      margin-left: 0;
    }
  }
  @include keyframes(up) {
    from {
      opacity: 0;
      margin-top: 20px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @include keyframes(filters-up) {
    from {
      opacity: 0;
      margin-top: 30px;
    }
    to {
      opacity: 1;
      margin-top: 10px;
    }
  }
  header {
    @include setWAndH(100%, 160px !important);
    position: relative;
    flex-shrink: 0;
    .header-content {
      @include setWAndH(100%, 80px);
      @include animation(fade-opt, 0.3s, ease, 0.3s, forwards);
      opacity: 0;
      background-color: $primaryHued;
      position: relative;
      box-shadow: 10px 20px 20px 0px rgba(10, 10, 10, 0.5);
      .user-profile {
        position: absolute;
        top: 20px;
        .avatar {
          @include setWAndH(120px, 120px);
          box-sizing: border-box;
          border-radius: 50%;
          border: 2px solid $afterFocus;
          margin-right: 20px;
          opacity: 0;
          @include setTransition(all, 0.5s, ease);
          @include animation(fade, 0.5s, ease, 0.3s, forwards);
          box-shadow: 0 12px 12px 0px rgba(10, 10, 10, 0.5);
        }
        .username {
          @include setWAndH(150px, 60px);
          .name,
          .nickname {
            width: 100%;
            display: block;
            cursor: pointer;
            opacity: 0;
          }
          .name {
            color: $afterFocus;
            font-size: 25px;
            margin-bottom: 10px;
            @include animation(fade, 0.5s, ease, 0.6s, forwards);
          }
          .nickname {
            color: $describe;
            font-size: 16px;
            margin-top: 10px;
            @include animation(fade, 0.5s, ease, 0.8s, forwards);
          }
        }
      }
      .project-num {
        font-size: 14px;
        color: $beforeFocus;
        position: absolute;
        top: calc(100% - 20px);
        right: 80px;
        opacity: 0;
        @include animation(fade, 0.5s, ease, 0.3s, forwards);
      }
    }
    .project-types {
      @include setWAndH(110px, 50px);
      margin-left: 30px;
      position: absolute;
      bottom: 0;
      .type {
        @include setWAndH(50px, 50px);
        opacity: 0;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
        background-color: $primaryHued;
        @include animation(up, 0.9s, ease, 0.3s, forwards);
        cursor: pointer;
        & > i {
          font-size: 30px;
          color: $describe;
          @include setTransition(all, 0.3s, ease);
          &:hover {
            color: $afterFocus;
          }
        }
      }
    }
  }
  .filters {
    margin: 10px 0px;
    opacity: 0;
    @include setWAndH(calc(100% - 60px), 36px);
    @include animation(filters-up, 0.3s, ease, 0.9s, forwards);
    .filter-search {
      @include setWAndH(400px, auto);
      box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
      .search-prepend {
        font-size: 14px;
      }
    }
    .filter-tags {
      @include setWAndH(400px, auto);
      box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
      .tags-prepend {
        @include setWAndH(64px, 100%);
        font-size: 14px;
        color: $afterFocus;
        background-color: $primaryHued;
        border-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .tags-select {
        @include setWAndH(100%, auto);
        & >>> .el-input__inner {
          border-radius: 5px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
    .filter-sort {
      @include setWAndH(225px, auto);
      box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
      .sort-prepend {
        font-size: 14px;
        @include setWAndH(64px, 100%);
        color: $afterFocus;
        background-color: $primaryHued;
        border-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .sort-select {
        @include setWAndH(100%, auto);
        & >>> .el-input__inner {
          border-radius: 5px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
    .filter-order {
      @include setWAndH(164px, auto);
      box-shadow: 0 0 5px 0 rgba(10, 10, 10, 0.5);
      .order-prepend {
        font-size: 14px;
        @include setWAndH(225px, auto);
        @include setWAndH(64px, 100%);
        color: $afterFocus;
        background-color: $primaryHued;
        border-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .order-up,
      .order-down {
        @include setWAndH(50px, 100%);
        background-color: $primaryHued;
        @include setTransition(all, 0.3s, ease);
        cursor: pointer;
        & > i {
          font-size: 20px;
          color: $describe;
          @include setTransition(all, 0.3s, ease);
          &:hover {
            color: $afterFocus;
          }
        }
      }
      .order-down {
        border-radius: 5px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .activeOrder {
        background-color: $afterFocus;
        color: $describe;
      }
    }
  }
  .project {
    @include setWAndH(calc(100% - 100px), auto);
    @include animation(filters-up, 0.3s, ease, 1.2s, forwards);
    opacity: 0;
    .blank-tip {
      margin: 150px 0;
      @include setWAndH(100%, auto);
      color: $describe;
      .create {
        color: #75beff;
        text-decoration: underline;
        cursor: pointer;
        margin-left: 5px;
      }
    }
  }
  .extra-virtual-project {
    @include animation(filters-up, 0.3s, ease, 1.2s, forwards);
    opacity: 0;
    @include setWAndH(360px, 250px);
    background-color: transparent !important;
  }
  .pagination {
    margin-top: 50px;
    margin-bottom: 100px;
    @include animation(filters-up, 0.3s, ease, 1.5s, forwards);
    opacity: 0;
    & >>> li,
    & >>> button {
      @include setWAndH(30px, 30px);
      margin: 0 5px;
      border-radius: 5px;
    }
  }
}
</style>