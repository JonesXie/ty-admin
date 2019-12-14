<template>
<div class="back-wrap report-form">
    <topSearchMod :searchData="topSearchData" :useExport="useExport" :useExportData="toSearchData" @toSearch="toSearch"></topSearchMod>
    <el-table border stripe :data="tableData" v-loading="loading"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
        <el-table-column prop="orderNo" label="订单号"  align="center"></el-table-column>
        <el-table-column prop="addtime" label="下单时间"  align="center">
          <template slot-scope="scope">
            {{scope.row.addtime ? parseTime(scope.row.addtime) : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="payTime" label="支付时间"  align="center">
          <template slot-scope="scope">
            {{scope.row.payTime ? parseTime(scope.row.payTime) : ''}}
          </template>
        </el-table-column>
        <el-table-column  label="订单内容"  align="center" width="80px">
            <template slot-scope="scope"><a @click="toPopSee(scope.row.subOrderInfo)" class="blue">查看</a></template></el-table-column>
        <el-table-column prop="reciveName" label="购买用户"  align="center"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话"  align="center"></el-table-column>
        <el-table-column label="用户地址"  align="center" width="220px" >
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
        <el-table-column prop="sumCount" label="订单总件数"  align="center" width="140px"></el-table-column>
        <el-table-column label="订单金额（万元）"  align="center" >
          <template slot-scope="scope">
            <div v-math:eval="scope.row.summoney / 10000"></div>
          </template>
        </el-table-column>
        <el-table-column prop="stateStr" label="订单状态"  align="center" ></el-table-column>
    </el-table>
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
    <popSee :pop="pop"  @closePop="closePop" ></popSee>
</div>
</template>
<script>
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popSee from './popSee'
import { getOrderReportExcellAdminByTime, exportOrderBook } from '@/api/reportFormManage'
import { fullnames } from '@/api/address'
export default {
  name: 'orderReport',
  components: {
    topSearchMod, popSee
  },
  data() {
    return {
      topSearchData: {
        orderNo: {
          title: '订单号:',
          type: 'text',
          placeholder: '输入订单号搜索'
        },
        proName: {
          title: '商品名：',
          type: 'text',
          placeholder: '输入产品名搜索'
        },
        region: {
          title: '地区：',
          type: 'selectArea',
          data: ''
        },
        state: {
          title: '订单状态：',
          type: 'select',
          data: [{
            label: '全部',
            value: ''
          }, {
            label: '未付款',
            value: 0
          }, {
            label: '已付款',
            value: 2
          }, {
            label: '已发货',
            value: 4
          }, {
            label: '已收货',
            value: 5
          }]
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
        show: false,
        data: ''
      },
      loading: false
    }
  },
  mounted() {
    this.toSearch()
    this.useExport = exportOrderBook()
  },
  methods: {
    parseTime,
    handleCurrentChange(val) {
      const opt = Object.assign({}, this.toSearchData)
      opt.pageNo = val - 1
      this.getList(opt)
    },
    toPopSee(data) {
      this.pop.show = true
      this.pop.data = data
    },
    closePop() {
      this.pop.show = false
      this.pop.data = ''
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
      getOrderReportExcellAdminByTime(opt).then((res) => {
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
        this.loading = false
      })
    },
    setAttr(data) {
      let str = ''
      data = data[0].list
      const length = data.length - 1
      data.forEach((element, index) => {
        str += element.key.tAttributeName + ': '
        str += element.value.tAttributeValueName
        if (length !== index) str += ' / '
      })
      return str
    }
  }
}
</script>





