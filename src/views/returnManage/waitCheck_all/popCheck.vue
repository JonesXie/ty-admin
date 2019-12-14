<template>
  <div class="app-dialog">
    <el-dialog :visible.sync="popShow" :width="width" center @close="closePop()">
      <div class="dialog-body">
        <div class="icon_tle" :class="{green: pop.type === 1 , orange: pop.type === 3}">
          <i :class="{'el-icon-success': pop.type === 1 , 'el-icon-warning': pop.type === 3}"></i>
        </div>
        <template v-if=" pop.type === 1 ">
          <div class="txt tl">确认用户退款信息无误后，请点击“同意退款”对用户进行退款反馈</div>
          <div class="warning tl">注：请您在完成退款后，及时在“待退款”内对该订单进行完成退款处理，以便告知退款用户</div>
        </template>
        <template v-if=" pop.type === 3 ">
          <div class="txt"></div>
          <div class="warning tl">若用户提交的信息不符合退款要求，请填写拒绝原因，系统将会给用户进行反馈！</div>
          <div class="reason lineMid">
            <span>拒绝原因：</span>
            <el-input v-model="vmod_info" placeholder="请填写原因（不超过15个字）" maxlength="15" style="width:293px"></el-input>
          </div>
        </template>

        <div class="tc" style="margin:45px 0 25px;">
          <el-button v-if=" pop.type === 1 " type="primary" class="submit-102w36" round  @click="doChecked()">同意退款</el-button>
          <el-button v-if=" pop.type === 3 " type="primary" class="submit-102w36" round  @click="doChecked()">提交</el-button>
          <el-button style="margin-left:70px" type="danger" class="submit-102w36" round  @click="closePop()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { lookRefundEvidence as api_check } from '@/api/orderManage'

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
      vmod_info: ''
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
      const opt = {
        id: this.pop.data,
        isOrNot: this.pop.type,
        userid: this.pop.userid,
        info: this.vmod_info
      }
      api_check(opt).then((res) => {
        if (res.data.flag === 1) {
          this.$message.success('操作成功！')
          this.$store.dispatch('delCachedView', 'waitCheck_all_r')
          this.$store.dispatch('delCachedView', 'waitMoney')
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
div.txt{
  margin-bottom: $txtDown;
  font-size: 16px;
  line-height: 1.8
}
div.warning{
  margin-bottom: $warningDown;
  font-size: 14px;
  color: #FF5C5C;
  line-height: 1.8
}
div.reason{
  padding-top: 35px;padding-bottom: 5px;
  .el-input__inner{background: #F8F8F8;font-size: 12px;}
  span{
    color: #333;
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
  padding-right: 85px
}
</style>


