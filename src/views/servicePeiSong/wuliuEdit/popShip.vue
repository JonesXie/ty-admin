<template>
    <div class="app-dialog">
        <el-dialog title="添加发货信息" :visible.sync="popShow" width="470px" center @close="closePop()">
            <div class="dialog-body role">               
                 <el-form v-loading="loading" :model="selectData" ref="shipForm" :rules="shipRule" label-width="120px"  :inline-message='true'>
                     <el-form-item  label="选择快递公司：" prop="menuVal">
                        <el-select v-model="selectData.menuVal" placeholder="请选择" class="" style="width:280px;" @change="checkCotrl()">
                            <el-option
                                v-for="item in menus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>              
                    <el-form-item label=" 快递单号："  prop="kd_serio">
                    <el-input @keyup.enter.native="popReturn" placeholder="请输入快递单号" v-model="selectData.kd_serio" style="width:280px;"></el-input>
                    </el-form-item>                                                           
                    <div class="tc" style="margin-top:60px;">
                        <el-button  type="primary" class="submit-102w36" round @click="toDo()">确定</el-button>          
                    </div>
                 </el-form>                 
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { updateOrderExpress } from '@/api/orderManage'
import { getExpressCompay } from '@/api/setting'
export default {
  props: {
    pop: {
      type: Object,
      default: () => { return {} }
    }
  },
  watch: {
    pop: {
      handler(value) {
        this.popShow = value.show
        if (!value.show) return
        const express = value.data.express
        if (express && express.id) {
          for (const i in this.shipData) {
            if (this.shipData[i].code === express.code) {
              this.selectData.menuVal = i * 1
              this.selectData.kd_serio = express.kdSerio
              continue
            }
          }
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data() {
    return {
      popShow: false,
      shipData: [],
      selectData: {
        kd_serio: '',
        menuVal: ''
      },
      loading: false,
      menus: [],
      shipRule: {
        menuVal: [{ required: true, message: '请选择快递公司', trigger: 'change' }],
        kd_serio: [{ required: true, message: '请输入快递单号', trigger: 'blur' }]
      }

    }
  },
  mounted() {
    getExpressCompay({
      state: 1
    }).then((res) => {
      res.data.forEach((element, index) => {
        if (element.state === 1) {
          this.menus.push({
            value: index,
            label: element.company
          })
        }
        this.shipData.push({
          'code': element.code,
          'company': element.company,
          'companyEn': element.companyEn
        })
      })
    })
  },
  methods: {
    checkCotrl() {
      this.$nextTick(() => {
        this.$refs.shipForm.validateField('menuVal')
      })
    },
    toDo() {
      this.$refs['shipForm'].validate((valid) => {
        if (valid) {
          this.popReturn()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    popReturn() {
      this.loading = true
      updateOrderExpress(this.getSubmitData()).then((res) => {
        this.loading = false
        if (res.data.flag > 0) {
          this.$message.success('修改成功！')
          this.$store.dispatch('delCachedView', 'wuliuRecord') // 关闭缓存
          return this.closePop(1)
        }
        this.$message.error(res.data.msgInFo)
      }).catch(() => { this.loading = false })
    },
    getSubmitData() {
      const obj = {
        addressDetail: this.pop.data.addressDetail,
        mobilePhone: this.pop.data.mobilePhone,
        nickName: this.pop.data.nickName,
        recivename: this.pop.data.recivename,
        tOrderSerio: this.pop.data.tOrderSerio,
        tOrderSummoney: this.pop.data.tOrderSummoney,
        tOrderUserid: this.pop.data.tOrderUserid,
        userName: this.pop.data.userName,
        userid: this.user.userId
      }

      obj.oldExpress = Object.assign({}, this.pop.data.express)

      obj.newExpress = Object.assign({
        kdSerio: this.selectData.kd_serio
      }, this.shipData[this.selectData.menuVal])

      obj.orderDetail = []
      this.pop.data.list.forEach(ele => {
        obj.orderDetail.push({
          'attrValues': ele.attValues ? ele.attValues.join('/') : '',
          'count': ele.tSuborderdetailsCount,
          'proId': ele.tSuborderdetailsProid,
          'proName': ele.proName,
          'sonProid': ele.tSuborderdetailsSonproid
        })
      })
      return obj
    },
    closePop(val) {
      this.selectData = {
        kd_serio: '',
        menuVal: ''
      }
      this.$refs['shipForm'].resetFields()
      this.$emit('closePop', val)
    }
  }
}
</script>

<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.role{    
    padding-top:35px;
    padding-bottom: 20px;
    .form-text{
        line-height: 18px;
        padding: 8px 0;
        max-width: 200px;
    }
    .el-form-item{
        margin-bottom: 19px;
        .el-input,.el-textarea{
            width: 300px;
        }        
    }
    .el-button+.el-button{
        margin-left:126px;
    }  
}

</style>