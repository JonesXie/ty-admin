<template>
    <div class="app-dialog">
        <el-dialog title="开票信息详情" :visible.sync="popShow" width="700px" center @close="closePop()">
            <div class="dialog-body invoice">
                <el-form :model="taxAction" ref="taxAction" label-width="140px" class="modify-form" inline-message>
                    <div v-if="!typeCheck" class="shenhe">
                        <el-form-item label="开票金额：">
                            <div class="form-text"><em v-math:eval="sumMoney / 10000"></em>万元</div>
                        </el-form-item>
                        <el-form-item label="发票编号：" prop="taxNo"
                            :rules="[{required: true, message: '请输入发票编号', trigger: 'blur'}]"
                        >
                            <el-input v-model="taxAction.taxNo"  placeholder="请输入发票编号" style="width:260px;"></el-input>
                        </el-form-item>
                        <el-form-item label="选择快递公司：" prop="code"
                            :rules="[{required: true, message: '请选择快递公司'}]"
                        >
                            <formSelectWuliu :clear="taxAction.code" @returnData="selectWuliu"></formSelectWuliu>
                        </el-form-item>
                        <el-form-item label="快递单号：" prop="kd_serio"
                            :rules="[{required: true, message: '请输入快递单号', trigger: 'blur'}]"
                        >
                            <el-input v-model="taxAction.kd_serio" placeholder="请输入快递单号" style="width:260px;"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="发票信息名称：">
                        <div class="form-text">{{ruleForm.nickname}}</div>
                    </el-form-item>
                    <el-form-item label="开具类型：">
                            <div v-if="ruleForm.userType == 1" class="form-text">个人</div>
                            <div v-else class="form-text">企业</div>
                    </el-form-item>
                    <el-form-item label="发票抬头：">
                        <div class="form-text">{{ruleForm.head}}</div>
                    </el-form-item>
                    <el-form-item label="发票类型：">
                            <div class="form-text" v-if="ruleForm.usertype == 1">普通发票</div>
                            <div class="form-text" v-else >增值税专用发票</div>
                    </el-form-item>
                    <template v-if="ruleForm.usertype == 2">
                        <el-form-item label="企业信息代码：" >
                            <div class="form-text">{{ruleForm.companycode}}</div>
                        </el-form-item>
                        <el-form-item label="开户银行：" >
                            <div class="form-text">{{ruleForm.bankname}}</div>
                        </el-form-item>
                        <el-form-item label="开户账户:" >
                            <div class="form-text">{{ruleForm.bankcardnumber}}</div>
                        </el-form-item>
                        <el-form-item label="公司注册电话：" >
                            <div class="form-text">{{ruleForm.tel}}</div>
                        </el-form-item>
                        <el-form-item label="营业执照地址：">
                            <div class="form-text">{{ruleForm.hallcardaddress}}</div>
                        </el-form-item>
                        <el-form-item label="邮箱地址：">
                            <div class="form-text">{{ruleForm.email}}</div>
                        </el-form-item>
                    </template>
                    <div class="tc" v-if="typeCheck">
                        <el-button type="primary" class="submit-102w36" round @click="checkTaxt(1)">审核通过</el-button>
                        <el-button type="danger" class="submit-102w36" round @click="refused(0)">拒绝开票</el-button>
                    </div>
                    <div class="tc" v-else>
                        <el-button type="primary" class="submit-102w36" round @click="doTaxAction()">开票</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import formSelectWuliu from '@/components/formSelectWuliu/index'
import { CheckTaxtRecordAction, DoingTaxtRecordAction } from '@/api/checkManage'
export default {
  data() {
    return {
      /* 表单绑定数据 */
      ruleForm: {},
      taxId: '',
      sumMoney: '',
      popShow: false,
      taxAction: {
        code: '',
        kd_serio: '',
        taxNo: ''
      }
    }
  },
  components: {
    formSelectWuliu
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  props: {
    pop: {
      type: Object,
      default: () => { return {} }
    },
    typeCheck: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
        this.ruleForm = value.data
        this.taxId = value.taxId
        if (value.sumMoney) this.sumMoney = value.sumMoney
      },
      deep: true
    }
  },
  methods: {
    doTaxAction() {
      this.$refs['taxAction'].validate((valid) => {
        if (valid) {
          this.$confirm('确认开票？', '提示', { type: 'warning' }).then(() => {
            this.submitTax()
          }).catch(() => {})
        } else return false
      })
    },
    submitTax() {
      let opt = {
        taxRecordId: this.taxId,
        userid: this.user.userId
      }
      opt = Object.assign(opt, this.taxAction)
      DoingTaxtRecordAction(opt).then((res) => {
        if (res.data.flag === 1) {
          this.$message.success('操作成功！')
          this.$store.dispatch('delCachedView', 'billingRe') // 关闭缓存
          return this.$emit('closePop', 1)
        }
        return this.$message.error(res.data.msgInFo)
      })
    },
    selectWuliu(val) {
      this.taxAction = Object.assign({}, this.taxAction, val)
      this.$nextTick(() => {
        this.$refs['taxAction'].validateField('code')
      })
    },
    checkTaxt(isPass) {
      let txt = '是否'
      txt += isPass ? '通过？' : '拒绝？'
      this.$confirm(txt, '提示', { type: 'warning' }).then(() => {
        const opt = {
          id: this.taxId,
          isPass: isPass,
          userid: this.user.userId,
          info: ''
        }
        this.checkStock(opt)
      }).catch(() => {})
    },
    refused(isPass) {
      this.$prompt('请输入拒绝的原因', '提示').then(({ value }) => {
        const opt = {
          id: this.taxId,
          isPass: isPass,
          userid: this.user.userId,
          info: value
        }
        this.checkStock(opt)
      }).catch(() => {})
    },
    checkStock(opt) {
      CheckTaxtRecordAction(opt).then((res) => {
        if (res.data.flag === 1) {
          this.$message.success('操作成功！')
          this.$store.dispatch('delCachedView', 'billingCaiwu') // 关闭缓存
          this.$store.dispatch('delCachedView', 'billingRe') // 关闭缓存
          return this.$emit('closePop', 1)
        }
        return this.$message.error(res.data.msgInFo)
      })
    },
    closePop() {
      this.$emit('closePop')
      this.taxAction = {
        code: '',
        kd_serio: '',
        taxNo: ''
      }
      this.$refs['taxAction'].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
    .shenhe{
        padding-bottom: 20px;
        border-bottom: 1px dashed;
        margin-bottom: 20px;
    }
    .invoice{
        padding-top:10px;
        padding-bottom: 20px;
        .el-form-item{
            .el-input,.el-cascader{
                width: 300px;
            }
        }
        .el-button+.el-button{
            margin-left: 96px;
        }
        .protrans-item{
            >li{
                margin-bottom: 15px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
            .pro-attr{
                padding-right:15px;
                label+label{
                    padding-left: 15px;
                }
            }
        }
        .h-mid{
            height: 0;
            border-bottom: 1px dashed #9e9e9e;
            margin: 10px 0;
        }
    }
    .mt80{
        margin-top:80px;
    }
</style>