<template>
  <div class="back-wrap report-form">
    <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
      <div class="topLine fr lineMid">
        <el-button type="primary" round style="width:120px;" @click="toPopSee('popShip', shipData)">
          <i class="el-icon-goods"></i>
          <span>一键发货</span>
        </el-button>
        <router-link to="/servicePeiSong/psAddrRecord">
          <el-button type="warning" round style="width:120px;">
            <i class="el-icon-edit"></i>
            <span>修改记录</span>
          </el-button>
        </router-link>
      </div>
    </div>
    <div class="table-w">
      <el-table border stripe v-loading="loading" :data="tableData" @selection-change="setShipData(1, $event)" class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="selection" width="65" align="center"></el-table-column>
        <el-table-column prop="tOrderSerio" label="订单号" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户账号" align="center"></el-table-column>
        <el-table-column prop="nickName" label="用户名称" align="center"> </el-table-column>
        <el-table-column label="用户地址" align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="用户地址:" width="150px" trigger="hover" :content="scope.row.regTxt + ' ' + scope.row.addressDetail">
              <div slot="reference">{{scope.row.addressDetail}}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="区县服务中心" align="center">
          <template slot-scope="scope">
            <el-popover v-if="scope.row.quServiceName !== '服务中心未开通'"  placement="top-start" title="区县服务中心:" width="150px" trigger="hover" :content="scope.row.quServiceAddress">
              <div slot="reference">{{scope.row.quServiceName}}</div>
            </el-popover>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <el-table-column label="订单内容" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" @click="toPopSee('popOrderSee', setProInfo(scope.row.list))" class="blue">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="旧手机物流" align="center" width="100px">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.express_no" @click="$alert(`物流单号：${scope.row.express_no}`, `${scope.row.express_name}`)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="金额（万元）" align="center" width="120px">
          <template slot-scope="scope">
            <div v-math:eval="scope.row.tOrderSummoney / 10000"></div>
          </template>
        </el-table-column>
        <el-table-column  label="支付时间" align="center">
          <template slot-scope="scope">
            {{scope.row.payReallyTime ? parseTime(scope.row.payReallyTime) : ''}}
          </template>
        </el-table-column>
        <el-table-column  label="订单来源" align="center">
          <template slot-scope="scope">
           {{getTypeVal(scope.row.tOrdertype, orderType)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="118px">
          <template slot-scope="scope">
            <a class="see" @click="toPopSee('popEditAddr', scope.row)">地址修改</a>
            <a class="blue" @click="toPopSee('popShip', scope.row)">发货</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="jxc-page tc">
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="10" prev-text="上一页" next-text="下一页" :total="pagTotal">
      </el-pagination>
    </div>
    <popOrderSee :pop="pop.popOrderSee" :stateShow="true" @closePop="closePop('popOrderSee', $event)"></popOrderSee>
    <popEditAddr :pop="pop.popEditAddr" @closePop="closePop('popEditAddr', $event)"></popEditAddr>
    <popShip :pop='pop.popShip' @closePop="closePop('popShip', $event)" @changeType="changeType" @popReturn="shipReturn" @removeData="removeShip"></popShip>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import { getCompanyOrders } from '@/api/orderManage'
import popShip from './popShip.vue'
import popEditAddr from './editAddr.vue'
import { fullnames } from '@/api/address'
export default {
  name: 'order',
  components: {
    popOrderSee,
    topSearchMod,
    popShip,
    popEditAddr
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.$store.dispatch('GETOrderType').then(data => {
      this.orderType = data
      this.toSearch()
    })
  },
  data() {
    return {
      topSearchData: {
        orderNoOrUserName: {
          title: '',
          type: 'text',
          placeholder: '单号/用户账号'
        },
        date: {
          title: '时间：',
          type: 'date',
          Rename: ['beginTime', 'endTime']
        },
        region: {
          title: '地区：',
          type: 'selectArea',
          data: ''
        }
      },
      toSearchData: {},
      orderType: [],
      tableData: [],
      pagTotal: 0,
      shipData: {
        other: [],
        now: []
      },
      useExport: '',
      pop: {
        popOrderSee: {
          show: false,
          data: ''
        },
        popEditAddr: {
          show: false,
          data: ''
        },
        popShip: {
          show: false,
          data: ''
        }
      },
      loading: false
    }
  },
  methods: {
    parseTime,
    changeType(val) {
      const ary = this.pop['popShip'].data.data
      this.pop['popShip'].data.type = val
      this.pop['popShip'].data.data = []
      this.$nextTick(() => {
        this.pop['popShip'].data.data = ary
      })
    },
    setShipData(type, selection) {
      if (type === 1) this.shipData.now = Object.assign([], selection) // 更改当前页
      if (type === 2) this.setOtherShip() // 合并至Other
      if (type === 3) this.setNowShip(selection) // 拆分至now
    },
    setOtherShip() {
      this.shipData.now.forEach(ele => {
        this.shipData.other.push(ele)
      })
      this.shipData.now = []
    },
    setNowShip(selection) {
      this.shipData.now = []
      this.$refs.tableMod.clearSelection()
      this.$nextTick(() => {
        selection.forEach((ele, index) => {
          this.shipData.other.forEach((obj, n) => {
            if (ele.id === obj.id) {
              this.shipData.now.push(ele)
              this.$refs.tableMod.toggleRowSelection(ele)
              delete this.shipData.other[n]
            }
          })
        })
        this.shipData.other = this.shipData.other.filter(item => item)
      })
    },
    checkShip(data) {
      let type = 0
      this.setShipData(2)
      if (data.quServiceName) {
        type = data.quServiceName !== '服务中心未开通' ? 1 : 2
        this.pop['popShip'].show = true
        this.pop['popShip'].data = {
          type: type,
          alone: true,
          data: [data]
        }
      } else {
        for (const i in this.shipData.other) {
          const blo = this.shipData.other[i].quServiceName !== '服务中心未开通' ? 1 : 2
          if (i * 1 === 0) type = blo
          else if (type !== blo) {
            type = false
            continue
          }
        }
        if (type === 0) return this.$message.error('请勾选需要发货的订单')
        if (!type) {
          this.$confirm('个人订单与服务中心订单不可一起发货！', '提示', {
            confirmButtonText: '清空所选',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            this.clearShip()
          }).catch(() => {
            this.setShipData(3, this.tableData)
          })
          return
        }
        this.pop['popShip'].show = true
        this.pop['popShip'].data = {
          type: type,
          data: this.shipData.other
        }
      }
    },
    removeShip(index) {
      this.shipData.other.splice(index, 1)
    },
    clearShip() {
      this.$refs.tableMod.clearSelection()
      this.$nextTick(() => {
        this.shipData = {
          other: [],
          now: []
        }
      })
    },
    /*  */
    getTypeVal(state, opt) {
      let val = ''
      opt.forEach(ele => {
        if (ele.value === state) {
          val = ele.label
          return val
        }
      })
      return val
    },
    shipReturn(val) {
      if (!val) return
      this.clearShip()
      this.toSearch()
    },
    toPopSee(name, data) {
      if (name === 'popShip') return this.checkShip(data)
      this.pop[name].show = true
      this.pop[name].data = data
    },
    closePop(name, value) {
      this.pop[name].show = false
      this.pop[name].data = ''
      if (name === 'popShip') this.setShipData(3, this.tableData)
      if (value) this.toSearch()
    },
    handleCurrentChange(val) {
      const opt = Object.assign({}, this.toSearchData)
      opt.pageNo = val - 1
      this.getList(opt)
    },
    toSearch(opt) {
      opt ? (this.toSearchData = opt) : (opt = this.toSearchData)
      this.pagTotal = 0
      this.getTotal(opt)
      this.getList(opt)
    },
    getTotal(opt) {
      opt = Object.assign({}, opt, { init: true })
      this.getList(opt, data => {
        this.pagTotal = data.count
      })
    },
    getList(obj, callback) {
      let opt = {
        init: false, // true获取记录，false获取记录个数
        pageNo: 0,
        pageSize: 10,
        state: 2,
        type: [200, 300, 400,500,600],
        userid: this.user.userId
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getCompanyOrders(opt)
        .then(res => {
          if (callback) callback(res.data)
          else this.applyList(res.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    applyList(data) {
      this.setOtherShip(2)
      const dataList = data.list
      this.tableData = []
      const regAry = []
      const table = dataList
      for (const item of dataList) {
        regAry.push(item.region)
      }
      fullnames(regAry).then(res => {
        const regTxt = res.data
        table.forEach(ele => {
          ele.regTxt = regTxt[ele.region]
        })
        this.tableData = Object.assign([], table)
        this.$nextTick(() => {
          this.loading = false
          this.setShipData(3, this.tableData)
        })
      })
    },
    setProInfo(list) {
      const info = []
      list.forEach(element => {
        info.push({
          protitle: element.proName,
          list_attrkv: element.attValues ? element.attValues.join('/') : '',
          count: element.tSuborderdetailsCount,
          sonOrderState: element.t_subOrderDetails_state
        })
      })
      return info
    }
  }
}
</script>
