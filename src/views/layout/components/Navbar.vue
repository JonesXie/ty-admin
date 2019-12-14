<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!-- <h1>店铺：宇飞来品牌手机旗舰店</h1> -->
    <div class="lineMid fr">
      <p>你好，<em>{{userInfo ? userInfo[1] : '未知用户'}}</em>，欢迎登陆</p>
      <span>
        <a><svg-icon icon-class="personalCenter"></svg-icon></a>
        <em>|</em>
      </span>
      <span @click="logout">
        <svg-icon icon-class="logout"></svg-icon>
      </span>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 90px;
  min-width: 1200px;
  background: #4C8AFD;
  color: #fff;
  position: fixed;
  z-index: 100;
  margin-left: -200px;
  width: 100%;
  border-radius: 0px !important;
  transition: margin .2s;
  .hamburger-container,h1 {
    float: left;
  }
  h1{
    padding: 40px 0 0 23px;
    font-size: 16px;line-height: 1;
  }
  .lineMid{
    padding: 40px 42px 0;
    em{color: #B0D3F5;}
    p{margin-right: 20px;}
    >span{
      cursor: pointer;
      margin-right: 20px;position: relative;
      em{
        font-family: Arial;
        float: right;
        margin: 1px 0 0 20px;
        color: #82ADFE;
      }
      i.tl{
        display: block;position: absolute;
        background: #FF5C5C;
        top: -3px;left: 18px;
        width: 10px;height: 10px;border-radius: 50%;
      }
    }
    .svg-icon{
      width: 22px;height: 22px;
    }
  }
}
.hideSidebar .navbar{
  margin-left: -60px;
  transition: margin .3s;
}
</style>

