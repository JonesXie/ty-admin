<template>
    <div class="app-dialog">
        <el-button type="link" @click="confirmSold=true" style="width:120px;">确认售出</el-button>
        <el-dialog :visible.sync="confirmSold" append-to-body=true width="500px" center custom-class="tip-dialog">
            <div class="dialog-body tip">
                <div class="icon-box">
                    <i>
                        <svg-icon icon-class="icon-warning"></svg-icon>
                    </i>
                    <p>确认售出</p>
                </div>
                <div class="tip-text red">确认售出后，录入的信息将不可修改！请谨慎操作</div>
                <div class="tc" style="margin-top:50px;">
                    <el-button type="primary" class="submit-102w36" round>确认</el-button>
                    <el-button type="danger" class="submit-102w36" round>取消</el-button>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<style lang="scss" scoped>
$danger: #f73b42;
$primary: #4c8afd;
.tip {    
  padding: 50px 86px;
  .red{
      color: $danger;
  }
  .icon-box{
      &>i{
          width: 72px;
          height: 72px;
          font-size: 72px;
          color: #FD694C;
      }
      p{
          font-size: 18px;
          color: #333;
          padding: 34px 0 18px;
      }
  }
  .el-button + .el-button {
    margin-left: 70px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      confirmSold: false
    };
  }
};
</script>