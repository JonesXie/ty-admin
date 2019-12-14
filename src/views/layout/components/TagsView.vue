<template>
  <div class="tags-view-container" ref="tagsBox">
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link to="/dashboard"  class="tags-view-item inx" :class="dashboardIsActive()?'active':''">首页</router-link>
      <router-link v-if="tag.title != 'dashboard'" ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="(tag, index) in Array.from(visitedViews)"
        :to="tag" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,index,$event)">
        {{getTitle(tag)}}
        <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
      </router-link>
    </scroll-pane>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="refreshTag()">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 25,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    ...mapGetters([
      'sidebar', 'userUrl'
    ])
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    getTitle(tag) {
      let title = '页面'
      let path = tag.path
      for (let key in tag.params) {
        let reg = new RegExp('/' + tag.params[key])
        path = path.replace(reg, "")
      }
      if (this.userUrl === '') return
      this.userUrl.forEach(element => {
        element.childList.forEach(chrd => {
          if (chrd.url === path) title = chrd.nameinfo
        })
      });
      return title
    },
    dashboardIsActive() {
      return this.$route.path === '/dashboard'
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        if (!tags) return
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    refreshTag() {
      let name = this.$route.name
      this.$store.dispatch('setRefreshTag', {
        type: false,
        name: name
      });
      this.$store.dispatch('delCachedView', name); //关闭缓存
      this.$nextTick(() => {
        this.$store.dispatch('setRefreshTag', {
          type: true,
          name: name
        });
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
      this.moveToCurrentTag()
    },
    openMenu(tag, index, e) {
      this.visible = true;
      let left = e.clientX || e.x;
      if (this.sidebar.opened) this.left = left - 200;
      else this.left = left - 60;
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  position: fixed;
  left:200px;right: 0;
  z-index: 99;
  top: 90px;
  transition: .38s;
  .tags-view-wrapper {
    background: #fff;
    border-radius: 5px;
    height: 50px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 22px;
      line-height: 22px;
      margin: 14px 0;
      border-right: 1px #d8dce5 solid;
      color: #333333;
      background: #fff;
      padding: 0 35px 0 26px;
      font-size: 14px;
      font-weight: bold;
      &.inx{
        padding-left: 36px;
      }
      &:last-of-type {
        border: none
      }
      &.active {
        color: #4C8AFD;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
#app .tags-view-container  .tags-view-wrapper {
  border-radius:0 ;
  padding:0 20px;
  }
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      position: absolute;
      top:-2px;
      right: 12px;
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      background: #DEDEDE;
      color: #000;
      &:before {
        transform: scale(.8);
        display: inline-block;
        vertical-align: -1px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
.hideSidebar{
  .tags-view-container{
    left: 60px;
    right:0;
  }
   .main-container .main-box{
     
   }
}
</style>
