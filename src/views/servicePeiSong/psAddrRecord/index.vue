<template>
  <div class="back-wrap report-form">
    <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
    </div>
    <div class="table-w">
      <el-table border stripe v-loading="loading" :data="tableData"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
        <el-table-column prop="seriano" label="订单号" align="center"></el-table-column>
        <el-table-column prop="userid" label="用户账号" align="center"></el-table-column>
        <el-table-column prop="opdata" label="地址更新" align="center"> </el-table-column>
        <el-table-column  label="修改时间" align="center">
          <template slot-scope="scope">
            {{scope.row.addtime ? parseTime(scope.row.addtime) : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="opuserid" fixed="right" label="操作人" align="center"></el-table-column>
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
import { getCompanyUpdateOrderAddressLogs } from '@/api/orderManage'
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
      getCompanyUpdateOrderAddressLogs(opt)
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
      this.tableData = Object.assign([], table)
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.topSec {
  margin-bottom: 40px;
}

</style>
