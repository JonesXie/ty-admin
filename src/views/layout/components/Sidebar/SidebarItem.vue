<template>
  <div class="menu-wrapper" v-loading="loading" element-loading-background="rgba(14, 26, 53, 0.2)">
    <div v-if="type === 'dev'">
        <template v-for="item in routes" v-if="!item.hidden&&item.children">
          <el-submenu :index="item.name||item.path" :key="item.name" >
            <template slot="title">
              <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
              <span style="color:#fff" v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
            </template>
            <template v-for="child in item.children" v-if="!child.hidden">
              <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
              <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path" >
                  <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
    </div>
    <div v-else>
        <template v-for="item in userUrl" v-if="item.menustate === '1'&&item.childList.length > 0">
          <el-submenu :index="'menuIndex' + item.id" :key="'menu' + item.id" >
            <template slot="title">
              <svg-icon v-if="item.img" :icon-class="item.img"></svg-icon>
              <span style="color:#fff" v-if="item.nameinfo" slot="title">{{item.nameinfo}}</span>
            </template>
            <template v-for="(child, index) in item.childList" v-if="child.menustate === '1'">
              <router-link :to="child.url" :key="'child' + index + child.id">
                <el-menu-item :index="'childIndex' + child.id" >
                  <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                  <span v-if="child.nameinfo" slot="title">{{child.nameinfo}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
    </div>
  </div>
</template>
<script>
import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
import { getUserUrlList } from '@/api/power-url'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu: '',
      type: 'dep',
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'user', 'userUrl'
    ])
  },
  watch: {
    userUrl: {
      immediate: true,
      handler(data) {
        if (data) {
          this.loading = false
        }
      }
    }
  },
  created() {

  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>
<style lang="scss" scoped>
.menu-wrapper{
  .is-active .aloneLink{color:rgb(76, 138, 253);}
  .aloneLink{
    color: #fff
  }
}
</style>
