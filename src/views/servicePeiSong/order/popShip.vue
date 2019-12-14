<template>
  <div class="app-dialog">
    <el-dialog title="添加发货信息" :visible.sync="popShow" width="854px" center @close="closePop()">
      <div class="dialog-body role" v-loading="loading" >
        <h4>共计<em class="blue">{{pop.data.data ? pop.data.data.length : 0}}</em>条订单信息</h4>
        <el-table border stripe :data="pop.data.data" @selection-change="setShipData(1, $event)" max-height="240" class="tableMod" ref="tableMod" style="width:100%">
          <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
          <el-table-column prop="tOrderSerio" label="订单号" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户账号" align="center"></el-table-column>
          <el-table-column prop="recivename" label="用户名称" align="center"> </el-table-column>
          <el-table-column label="用户地址" align="center" v-if="pop.data.type === 2">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="用户地址:" width="150px" trigger="hover" :content="scope.row.regTxt + ' ' + scope.row.addressDetail">
                <div slot="reference">{{scope.row.addressDetail}}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="区县服务中心" align="center" v-else>
            <template slot-scope="scope">
              <el-popover v-if="scope.row.quServiceName !== '服务中心未开通'" placement="top-start" title="区县服务中心:" width="150px" trigger="hover" :content="scope.row.quServiceAddress">
                <div slot="reference">{{scope.row.quServiceName}}</div>
              </el-popover>
              <div v-else>无</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="" align="center" width="70px" v-if="!pop.data.alone">
            <template slot-scope="scope">
              <a class="blue" @click="$emit('removeData', scope.$index)"><i class="el-icon-delete red"></i></a>
            </template>
          </el-table-column>
        </el-table>

        <div class="tc">
          <el-form :model="selectData" ref="shipForm" :rules="shipRule" label-width="120px" :inline-message='true'>
            <el-form-item label="发货到：" >
              <div class="lineMid">
                <div>{{ pop.data.type === 1 ? '区县服务中心' : '个人' }}</div>
                <el-button style="margin-left:20px;" v-if="pop.data.type !== 2" @click="changeType(2)">发货到个人</el-button>
              </div>
            </el-form-item>
            <el-form-item label="选择快递公司：" prop="menuVal">
              <el-select v-model="selectData.menuVal" placeholder="请选择" class="" style="width:280px;" @change="checkCotrl()">
                <el-option v-for="item in menus" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="填写快递单号：" prop="kd_serio">
              <el-input @keyup.enter.native="popReturn" placeholder="请输入快递单号" v-model="selectData.kd_serio" style="width:280px;"></el-input>
            </el-form-item>
            <div class="tc" style="margin-top:60px;">
              <el-button type="primary" class="submit-102w36" round @click="toDo()">确认发货</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CompanyOrderSend } from '@/api/orderManage'
import { getExpressCompay } from '@/api/setting'
export default {
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
        this.$nextTick(() => {
          this.$refs.tableMod.doLayout()
        })
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['user'])
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
        menuVal: [
          { required: true, message: '请选择快递公司', trigger: 'change' }
        ],
        kd_serio: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getExpressCompay({
      state: 1
    }).then(res => {
      res.data.forEach((element, index) => {
        if (element.state === 1) {
          this.menus.push({
            value: index,
            label: element.company
          })
        }
        this.shipData.push({
          code: element.code,
          company: element.company,
          company_en: element.companyEn
        })
      })
    })
  },
  methods: {
    changeType(val) {
      this.$emit('changeType', val)
    },
    checkCotrl() {
      this.$nextTick(() => {
        this.$refs.shipForm.validateField('menuVal')
      })
    },
    toDo() {
      this.$refs['shipForm'].validate(valid => {
        if (valid) {
          this.popReturn()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getSubData() {
      let obj = {}
      obj = Object.assign({ kd_serio: this.selectData.kd_serio }, this.shipData[this.selectData.menuVal])
      obj.isQuServerCenter = this.pop.data.type === 1 ? 15 : 16
      obj.orderSendList = []
      obj.userid = this.user.userId
      this.pop.data.data.forEach(ele => {
        /* 主单号 */
        const data = {
          orderDetail: [],
          orderNo: ele.tOrderSerio
        }
        /* 产品信息 */
        ele.list.forEach(e => {
          data.orderDetail.push({
            attrValues: e.attValues.join('/'),
            count: e.tSuborderdetailsCount,
            proId: e.tSuborderdetailsProid,
            proName: e.proName,
            sonProid: e.tSuborderdetailsSonproid
          })
        })
        obj.orderSendList.push(data)
      })
      return obj
    },
    popReturn() {
      this.loading = true
      CompanyOrderSend(this.getSubData()).then(res => {
        this.loading = false
        if (res.data.flag > 0) {
          this.$message.success('发货成功！')
          this.$emit('popReturn', 1)
          this.$store.dispatch('delCachedView', 'sendRecord') // 关闭缓存
          return this.closePop()
        }
        this.$message.error(res.data.msgInFo)
      }).catch(() => {
        this.loading = false
      })
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
$danger: #f73b42;
$primary: #4c8afd;
.role {
  padding-bottom: 20px;
  margin: 0 -14px;
  .el-form {
    width: 420px;
    display: inline-block;
  }
  h4 {
    padding-left: 9px;
    line-height: 1;
    margin-bottom: 12px;
    color: #666;
  }
}
</style>
<style scoped>
  .el-form >>> .el-form-item__content{text-align: left}
  .tableMod{margin-bottom: 60px;}
  .tableMod >>> thead th{
      font-weight: normal;
      font-size: 14px;
      color: #666;
      line-height: 35px;
      padding: 0;
      background: #FBFAFA;
  }
  .tableMod >>> tbody td{
    padding: 8px 0;
  }
  .tableMod >>> .el-icon-delete{font-size: 14px;}
</style>
