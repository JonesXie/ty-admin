<template>
<div class="power-pg">
    <div class="section role-bar">
        <span class="title">当前项目：<label class="blue">{{pathData.menuName}}</label></span>
        <span class="title">角色：<label class="blue">{{pageNow.data.power}}</label></span>
        <span class="title">角色说明：<label class="blue">{{pageNow.data.info}}</label></span>
        <el-button class="bar-r" type="success" round @click="submitUpdate" >
            <i class="el-icon-check"></i>
            保存
        </el-button>
    </div>
    <div class="section role-table">
    <el-table :data="tableData" ref="tableData" style="width: 100%" class="menu-table"   row-class-name="title-row" 
     @row-click="rowExpand" v-loading="loading">
        <el-table-column label="序号" class-name="td-index" width="80px" type="index"  ></el-table-column>
        <el-table-column label="菜单名称" prop="nameinfo" class-name="td-title"></el-table-column>
        <el-table-column label="url地址"  prop="url"></el-table-column>
        <el-table-column label="操作" class-name="td-opre">
            <template slot-scope="scope">
                <el-checkbox v-model="scope.row.check" @change="clickAllCheck(scope.row, scope.row.check)"></el-checkbox>
            </template>
        </el-table-column>
         <el-table-column type="expand">
            <!-- 展开的内容部分 -->
            <template slot-scope="scope">
                <el-table :data="scope.row.childList" style="width:100%"  class="power-form menu-tb"  header-row-class-name="sub-title" >
                    <el-table-column class-name="td-index" width="80px" type="index"></el-table-column>
                    <el-table-column prop="nameinfo" ></el-table-column>
                    <el-table-column prop="url" align="left"></el-table-column>
                    <el-table-column >
                        <template slot-scope="child">
                            <el-checkbox v-model="child.row.check" @change="clickCheck(child.row, child.row.check)"></el-checkbox>
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { alterPowerUrl } from '@/api/power'
import { getOpenUrlList } from '@/api/power-url'
import topSearchMod from '@/components/topSearch/index'
export default {    
    name: 'modifyPower',
    components: {
        topSearchMod
    }, 
    computed: {
        ...mapGetters([
            'roleMenu', 'visitedViews'
        ])
    },
    data() {
        return {
            loading:false,
            title: 'modifyPower',
            pagTotal: 0,
            toSearchData: {
                menutype: ''
            },
            pathData: {

            },
            pageNow: {
                data: {},
                initApis: {}
            },
            subMit: {
                addArr: [],
                delArr: [],
                power: ''
            },
            tableData: []
        };
    },
    created() {
        if (!this.roleMenu) {
            this.$nextTick(() => {
                this.closePage('/power/roleList')
            })
            return
        }
        this.loading = true;
        this.pageNow.data = Object.assign({}, this.roleMenu);
        this.subMit.power = this.roleMenu.power
        this.pathData = {
            menuName: this.$route.query.menuName, 
            power: this.$route.params.power, 
            menutype: parseInt(this.$route.params.menutype)
        }
        this.toSearchData.menutype = parseInt(this.$route.params.menutype);
    },
    mounted() {
        this.toSearch()
    },
    methods: {
        submitUpdate() {
            this.$confirm('确认保存？', '提示', { type: 'warning' }).then(() => {
                alterPowerUrl(this.subMit).then(res => {
                    if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                    this.$message.success('操作成功！')
                    this.$store.dispatch('delCachedView', 'roleList'); //关闭缓存
                    this.closePage('/power/roleList?menutype=' + this.toSearchData.menutype)
                })
            }).catch()
        },
        checkArray(opt) {
            let blo = false;
            this.pageNow.data.list_map.forEach((api) => {
               if (api.urlid === opt.id) {
                    blo = true
                    return blo
                }
            })
            return blo
        },
        doAdd(item, method) {
            if (method === 'add') return this.subMit.addArr.push(item.id)
            this.subMit.addArr.forEach((id, index) => {
                if (id === item.id) {
                    return this.subMit.addArr.splice(index, 1)
                }
            })
        },
        doDel(item, method) {
            if (method === 'add') return this.subMit.delArr.push(item.id)
            this.subMit.delArr.forEach((id, index) => {
                if (id === item.id) {
                    return this.subMit.delArr.splice(index, 1)
                }
            })
        },
        clickAllCheck(item, checked=false) {
            item.childList.forEach(child => {
                this.clickCheck(child, checked, true)
                this.$set(child, 'check', checked)
            })
        },
        toAllCheck() {
            this.tableData.forEach((opt) => {
                let isAll = opt.childList.length > 0;
                opt.childList.forEach((item) => {
                   isAll = isAll && item.check
                   if (!isAll) return
                })
                this.$set(opt, 'check', isAll)
            })
        },
        clickCheck(item, checked=false, noAll = false) {
            if (noAll && item.check === checked) return;
            let init = this.checkArray(item)
            if (checked) {
                if (!init) this.doAdd(item, 'add') //如果不存在原api数组则添加
                this.doDel(item, 'del')
            } else {
                if (init) this.doDel(item, 'add') //如果存在原api数组则删除
                this.doAdd(item, 'del')
            }
            if (!noAll) this.toAllCheck()
        },
        rowExpand(row, event, column) {
           this.$refs.tableData.toggleRowExpansion(row);
        },
        handleCurrentChange(val) {
            let opt = {}
            opt.pageNo = val - 1;
            this.getList(opt)
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { init: true });
            this.getList(opt, (data) => {
                this.pagTotal = data.count;
            })
        },
        getList(obj, callback) {
            let opt = {
                "init": false, //true获取记录，false获取记录个数
                "pageNo": 0,
                "pageSize": 10
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getOpenUrlList(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            let list = Object.assign([], data.list);
            list.forEach((opt) => {
                let isAll = opt.childList.length > 0;
                opt.childList.forEach((item) => {
                   isAll = this.initCheck(item) && isAll
                })
                opt.check = isAll
            })
            this.tableData = list
        },
        initCheck(opt) {
            let isIn = false;
            this.pageNow.data.list_map.forEach((api) => {
                if (api.urlid === opt.id) {
                    opt.check = true
                    isIn = true;
                }
            })
            return isIn
        },
        closePage(path) {
            this.visitedViews.forEach(element => {
                if (element.title === this.title) {
                    this.$store.dispatch('delVisitedViews', element).then((views) => {
                        this.$router.push(path)
                    })
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    @import "../power.scss";
</style>
