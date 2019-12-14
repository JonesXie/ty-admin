<template>
  <div class="back-wrap report-form">
    <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
    </div>
    <div class="table-w">
      <el-table border stripe v-loading="loading" :data="tableData"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
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
        <el-table-column label="金额（万元）" align="center" width="120px">
          <template slot-scope="scope">
            <div v-math:eval="scope.row.tOrderSummoney / 10000"></div>
          </template>
        </el-table-column>
        <el-table-column  label="核销时间" align="center">
          <template slot-scope="scope">
            {{scope.row.tOrderPaytime ? parseTime(scope.row.tOrderPaytime) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="物流信息" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.express_no" @click="$alert(`物流单号：${scope.row.express_no}`, `${scope.row.express_name}`)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column  label="订单来源" align="center">
          <template slot-scope="scope">
           {{getTypeVal(scope.row.tOrdertype, orderType)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="状态" align="center" width="80px">
          <template slot-scope="scope">
            {{'已领取'}}
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
import { getCompanyOrders } from '@/api/orderManage'
import { fullnames } from '@/api/address'
export default {
  name: 'sellRecord',
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
      tableData: [],
      pagTotal: 0,
      useExport: '',
      pop: {
        popOrderSee: {
          show: false,
          data: ''
        }
      },
      orderType: [],
      loading: false
    }
  },
  created() {
    this.$store.dispatch('GETOrderType').then(data => {
      this.orderType = data
      this.toSearch()
    })
  },
  methods: {
    parseTime,
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
        pageSize: 10,
        state: 5,
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
        })
      })
    },
    setProInfo(list) {
      const info = []
      list.forEach(element => {
        info.push({
          protitle: element.proName,
          list_attrkv: element.attValues ? element.attValues.join('/') : '',
          count: element.tSuborderdetailsCount
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
