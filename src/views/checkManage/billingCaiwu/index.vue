<template>
<div class="cao_form">
    <topSearchMod :searchData="topSearchData" @toSearch="toSearch"></topSearchMod>
    <el-table border stripe v-loading="loading" :data="tableData"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column prop="orderno" label="订单号"  align="center"></el-table-column>
        <el-table-column prop="addtime" label="进货日期"  align="center"></el-table-column>
        <el-table-column label="进货总价（万元）"  align="center">
          <template slot-scope="scope">
            <div class="red" v-math:eval="scope.row.sumMoney / 10000"></div>
          </template></el-table-column>
        <el-table-column label="开票状态"  align="center">
            <template slot-scope="scope">
                待开票
            </template>
        </el-table-column>
        <el-table-column label="发票类型"  align="center">
            <template slot-scope="scope">
                <span v-if="scope.row.type === 1">纸质发票</span>
                <span v-if="scope.row.type === 2">电子发票</span>
            </template> 
        </el-table-column>
        <el-table-column  label="操作"  align="center" >
            <template slot-scope="scope">
                <a class="blue" @click="toPopSee('popBilling', scope.row.msgdata, scope.row.id, scope.row.sumMoney)">查看开票信息</a>
            </template>
        </el-table-column> 
    </el-table>
    <div class="jxc-page fr">
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
    <popBilling :pop='pop.popBilling' @closePop="closePop('popBilling', $event)"></popBilling>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import topSearchMod from '@/components/topSearch/index'
import popBilling from '@/components/popBilling'
import { parseTime } from '@/utils'
import { getTaxRecords, CheckTaxtRecordAction } from '@/api/checkManage'
export default {
  name: 'billingCaiwu',
  components: {
    topSearchMod, popBilling
  },
  data() {
    return {
      topSearchData: {
        orderNo: {
          title: '订单号：',
          type: 'text',
          placeholder: '请输入订单号搜索'
        }
      },
      pop: {
        popBilling: {
          show: false,
          data: ''
        }
      },
      toSearchData: {},
      tableData: [],
      pagTotal: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    this.toSearch()
  },
  methods: {
    toPopSee(name, data, taxtId, sumMoney) {
      this.pop[name].show = true
      this.pop[name].data = data
      this.pop[name].taxId = taxtId
      this.pop[name].sumMoney = sumMoney
    },
    closePop(name, val) {
      if (val) this.toSearch()
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
        'type': '',
        'state': 2,
        'pageNo': 0,
        'pageSize': 10
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getTaxRecords(opt).then((res) => {
        this.loading = false
        if (callback) callback(res.data)
        else this.applyList(res.data)
      }).catch(() => {
        this.loading = false
      })
    },
    applyList(data) {
      const dataList = data.list
      this.tableData = []
      for (const item of dataList) {
        this.tableData.push({
          id: item.id,
          type: item.type,
          orderno: item.orderno,
          msgdata: JSON.parse(item.msgdata),
          addtime: item.addtime ? parseTime(item.addtime) : '',
          sumMoney: item.sumMoney
        })
      }
    }
  }
}
</script>




