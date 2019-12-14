<template>
<div class="power-pg">
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="menuChose" :toSec="false" :toClear="false"  @change="toMenuType"></topSearchMod>   
    </div>
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="topSearchData"  @toSearch="toSearch"></topSearchMod>   
    </div>
    <div class="section role-table">
        <el-table :data="tableData" v-loading="loading" style="width: 100%" center>
                <el-table-column label="序号" width="80px" type="index">                  
            </el-table-column>
            <el-table-column prop="power" label="角色名称"></el-table-column>
            <el-table-column prop="info" label="角色说明"></el-table-column>
            <el-table-column label="权限">
                <template slot-scope="scope">
                    <div class="tc" v-if="scope.row.list_map==0">
                        <span style="color:#999">暂未设置</span>
                    </div>                        
                    <a class="blue" v-else @click="toPopSee('seeMenuRole', scope.row.list_map)">查看</a>
                </template>
            </el-table-column>
            <el-table-column prop="opreate" label="操作" >
                <template slot-scope="scope">
                    <a class="blue" @click="toUpdateRole(scope.row)">修改</a>
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
    <seeMenuRole :pop = pop.seeMenuRole  @closePop="closePop('seeMenuRole')"></seeMenuRole>      
    </div>
</template>
<script>
import seeMenuRole from "./seeMenuRole.vue";
import topSearchMod from '@/components/topSearch/index'
import { getPowerUrlList } from '@/api/power'
export default {
    name: 'roleList',
    components: {
        seeMenuRole, topSearchMod
    },
    data() {
        return {
        pagTotal: 0,
        tableData: [],
        loading: false,
        menuChose: {
            menuType: {
                title: '项目选择：',
                type: 'select',
                placeholder: '选择接口状态',
                data: []
            }
        },
        menuType: '',
        menuTypeName: '',
        topSearchData: {
            power: {
            title: "角色名：",
            placeholder: "搜索角色"
            }
        },
        toSearchData: {},
        pop: {
            seeMenuRole: {
                show: false,
                data: ''
            }
        }
        };
    },
    created() {
        this.$store.dispatch('GETMenuType').then((data) => {
            this.menuChose.menuType.data = data
            let defalut = this.$route.query.menutype ? parseInt(this.$route.query.menutype) : data[0].value;
            this.menuChose.menuType.defalut = defalut
            this.menuType = defalut
            this.menuTypeName = this.getTypeVal(defalut)
            this.toSearch()
        })
    },
    methods: {
        /* 跳转修改页 */
        toUpdateRole(item) {
            this.$store.dispatch('SetRoleMenu', item)
            this.$router.push(`/power/modifyPower/${item.power}/${this.menuType}?menuName=${this.menuTypeName}`)
        },
        toMenuType(opt) {
            if (!opt) return
            this.menuType = opt.menuType
            this.menuTypeName = this.getTypeVal(opt.menuType)
            this.toSearch()
        },
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            this.getList(opt);
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { init: true });
            this.getList(opt, data => {
                this.pagTotal = data.count;
            });
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            opt.menuType = this.menuType;
            this.pagTotal = 0;
            this.getTotal(opt);
            this.getList(opt);
        },
        getList(obj, callback) {
            let opt = {
                init: false, //true获取记录，false获取记录个数
                pageNo: 0,
                pageSize: 10
            };
            opt = Object.assign(opt, obj);
            this.loading = true;
            getPowerUrlList(opt).then(res => {
                this.loading = false;
                if (callback) callback(res.data);
                else this.applyList(res.data);
            }).catch(() => {
                this.loading = false;
            });
        },
        applyList(data) {
            this.tableData = Object.assign([], data.list);
        },
        closePop(name, val) {
            this.pop[name].show = false;
            this.pop[name].data = "";
            if (val) this.toSearch();
        },
        toPopSee(name, data) {
            this.pop[name].show = true;
            this.pop[name].data = data;
        },
        getTypeVal(state) {
            let val = ''
            this.menuChose.menuType.data.forEach((ele) => {
                if (ele.value === state) {
                    val = ele.label
                    return val
                }
            })
            return val;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../power.scss";
</style>

