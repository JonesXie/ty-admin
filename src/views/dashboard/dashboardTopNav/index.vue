<template>
<div class="topNav">
    <div class="list">
        <el-row type="flex" :gutter="28" justify="space-between" class="lineMid " ref="toNav">
          <el-col :span="6" class="tolink">
            <router-link to="/kuCun/refer" >
                <div class="svgIcon" style="color:#FF1E1E">
                <svg-icon icon-class="remit-check"></svg-icon> 
                <span>打款审核</span>
                </div>
                <div class="num">
                <span>167</span>起未审核
                </div>
            </router-link>
            </el-col>
            <el-col :span="6" class="tolink">
              <router-link to="/test/test" >
                  <div class="svgIcon" style="color:#4C8AFD">
                  <svg-icon icon-class="invoice-check"></svg-icon> 
                  <span>开票审核</span>
                  </div>
                  <div class="num">
                  <span>25</span>起未审核
                  </div>
              </router-link>
            </el-col>
            <el-col :span="6" class="tolink">
              <router-link to="/kuCun/makeOver" >
                  <div class="svgIcon" style="color:#FD694C">
                  <svg-icon icon-class="return-check"></svg-icon> 
                  <span>退货审核</span>
                  </div>
                  <div class="num">
                  <span>9</span>起未审核
                  </div>
              </router-link>
            </el-col>
            <el-col :span="6" class="tolink">
              <router-link to="/test/test" >
                  <div class="svgIcon" style="color:#56B987">
                  <svg-icon icon-class="stock-warning"></svg-icon> 
                  <span>库存预警</span>
                  </div>
                  <div class="num">
                  <span>12</span>库存预警
                  </div>
              </router-link>  
            </el-col>         
        </el-row>
    </div>   
</div>
</template>
<script>
export default {
  name: "dashboardTopNav",
  data() {
    return {
      topNavSite: 0
    };
  },
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.topNav {
  position: relative;
  height: 145px;
  .list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 145px;
    overflow: hidden;
    .lineMid {
      position: relative;
      overflow: visible;
      white-space: nowrap;
      transition: right 1s ease;
    }
  }
  .toRight,
  .toLeft {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 26px;
    height: 72px;
    line-height: 72px;
    background: rgba(14, 26, 53, 1);
    opacity: 0.33;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    &:hover {
      opacity: 0.5;
    }
  }
  .toLeft {
    top: 88px;
  }
  .tolink {
    & > a {
      display: block;
      min-height: 120px;
      line-height: 1;
      padding:24px 40px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #e2e5ed;
      box-shadow: 0px 0px 9px rgba(76, 138, 253, 0.12);
      &:hover {
        border-color: #bfd0ef;
      }
      p {
        font-size: 12px;
      }
      p::before {
        content: "";
        display: inline-block;
        vertical-align: 2px;
        width: 4px;
        height: 4px;
        margin-right: 4px;
        border-radius: 50%;
        background: #ff1e1e;
      }
      p.notDo {
        color: #999999;
        &::before {
          background: #999;
        }
      }
    }
  }
  .svgIcon {
    font-size: 0;
    margin-bottom: 5px;
    line-height: 30px;
    .svg-icon {
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
    span {
      font-size: 16px;
      font-weight: bold;
      vertical-align: 8px;
      color: #333;
    }
  }
  .num {
    margin-bottom: 15px;
    font-size: 14px;
    color: #999;
    span {
      font-size: 28px;
      color: #333;
      font-weight: bold;
      margin-right: 6px;
    }
  }
}
</style>
