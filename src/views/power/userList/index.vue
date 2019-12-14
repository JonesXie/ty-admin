<template>
<div class="power-pg user-list-pg">
    <!-- 用户列表 -->
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="sysChose" :toSec="false" :toClear="false"  @change="toSysType"></topSearchMod> 
        <el-button type="success" class="submit-120w36 mt18" round @click="toPopSee('addUser')"><i><svg-icon icon-class="add-roleGroup"></svg-icon></i> 添加角色 </el-button>
     
    </div>
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="topSearchData"  @toSearch="toSearch"></topSearchMod> 
    </div>
    <div class="section role-table">
        <el-table :data="tableData" v-loading="loading" style="width: 100%" center>
                 <el-table-column label="序号" width="80px" type="index">                  
                </el-table-column>
                <el-table-column prop="userName" label="用户名" ></el-table-column>
                <el-table-column prop="power" label="角色名称" ></el-table-column>
                <el-table-column prop="info" label="角色说明" ></el-table-column>
               <el-table-column prop="addTime" label="添加时间" >                 
                   <template slot-scope="role">
                     {{role.row.addtime ? parseTime(role.row.addtime) : ''}}
                   </template>
               </el-table-column>
              <el-table-column prop="state" label="角色状态">                
                   <template slot-scope="scope">
                     <span v-if="scope.row.state===1" class="green">{{getTypeVal(scope.row.state, topSearchData.state.data)}}</span>
                     <span v-else-if="scope.row.state===0" class="red">{{getTypeVal(scope.row.state, topSearchData.state.data)}}</span>
                     <span v-else>{{getTypeVal(scope.row.state, topSearchData.state.data)}}</span>
                   </template>
               </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                       <a @click="toPopSee('editUser', scope.row)" class="blue">修改</a>
                       <a @click="toPopSee('startRole', scope.row)" class="green" v-if="scope.row.state!==1">启用</a>
                       <a @click="toPopSee('stopRole', scope.row)" class="yellow" v-else>禁用</a>
                       <a @click="toPopSee('delUser', scope.row)" class="red">删除</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="section filter jxc-page tc">
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
        <add-user :pop = pop.addUser :sysType="sysType"  @closePop="closePop('addUser', $event)"></add-user>      
        <editUser :pop = pop.editUser :sysType="sysType"  @closePop="closePop('editUser', $event)"></editUser>      
        <delUser :pop = pop.delUser :sysType="sysType"  @closePop="closePop('delUser', $event)"></delUser>      
        <start-role :pop = pop.startRole :sysType="sysType"  @closePop="closePop('startRole', $event)"></start-role>      
        <stop-role :pop = pop.stopRole :sysType="sysType" @closePop="closePop('stopRole', $event)"></stop-role>      
    </div>
</template>
<script>
import addUser from './addUser.vue'
import editUser from './editUser.vue'
import delUser from './delUser.vue'
import startRole from './startRole.vue'
import stopRole from './stopRole.vue'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import { getUserPowerList } from '@/api/power-user'
export default {
  components: {
    addUser, startRole, stopRole, editUser, delUser, topSearchMod
  },
  data() {
    return {
      pagTotal: 0,
      tableData: [],
      loading: false,
      sysChose: {
        sysType: {
          title: '系统选择：',
          type: 'select',
          placeholder: '选择接口状态',
          data: []
        }
      },
      sysType: '',
      topSearchData: {
        userName: {
          title: '用户名：',
          placeholder: '搜索用户'
        },
        power: {
          title: '角色名：',
          placeholder: '搜索角色'
        },
        state: {
          title: '状态：',
          type: 'select',
          placeholder: '选择接口状态',
          data: []
        }
      },
      toSearchData: {},
      userState: [],
      pop: {
        addUser: {
          show: false,
          data: ''
        },
        editUser: {
          show: false,
          data: ''
        },
        delUser: {
          show: false,
          data: ''
        },
        startRole: {
          show: false,
          data: ''
        },
        stopRole: {
          show: false,
          data: ''
        }
      }
    }
  },
  created() {
    this.$store.dispatch('GETSysType').then((data) => {
      this.sysChose.sysType.data = data
      const defalut = data[0]
      this.sysChose.sysType.defalut = defalut
      this.sysType = defalut
      this.toSearch()
    })
    this.$store.dispatch('GETUserPowerState').then(data => {
      this.topSearchData.state.data = data
    })
  },
  methods: {
    parseTime,
    toSysType(opt) {
      if (!opt) return
      this.sysType = opt.sysType
      this.toSearch()
    },
    handleCurrentChange(val) {
      const opt = Object.assign({}, this.toSearchData)
      opt.pageNo = val - 1
      this.getList(opt)
    },
    getTotal(opt) {
      opt = Object.assign({}, opt, { init: true })
      this.getList(opt, data => {
        this.pagTotal = data.count
      })
    },
    toSearch(opt) {
      opt ? this.toSearchData = opt : opt = this.toSearchData
      opt.sysType = this.sysType
      this.pagTotal = 0
      this.getTotal(opt)
      this.getList(opt)
    },
    getList(obj, callback) {
      let opt = {
        init: false, // true获取记录，false获取记录个数
        pageNo: 0,
        pageSize: 10
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getUserPowerList(opt).then(res => {
        this.loading = false
        if (callback) callback(res.data)
        else this.applyList(res.data)
      }).catch(() => {
        this.loading = false
      })
    },
    applyList(data) {
      this.tableData = Object.assign([], data.list)
    },
    closePop(name, val) {
      this.pop[name].show = false
      this.pop[name].data = ''
      if (val) this.toSearch()
    },
    toPopSee(name, data) {
      this.pop[name].show = true
      this.pop[name].data = data
    },
    getTypeVal(state, opt) {
      let val = ''
      opt.forEach((ele) => {
        if (ele.value === state) {
          val = ele.label
          return val
        }
      })
      return val
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../power.scss";
</style>

