<template>
  <div class="back-wrap report-form">
    <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
    </div>
    <div class="table-w">
      <el-table border stripe v-loading="loading" :data="tableData"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
        <el-table-column prop="seriano" label="订单号" align="center"></el-table-column>
        <el-table-column prop="info.userName" label="用户账号" align="center"></el-table-column>
        <el-table-column prop="info.nickName" label="用户名称" align="center"> </el-table-column>
        <el-table-column label="订单内容" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" @click="toPopSee('popOrderSee', setProInfo(scope.row.info.orderDetail))" class="blue">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="金额（万元）" align="center" width="120px">
          <template slot-scope="scope">
            <div v-math:eval="scope.row.info.tOrderSummoney / 10000"></div>
          </template>
        </el-table-column>
        <el-table-column label="原物流信息" align="center" width="100px">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.info.oldExpress.code" @click="$alert(`物流单号：${scope.row.info.oldExpress.kdSerio}`, `${scope.row.info.oldExpress.company}`)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.info.newExpress.code" @click="$alert(`物流单号：${scope.row.info.newExpress.kdSerio}`, `${scope.row.info.newExpress.company}`)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作人" align="center">
          <template slot-scope="scope">
            {{scope.row.opuserid}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="状态" align="center" width="80px">
          <template slot-scope="scope">
            {{'已发货'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="jxc-page tc">
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :page-size="10" prev-text="上一页" next-text="下一页" :total="pagTotal">
      </el-pagination>
    </div>
    <popOrderSee :pop="pop.popOrderSee" @closePop="closePop('popOrderSee')"></popOrderSee>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import { getCompanyUpdateOrderExpressLogs } from '@/api/orderManage'
import { fullnames } from '@/api/address'
import { isJSON } from '@/utils'
export default {
  name: 'wuliuRecord',
  components: {
    popOrderSee,
    topSearchMod
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      topSearchData: {
        orderNo: {
          title: '',
          type: 'text',
          placeholder: '订单编号'
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
        }
      },
      loading: false
    }
  },
  created() {
    this.toSearch()
  },
  methods: {
    parseTime,
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
        pageSize: 10
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getCompanyUpdateOrderExpressLogs(opt)
        .then(res => {
          if (callback) callback(res.data)
          else this.applyList(res.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    applyList(data) {
      const dataList = data.list
      this.tableData = []
      const table = dataList
      table.forEach(ele => {
        if (isJSON(ele.opdata)) {
          var obj = JSON.parse(ele.opdata)
          ele.info = obj
        } else {
          ele.info = {
            oldExpress: {},
            newExpress: {},
            orderDetail: []
          }
        }
      })
      this.tableData = Object.assign([], table)
      this.$nextTick(() => {
        this.loading = false
      })
    },
    setProInfo(list) {
      const info = []
      list.forEach(element => {
        info.push({
          protitle: element.proName,
          list_attrkv: element.attrValues,
          count: element.count
        })
      })
      return info
    }
  }
}
</script>

<style lang="scss" scoped>
.topSec {
  margin-bottom: 40px;
}

</style>
