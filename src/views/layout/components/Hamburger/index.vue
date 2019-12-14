<template>
  <div @click="toggleClick" class="hamburger" :class="{'is-active':isActive}">
      <img class="pic-404__parent logo-img" src="@/assets/navBar_img/navLogo.png" alt="404">
    <img class="pic-404__parent logo-text" src="@/assets/navBar_img/jxc_admin_logo.png" alt="404">
    <div class="cont">
      <p>进销存系统官方后台</p>
      <span>Sales and storage system official background</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger {
	display: inline-block;
  cursor: pointer;
  width: 60px;
  height: 90px;
  background: #387AF5;
	transition: .38s;
  transform-origin: 50% 50%;
  padding: 23px 10px;
  position: relative;
.logo-text{
  display: none;
}
.logo-img{
  display: block;
   animation:mymove .7s;
}
  .cont{
    display: none;
    position: absolute;
    top: 29px;left: 66px;
    font-size: 20px;
    height: 37px;
    color: #387AF5;
    overflow: hidden;
    line-height: 1;
    letter-spacing: 2px;
    width: 6em;
    opacity:0;
    span{
       display: block;
       position: absolute;
       left: -55px;width: 11em;
       letter-spacing: 0;
       color: #eee;
       transform: scale(0.5);
    }
  }
  &.is-active {
    width: 200px;
    padding: 30px 12px;
    .logo-text{
      display: block;
       animation:mymove .7s;
    }
    .logo-img{
      display: none;     
    }
    .cont{
       display: none;
       color: #fff;
       opacity:1;
       animation:mymove .7s;
    }
  }
}
@keyframes mymove
{
  from {opacity:0;}
  to {opacity:1;}
}
</style>
