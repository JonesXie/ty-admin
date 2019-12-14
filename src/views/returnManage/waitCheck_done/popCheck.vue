<template>
  <div class="app-dialog">
    <el-dialog :visible.sync="popShow" :width="width" center @close="closePop()">
      <div class="dialog-body">
        <div class="icon_tle" :class="{green: pop.type === 1 , orange: pop.type === 2}">
          <i :class="{'el-icon-success': pop.type === 1 , 'el-icon-error': pop.type === 2}"></i>
        </div>
        <template v-if=" pop.type === 1 ">
          <div class="txt">确认退货</div>
          <div class="warning">确认同意该用户退货申请？</div>
        </template>
        <template v-if=" pop.type === 2 ">
          <div class="txt">拒绝退货</div>
          <div class="warning">确认拒绝该用户退货申请？</div>
        </template>

        <div class="tc" style="margin:45px 0 25px;">
          <el-button type="primary" class="submit-102w36" round  @click="doChecked()">确定</el-button>
          <el-button style="margin-left:70px" type="danger" class="submit-102w36" round  @click="closePop()">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { checkIsRefundOrJJ as api_check } from '@/api/orderManage'

export default {
  props: {
    title: { default: '' },
    width: { default: '484px' },
    pop: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      popShow: false
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
        userid: this.pop.userid
      }
      api_check(opt).then((res) => {
        if (res.data.flag === 1) {
          this.$message.success('操作成功！')
          this.$store.dispatch('delCachedView', 'waitCheck_done_r')
          this.$store.dispatch('delCachedView', 'waitOver')
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
  text-align: center;
  font-size: 18px;
  line-height: 1
}
div.warning{
   margin-bottom: $warningDown;
  font-size: 16px;
  color: #FF5C5C;
  text-align: center;
  line-height: 1
}
</style>
<style scoped>
.app-dialog >>> .el-dialog__header {
  padding: 0 0 25px 0;
  background: #fff;
}
</style>


