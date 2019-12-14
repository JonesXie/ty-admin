<template>
  <div class="back-wrap report-form">
    <div class="lineMid topSec">
      <topSearchMod :searchData="topSearchData"  @toSearch="toSearch" :toClear="false"></topSearchMod>
      <router-link to="/servicePeiSong/wuliuRecord" class="fr">
        <el-button type="primary" round style="width:120px;">
          <i class="el-icon-edit"></i>
          <span>修改记录</span>
        </el-button>
      </router-link>
    </div>
    <div style="height: 400px" v-if="loading && !tableData.length" v-loading="loading"></div>
    <div class="table-w" v-if="tableData.length > 0">
      <el-table border stripe v-loading="loading" :data="tableData"  class="tableMod" ref="tableMod" style="width:100%">
        <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
        <el-table-column prop="tOrderSerio" label="订单号" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户账号" align="center"></el-table-column>
        <el-table-column prop="nickName" label="用户名称" align="center"> </el-table-column>
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
        <el-table-column  label="发货时间" align="center">
          <template slot-scope="scope">
            {{scope.row.tOrderPaytime ? parseTime(scope.row.tOrderPaytime) : ''}}
          </template>
        </el-table-column>
        <el-table-column label="物流信息" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" class="blue" v-if="scope.row.express && scope.row.express.id" @click="$alert(`物流单号：${scope.row.express.kdSerio}`, `${scope.row.express.company}`)">查看</el-button>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="状态" align="center" width="100px">
          <template slot-scope="scope">
            {{'已发货'}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <el-button type="text" @click="toPopSee('popShip', scope.row)" class="blue">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-none" v-if="isSearch && tableData.length === 0">
      <p>暂无记录</p>
    </div>

    <popOrderSee :pop="pop.popOrderSee" @closePop="closePop('popOrderSee')"></popOrderSee>
    <popShip :pop="pop.popShip" @closePop="closePop('popShip', $event)" ></popShip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import { getCompanySerchModifyOrderExpressInfos } from '@/api/orderManage'
import popShip from './popShip.vue'
export default {
  name: 'wuliuEdit',
  components: {
    popOrderSee,
    topSearchMod,
    popShip
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      topSearchData: {
        userNameOrOrderNo: {
          title: '',
          type: 'text',
          placeholder: '订单号/用户账号'
        }
      },
      toSearchData: {},
      tableData: [],
      isSearch: false,
      pop: {
        popOrderSee: {
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
  },
  methods: {
    parseTime,
    toPopSee(name, data) {
      this.pop[name].show = true
      this.pop[name].data = data
    },
    closePop(name, val) {
      this.pop[name].show = false
      this.pop[name].data = ''
      if (val) this.toSearch()
    },
    toSearch(opt) {
      opt ? (this.toSearchData = opt) : (opt = this.toSearchData)
      this.getList(opt)
    },
    getList(obj, callback) {
      let opt = {}
      opt = Object.assign(opt, obj)
      this.loading = true
      this.isSearch = false
      getCompanySerchModifyOrderExpressInfos(opt)
        .then(res => {
          if (callback) callback(res.data)
          else this.applyList(res.data)
        })
        .catch(() => {
          this.isSearch = true
          this.loading = false
        })
    },
    applyList(dataList) {
      this.tableData = []
      const regAry = []
      const table = dataList
      this.tableData = Object.assign([], table)
      this.$nextTick(() => {
        this.isSearch = true
        this.loading = false
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
.report-form{
  min-height: 700px;
}
.topSec {
  margin-bottom: 40px;
}
.table-none{
  text-align: center;
  padding-top: 200px;
  padding-bottom: 240px;
  p{
    padding-top: 120px;
    background: url(./wuliuRditNone.png) no-repeat center top;
    font-size: 18px;
    color: #636C89;
  }
}
</style>
<style scoped>
.topSec >>> .el-input{
  width: 340px;
}
</style>

