<template>
  <div class="dashboard content">
    <div class="">       
      <img src="./dashboard-txt.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.content{
  width: 100%;
  >div{
    border-radius:5px;
    min-height: 870px;
    position: relative;
    background:#fff url(./dashboard-bg.png) no-repeat bottom right;;
  }
  img{
    position: absolute;
    top: 21%;
    left: 12%;
  }
}
</style>
