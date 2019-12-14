<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="dashboardListTabs">
    <el-tab-pane label="快捷功能" name="first">
        <div class="quick">
            <router-link to="/stock/stockManage"  >
                <div class="bg"><svg-icon icon-class="dashboard-nav6"></svg-icon></div>
                <p>进货单管理</p>
            </router-link>
            <router-link to="/sell/typeIn">
                <div><svg-icon icon-class="dashboard-nav7"></svg-icon></div>
                <p>销售录入</p>
            </router-link>
            <router-link to="/sell/retruns" >
                <div class="bg"><svg-icon icon-class="dashboard-nav4"></svg-icon></div>
                <p>销货-申请退货</p>
            </router-link>
            <router-link to="/kuCun/makeOver">
                <div><svg-icon icon-class="dashboard-nav3"></svg-icon></div> 
                <p>库存转让</p>
            </router-link>
        </div>
    </el-tab-pane>
    <el-tab-pane label="数据提醒" name="second">
        <div class="listInfo">
            <p>库存总量：<span>1000000</span></p>
            <p>库存成本：<span><em>￥</em>100000.00</span></p>
        </div>
        <div class="listInfo">
            <p>进货金额（本月）：<span class="red"><em>￥</em>100000.00</span></p>
            <p>销售金额（本月）：<span class="green"><em>￥</em>100000.00</span></p>
            <p>销售毛利（本月）：<span class="blue"><em>￥</em>100000.00</span></p>
        </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .dashboardListTabs{
    .el-tabs__item{
      width: 137px;
      text-align: center;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .quick{
    padding-top:52px;
    a{
      width: 50%;
      float: left;
      text-align:center;
      color: #A9BAD4;
      margin-bottom:68px;
      div{height: 77px;}
      p{color: #333;}
      &:hover{
        p{color: #4C8AFD;}
      }
    }
    .svg-icon{
      width: 43px;height: 52px;
    }
    .bg .svg-icon{
      width: 52px;height: 52px;
    }
  }
  .listInfo{
    padding:31px 12px 0;
    border-bottom:1px #DEDEDE dashed;
    color: #666666;
    p{margin-bottom:25px;}
    span{
      float: right;
      &.red{color: #F73B42;}
      &.green{color: #56B987;}
      &.blue{color: #4C8AFD;}
    }
  }
</style>


