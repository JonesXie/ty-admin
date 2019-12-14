<template>
<div class="power-pg">
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="topSearchData" :toSec="false" :toClear="false"  @change="toSearch"></topSearchMod>   
        <el-button  type="primary" round class="submit-120w36"  @click="toPopSee('addMenu')">
            <i class="el-icon-plus"></i> 添加新菜单
        </el-button>
        <el-button  type="warning" round plain class="submit-120w36"  @click="toPopSee('addSubMenu')">
            <i class="el-icon-plus"></i> 添加子菜单
        </el-button>
    </div>
    <div class="section role-table">
    <el-table :data="tableData" ref="tableData" style="width: 100%" class="menu-table"   row-class-name="title-row" 
     @row-click="rowExpand" @expand-change="expandChange" v-loading="loading">
        <el-table-column label="序号" class-name="td-index" width="80px" type="index"  ></el-table-column>
        <el-table-column label="菜单名称" prop="nameinfo" class-name="td-title"></el-table-column>
        <el-table-column label="url地址" min-width="180px" prop="url"></el-table-column>
        <el-table-column label="排序" prop="index" ></el-table-column>
        <el-table-column label="图标" prop="icon"  class-name="td-icon">
            <template slot-scope="scope">
                <span class="td-icon">
                    <div v-if="regImg(scope.row.img)" class="iconImg"><img :src="scope.row.img"></div>
                    <i v-else><svg-icon :icon-class="scope.row.img"></svg-icon></i>
                </span>
            </template>
        </el-table-column>  
        <el-table-column label="侧边栏" prop="state">
            <template slot-scope="scope">
                <span v-if="scope.row.menustate === '0'" class="red" >隐藏</span>
                <span v-else class="green" >显示</span>
            </template>
        </el-table-column> 
        <el-table-column label="状态" prop="state">
            <template slot-scope="scope">
                <span :class="{red:!scope.row.state}">{{getTypeVal(scope.row.state)}}</span>
            </template>
        </el-table-column>    
        <el-table-column label="操作" width="160px" class-name="td-opre">
            <template slot-scope="scope">
                <a  class="blue" @click="toPopSee('addMenu', scope.row)">修改</a>
                <a v-if="scope.row.state === 1" class="red" @click="toPopSee('stopUrl', scope.row)">停用</a>
                <a v-else class="green" @click="toPopSee('startUrl', scope.row)">启用</a>
            </template>
        </el-table-column>
         <el-table-column type="expand">
            <!-- 展开的内容部分 -->
            <template slot-scope="scope">
                <el-table :data="scope.row.childList" style="width:100%"  class="power-form menu-tb"  header-row-class-name="sub-title" >
                    <el-table-column class-name="td-index" width="80px" type="index"></el-table-column>
                    <el-table-column prop="nameinfo" ></el-table-column>
                    <el-table-column min-width="180px" prop="url" align="left"></el-table-column>
                    <el-table-column prop="index" ></el-table-column>
                    <el-table-column ></el-table-column>
                    <el-table-column>
                        <template slot-scope="child">
                            <span v-if="scope.row.menustate === '0'" class="red" >隐藏</span>
                            <span v-else-if="child.row.menustate === '0'" class="red" >隐藏</span>
                            <span v-else-if="child.row.menustate === '1'" class="green" >显示</span>
                        </template>
                    </el-table-column>
                    <el-table-column >
                        <template slot-scope="child">
                            <span :class="{red:!child.row.state}">{{getTypeVal(child.row.state)}}</span>
                        </template>
                    </el-table-column> 
                    <el-table-column width="160px">
                        <template slot-scope="child">
                            <a  class="blue" @click="toPopSee('addSubMenu', child.row)">修改</a>
                            <a v-if="child.row.state === 1" class="red" @click="toPopSee('stopUrl', child.row)">停用</a>
                            <a v-else class="green" @click="toPopSee('startUrl', child.row)">启用</a>
                        </template>
                    </el-table-column>
                    <el-table-column width="48px"></el-table-column>
                </el-table>
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
        <add-menu :pop = pop.addMenu :menutype='toSearchData.menutype'  @closePop="closePop('addMenu', $event)"></add-menu>
        <add-sub-menu :tableData='tableData' :pop = pop.addSubMenu  @closePop="closePop('addSubMenu', $event)"></add-sub-menu>  
        <startUrl :pop = pop.startUrl  @closePop="closePop('startUrl', $event)"></startUrl>  
        <stopUrl :pop = pop.stopUrl  @closePop="closePop('stopUrl', $event)"></stopUrl>  
    </div>
