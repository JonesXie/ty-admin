<template>
  <div class="app-dialog">
    <el-dialog title="修改地址" :visible.sync="popShow" width="420px" center @close="closePop()">
      <el-form :model="submitData" v-loading="loading" :rules="subRule" ref="submitData" label-width="55px" :inline-message='true'>
        <el-form-item>
          <div>订单号： {{pop.data.tOrderSerio}}</div>
        </el-form-item>
        <el-form-item prop="newregion">
          <formSelectArea @returnRegion="returnRegion($event)" :clear="pop.data"></formSelectArea>
        </el-form-item>
        <el-form-item prop="address">
          <el-input @keyup.enter.native="toDo" placeholder="请输入详细地址" v-model="submitData.address" style="width:260px;"></el-input>
        </el-form-item>
        <div class="tc" style="margin-top:40px;">
          <el-button type="primary" class="submit-102w36" round @click="toDo()">确认修改</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { updateOrderActualAddress } from '@/api/orderManage'
import formSelectArea from '@/components/formSelectArea/index'
export default {
  name: 'popEditAddr',
  props: {
    pop: {
      type: Object,
      default: () => {
        return {}
      }
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
  components: {
    formSelectArea
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      popShow: false,
      loading: false,
      submitData: {
        newregion: '',
        address: ''
      },
      subRule: {
        newregion: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toDo() {
      this.$refs['submitData'].validate(valid => {
        if (valid) {
          this.loading = true
          updateOrderActualAddress({
            newregion: this.submitData.newregion,
            address: this.submitData.address,
            orderid: this.pop.data.id,
            userid: this.user.userId
          }).then(res => {
            this.loading = false
            if (res.data.flag > 0) {
              this.$message.success('修改成功！')
              this.$store.dispatch('delCachedView', 'psAddrRecord') // 关闭缓存
              return this.closePop(1)
            }
            this.$message.error(res.data.msgInFo)
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    returnRegion(val) {
      this.submitData.newregion = val
    },
    closePop(val) {
      this.submitData = {
        address: '',
        newregion: ''
      }
      this.$refs['submitData'].resetFields()
      this.$emit('closePop', val)
    }
  }
}
</script>
<style scoped>
.app-dialog >>> .el-form{padding-top: 20px;}
</style>
