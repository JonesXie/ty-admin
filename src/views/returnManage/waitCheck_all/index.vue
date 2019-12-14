<template>
  <div class="back-wrap report-form">
   <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData" @toSearch="toSearch"></topSearchMod>
      <div class="topLine fr ">
        <router-link to="/returnManage/waitCheck_all_r">
          <el-button type="success" round plain style="width:120px;">
            <i class="el-icon-search"></i>
            <span>审核记录</span>
          </el-button>
          </router-link>
      </div>
    </div>

    <div class="table-w">
      <el-table border stripe v-loading="loading" :data="tableData" class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
        <el-table-column prop="refund_order.t_refund_serio" label="退款单号" align="center"></el-table-column>
        <el-table-column prop="refund_order.t_order_serio" label="订单号" align="center"></el-table-column>
        <el-table-column prop="refund_order.t_userId" label="用户账号" align="center"></el-table-column>
        <el-table-column label="退货商品" align="center">
          <template slot-scope="scope">
            <a class="see" @click="toPopSee('popOrderSee', setProInfo(scope.row))">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="退货原因" align="center">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.refund_order.t_refund_reasons" @click="toPopSee('popReason', scope.row.refund_order.t_refund_reasons)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="金额（元）" align="center" min-width="108px">
          <template slot-scope="scope">
            <div class="orange">
            {{scope.row.salePrice * scope.row.count}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" align="center">
          <template slot-scope="scope">
           {{ scope.row.refund_order.t_refund_applytime ? parseTime(scope.row.refund_order.t_refund_applytime) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="退款类型" align="center">
          <template slot-scope="scope">
           <div v-if="scope.row.refund_order.t_refund_type === 1">仅退款</div>
           <div v-else-if="scope.row.refund_order.t_refund_type === 2">退货退款</div>
           <div v-else>其他</div>
          </template>
        </el-table-column>
        <el-table-column label="退款物流" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.refund_order.isReceipt === 1">已收货</div>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <el-table-column label="退货凭证" align="center">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.refund_order.t_refund_evidence" @click="toPopSee('popSeeImg', scope.row.refund_order.t_refund_evidence.split(';'))">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="106">
          <template slot-scope="scope">
            <a class="green" @click="setPopCheck(scope.row, 1)">同意</a>
            <a class="yellow" @click="setPopCheck(scope.row, 3)">拒绝</a>
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
    <popOrderSee :pop="pop.popOrderSee" :width="'680px'" :priceShow= true  @closePop="closePop('popOrderSee')"></popOrderSee>
    <popCheck :pop="pop.popCheck" @closePop="closePop('popCheck', $event)"></popCheck>
    <popSeeImg :id="'waitCheck_all'" :pop="pop.popSeeImg" @closePop="closePop('popSeeImg')"></popSeeImg>
    <popBeiZhu :pop = pop.popReason :justInfo='true' :justSee='true' :title="'退货原因'" :popLabel="'退货原因：'" @closePop="closePop('popReason')"></popBeiZhu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import popSeeImg from '@/components/popSeeImg'
import popCheck from './popCheck'
import popBeiZhu from '@/components/popBeiZhu'
import { getCompanyRefundOrderRecords as api_getList } from '@/api/orderManage'
export default {
  name: 'waitCheck_all',
  components: {
    popOrderSee, topSearchMod, popCheck, popSeeImg, popBeiZhu
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data: () => {
    return {
      topSearchData: {
        orderNoOrUserName: {
          title: '',
          type: 'text',
          placeholder: '退货单号/用户账号'
        },
        date: {
          title: '时间：',
          type: 'date',
          Rename: ['beginTime', 'endTime']
        },
        type: {
          title: '退款类型',
          type: 'select',
          defalut: '1, 2',
          data: [{
            label: '全部',
            value: '1, 2'
          }, {
            label: '仅退款',
            value: '1'
          }, {
            label: '退货退款',
            value: '2'
          }]
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
      loading: false,
      pop: {
        popOrderSee: {
          show: false,
          data: ''
        },
        popCheck: {
          show: false,
          data: '',
          type: 1
        },
        popSeeImg: {
          show: false,
          data: ''
        },
        popReason: {
          show: false,
          data: ''
        }
      }
    }
  },
  mounted() {
    this.toSearch()
  },
  methods: {
    parseTime,
    setPopCheck(item, type) {
      this.pop.popCheck.userid = this.user.userId
      this.pop.popCheck.data = item.refund_order.id
      this.pop.popCheck.type = type
      this.pop.popCheck.show = true
    },
    toPopSee(name, data) {
      this.pop[name].show = true
      this.pop[name].data = data
    },
    closePop(name, refresh) {
      this.pop[name].show = false
      this.pop[name].data = ''
      if (refresh) {
        this.toSearch()
        this.$store.dispatch('delCachedView', 'waitCheck_done_r') // 关闭缓存
      }
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
        checkState: 99,
        state: 1,
        userid: this.user.userId
      }
      opt = Object.assign(opt, obj)
      if (opt.type) opt.type = opt.type.split(',')
      else opt.type = [1, 2]

      this.loading = true
      api_getList(opt)
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
      this.tableData = Object.assign([], dataList)
      this.loading = false
    },
    setProInfo(list) {
      const info = []
      info.push({
        protitle: list.proName,
        list_attrkv: list.listAttValues,
        count: list.count,
        price: list.salePrice,
        priceAll: list.salePrice * list.count
      })
      return info
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


