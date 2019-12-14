<template>
    <div class="app-dialog">
        <el-button type="link" @click="confirmOrderCancel=true" style="width:120px;">取消订单</el-button>
        <el-dialog :visible.sync="confirmOrderCancel" append-to-body=true width="500px" center custom-class="tip-dialog">
            <div class="dialog-body tip">
                <div class="icon-box">
                    <i>
                        <svg-icon icon-class="icon-warning"></svg-icon>
                    </i>
                    <p>订单取消确认</p>
                </div>
                <div class="tip-text red">您确定取消订单吗？取消后订单不可恢复！</div>
                <el-select v-model="cancelVal" placeholder="请选择" style="margin-top:30px;width:180px;">
                    <el-option
                        v-for="item in cancels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="tc" style="margin-top:65px;">
                    <el-button type="danger" class="submit-102w36" round>再想想</el-button>
                    <el-button type="primary" class="submit-102w36" round>确认</el-button>
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
      confirmOrderCancel: false,
      cancelVal: "买错了，重新下单",
      cancels: [
          {
              label:"重复买了",
              value:"重复买了"
          },
           {
              label:"不想买了",
              value:"不想买了"
          },
           {
              label:"买错了，重新下单",
              value:"买错了，重新下单"
          }, 
          {
              label:"地址选错了",
              value:"地址选错了"
          },
           {
              label:"其他",
              value:"其他"
          }
      ]
    };
  }
};
</script>