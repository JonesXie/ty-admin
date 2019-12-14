<template>
<div class="back-wrap report-form">
    <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
    <div class="table-w">
        <el-table border stripe v-loading="loading" :data="tableData" class="tableMod" ref="tableMod" style="width:100%">
            <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户账号" align="center"></el-table-column>
            <el-table-column prop="userNickName" label="用户名称" align="center"> </el-table-column>
            <el-table-column prop="userCredict" label="用户身份" align="center"></el-table-column>
            <el-table-column label="用户地址" align="center">
                <template slot-scope="scope">
                        <el-popover
                        placement="top-start"
                        title="用户地址:"
                        width="150px"
                        trigger="hover"
                        :content="scope.row.regTxt + ' ' + scope.row.addressInfo">
                        <div slot="reference">{{scope.row.addressInfo}}</div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="订单内容" align="center" width="80px">
                <template slot-scope="scope">
                    <el-button type="text" @click="toPopSee('popOrderSee', scope.row.proInfo)" class="blue">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="sumMoney" label="金额（万元）" align="center" width="120px">
              <template slot-scope="scope">
                <div v-math:eval="scope.row.sumMoney / 10000"></div>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" width="80px"> 
                <template slot-scope="scope">
                    <el-button type="text" class="blue" v-if="scope.row.bz" @click="toPopSee('popBeiZhu', scope.row.bz)">查看</el-button>
                    <span v-else>无</span>
                </template>
            </el-table-column>
            <el-table-column prop="addtime" label="下单时间" align="center"></el-table-column>
            <el-table-column prop="addtimeF" label="发货时间" align="center"></el-table-column>
            <el-table-column label="订单来源" align="center" >
                <template slot-scope="scope">
                  {{getTypeVal(scope.row.orderType, topSearchData.orderType.data)}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="物流" align="center" width="80px">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        title="快递单号："
                        width="150px"
                        trigger="hover"
                        :content="scope.row.kd_serio">
                        <div slot="reference">{{scope.row.compay}}</div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="jxc-page tc">
        <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="10"
        prev-text="上一页"
        next-text="下一页"
        :total="pagTotal">
        </el-pagination>
    </div>
    <popOrderSee :pop="pop.popOrderSee" @closePop="closePop('popOrderSee')"></popOrderSee>
    <popBeiZhu :pop = pop.popBeiZhu :justInfo='true' :justSee="true" @closePop="closePop('popBeiZhu')"></popBeiZhu>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import popBeiZhu from '@/components/popBeiZhu'
import { getOrderShipped } from '@/api/orderManage'
import { fullnames } from '@/api/address'
export default {
  name: 'waitShipsRe',
  components: {
    popOrderSee, topSearchMod, popBeiZhu
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data() {
    return {
      topSearchData: {
        userName: {
          title: '用户账号：',
          type: 'text',
          placeholder: '输入用户账号搜索'
        },
        region: {
          title: '地区：',
          type: 'selectArea',
          data: ''
        },
        orderType: {
          title: '订单来源：',
          type: 'select',
          data: []
        },
        date: {
          title: '时间：',
          type: 'date',
          Rename: ['startTime', 'endTime']
        }
      },
      toSearchData: {},
      tableData: [],
      pagTotal: 0,
      useExport: '',
      pop: {
        popOrderSee: {
          show: false,
          data: ''
        },
        popBeiZhu: {
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
  created() {
    this.$store.dispatch('GETOrderType').then(data => {
      this.topSearchData.orderType.data = data
      this.toSearch()
    })
  },
  methods: {
    getTypeVal(state, opt) {
      let val = ''
      opt.forEach((ele) => {
        if (ele.value === state) {
          val = ele.label
          return val
        }
      })
      return val
    },
    shipReturn(val) {
      if (val) this.toSearch()
    },
    toPopSee(name, data) {
      this.pop[name].show = true
      this.pop[name].data = data
    },
    closePop(name) {
      this.pop[name].show = false
      this.pop[name].data = ''
    },
    handleCurrentChange(val) {
      const opt = Object.assign({}, this.toSearchData)
      opt.pageNo = val - 1
      this.getList(opt)
    },
    toSearch(opt) {
      opt ? this.toSearchData = opt : opt = this.toSearchData
      this.pagTotal = 0
      this.getTotal(opt)
      this.getList(opt)
    },
    getTotal(opt) {
      opt = Object.assign({}, opt, { init: true })
      this.getList(opt, (data) => {
        this.pagTotal = data.count
      })
    },
    getList(obj, callback) {
      let opt = {
        'init': false, // true获取记录，false获取记录个数
        'pageNo': 0,
        'pageSize': 10
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getOrderShipped(opt).then((res) => {
        if (callback) callback(res.data)
        else this.applyList(res.data)
      }).catch(() => {
        this.loading = false
      })
    },
    applyList(data) {
      const dataList = data.list
      this.tableData = []
      const regAry = []
      const table = []
      for (const item of dataList) {
        regAry.push(item.region)
        table.push({
          id: item.id,
          orderNo: item.orderNo,
          bz: item.bz,
          addressInfo: item.addressInfo,
          region: item.region,
          userName: item.userName,
          orderType: item.orderType,
          userNickName: item.userNickName,
          userCredict: item.userCredict,
          sumMoney: item.sumMoney,
          addtime: item.addtime ? parseTime(item.addtime) : '',
          proInfo: this.setProInfo(item),
          addtimeF: item.addtimeF ? parseTime(item.addtimeF) : '',
          compay: item.compay,
          kd_serio: item.kd_serio
        })
      }
      fullnames(regAry).then(res => {
        const regTxt = res.data
        table.forEach(ele => {
          ele.regTxt = regTxt[ele.region]
        })
        this.tableData = Object.assign([], table)
        this.loading = false
      })
    },
    setProInfo(item) {
      const info = []
      item.subOrderDetailInfo.forEach(element => {
        info.push({
          protitle: element.proInfo ? element.proInfo.tProductTittle : '',
          list_attrkv: element.listAttValues,
          count: element.count
        })
      })
      return info
    }
  }
}
</script>