</template>
<script>
import addMenu from './addMenu.vue'
import addSubMenu from './addSubMenu.vue'
import startUrl from './startUrl'
import stopUrl from './stopUrl'
import { getAllUrlList } from '@/api/power-url'
import topSearchMod from '@/components/topSearch/index'
export default {
  name: 'menuManage',
  components: {
    addMenu, addSubMenu, startUrl, stopUrl, topSearchMod
  },
  data() {
    return {
      loading: false,
      pagTotal: 0,
      topSearchData: {
        menutype: {
          title: '项目选择：',
          type: 'select',
          placeholder: '选择接口状态',
          defalut: 0,
          data: []
        }
      },
      toSearchData: {},
      pop: {
        addMenu: {
          show: false,
          data: ''
        },
        addSubMenu: {
          show: false,
          data: ''
        },
        startUrl: {
          show: false,
          data: ''
        },
        stopUrl: {
          show: false,
          data: ''
        }
      },
      tableData: [],
      openRow: [],
      urlState: []
    }
  },
  created() {
    this.$store.dispatch('GETUrlState').then((data) => {
      this.urlState = data
    })
  },
  mounted() {
    this.$store.dispatch('GETMenuType').then((data) => {
      this.topSearchData.menutype.data = data
      this.topSearchData.menutype.defalut = data[0].value
      this.toSearchData = {
        menutype: this.topSearchData.menutype.defalut
      }
      this.toSearch()
    })
  },
  methods: {
    regImg(data) {
      const reg = new RegExp('http')
      return reg.test(data)
    },
    closePop(name, val) {
      this.pop[name].show = false
      this.pop[name].data = ''
      if (val) {
        this.toSearch()
      }
    },
    toPopSee(name, data) {
      this.pop[name].show = true
      this.pop[name].data = data
    },
    expandChange(row, expand) {
      this.openRow = []
      if (expand.length > 1) {
        this.$refs.tableData.toggleRowExpansion(expand[0])
        return
      } else
      if (expand.length === 1) {
        this.openRow.push(expand[0].id)
        this.openRow = Array.from(new Set(this.openRow))
      }
    },
    rowExpand(row, event, column) {
      const tagName = event ? event.target.tagName.toLowerCase() : ''
      if (tagName === 'a') return
      this.$refs.tableData.toggleRowExpansion(row)
    },
    handleCurrentChange(val) {
      const opt = {}
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
        'pageSize': 10,
        menutype: 0
      }
      opt = Object.assign(opt, obj)
      this.loading = true
      getAllUrlList(opt).then((res) => {
        this.loading = false
        if (callback) callback(res.data)
        else this.applyList(res.data)
      }).catch(() => {
        this.loading = false
      })
    },
    applyList(data) {
      this.tableData = []
      this.tableData = data.list
      this.openRow.forEach(ele => {
        this.tableData.forEach(row => {
          if (ele === row.id) {
            this.$refs.tableData.toggleRowExpansion(row)
          }
        })
      })
    },
    getTypeVal(state) {
      let val = ''
      this.urlState.forEach((ele) => {
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
.td-icon >>> .iconImg {
    font-size: 0;
    height: 28px;
    >>> img {
        width: 28px;
        height: 28px;
        display: inline-block;
    }
}
</style>