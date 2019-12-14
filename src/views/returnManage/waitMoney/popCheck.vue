<template>
  <div class="app-dialog">
    <el-dialog :visible.sync="popShow" :width="width" center @close="closePop()">
      <div class="dialog-body">
        <div class="icon_tle orange">
          <i class='el-icon-warning'></i>
        </div>

        <div class="warning tl">若用户提交的信息不符合退款要求，请填写拒绝原因，系统将会给用户进行反馈！</div>

        <div class="money lineMid">
          <span>退款金额：</span>
          <el-input v-model.number="vmod_money" type="number" placeholder="请输入金额" maxlength="15" style="width:293px"></el-input>
        </div>

        <div class="reason lineMid">
          <span>退款备注：</span>
          <textarea v-model="vmod_info" placeholder="若需要进行备注反馈给用户，请填写备注信息（非必填" style="width:293px;height:68px"></textarea>
        </div>

        <div class="tc" style="margin:45px 0 25px;">
          <el-button type="primary" class="submit-102w36" round @click="doChecked()">确定</el-button>
          <el-button style="margin-left:70px" type="danger" class="submit-102w36" round @click="closePop()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { finishRefundOrders as api_check } from '@/api/orderManage'

export default {
  props: {
    title: { default: '' },
    width: { default: '535px' },
    pop: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      popShow: false,
      vmod_info: '',
      vmod_money: ''
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
      },
      deep: true
    }
  },
  methods: {
    doChecked() {
      if (this.vmod_money < 0 || this.vmod_money === '') return this.$message.error('退款金额输入不正确！')
      const opt = {
        id: this.pop.data,
        money: this.vmod_money,
        userid: this.pop.userid,
        info: this.vmod_info
      }
      api_check(opt).then(res => {
        if (res.data.flag === 1) {
          this.$message.success('操作成功！')
          this.$store.dispatch('delCachedView', 'waitRecord')
          this.closePop(1)
          return
        }
        return this.$message.error(res.data.msgInFo)
      })
    },
    closePop(val) {
      this.$emit('closePop', val)
    }
  }
}
</script>
<style lang="scss" scoped>
$imgDown: 35px;
$txtDown: 24px;
$warningDown: 5px;

.icon_tle {
  text-align: center;
  margin-bottom: $imgDown;
  i {
    width: 74px;
    height: 74px;
    font-size: 74px;
  }
}
div.txt {
  margin-bottom: $txtDown;
  text-align: center;
  font-size: 18px;
  line-height: 1;
}
div.warning {
  margin-bottom: $warningDown;
  font-size: 16px;
  color: #ff5c5c;
  line-height: 1.8;
}
.lineMid{
  .el-input__inner, textarea{
    background:#f8f8f8;
    border-radius: 4px;
    border: 1px solid #dedede;
    font-size: 12px;
  }
}
div.money{
  padding-top: 35px;
  span{
    color: #333;
  }
} 
div.reason {
  padding-top: 29px;
  padding-bottom: 5px;
  span{line-height: 34px;color: #333;}
  textarea{
    padding:5px 15px;
    vertical-align: top;
    line-height: 1.4
  }
}
</style>
<style scoped>
.app-dialog >>> .el-dialog__header {
  padding: 0 0 25px 0;
  background: #fff;
}
.app-dialog >>> .el-dialog__body {
  padding-left: 85px;
  padding-right: 85px;
}
</style>


