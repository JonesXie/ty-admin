<template>
<div class="back-wrap report-form">
    <topSearchMod :searchData="topSearchData" :useExport="useExport" @toSearch="toSearch"></topSearchMod>
    <div class="table-w">
        <el-table border stripe v-loading="loading" :data="tableData" class="tableMod" ref="tableMod" style="width:100%">
            <el-table-column type="index" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="userName" label="用户账号" align="center"></el-table-column>
            <el-table-column prop="nickName" label="用户名称" align="center"> </el-table-column>
            <el-table-column prop="identitination" label="用户身份" align="center"></el-table-column>
            <el-table-column label="退货商品" align="center" width="80px">
                <template slot-scope="scope">
                    <el-button type="text" @click="toPopSee('popOrderSee', scope.row.proInfo)" class="blue">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center" width="80px">
                <template slot-scope="scope">
                    <el-button type="text" class="blue" v-if="scope.row.info" @click="toPopSee('popBeiZhu', scope.row.info)">查看</el-button>
                    <span v-else>无</span>
                </template>
            </el-table-column>
            <el-table-column prop="addtime" label="提交时间" align="center"></el-table-column>
            <el-table-column fixed="right" label="状态" align="center" width="160px">
                <template slot-scope="scope">
                    <div :class="{ 
                        red:scope.row.state === -1, 
                        blue:scope.row.state === 1, 
                        green:scope.row.state === 2 
                    }">
                        {{scope.row.stateVal}}</div>
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
    <popOrderSee :pop="pop.popOrderSee" @closePop="closePop('popOrderSee')"></popOrderSee>
    <popBeiZhu :pop = pop.popBeiZhu :justInfo='true' :justSee="true" @closePop="closePop('popBeiZhu')"></popBeiZhu>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import popOrderSee from '@/components/popOrderSee'
import popBeiZhu from '@/components/popBeiZhu'
import { getReturnRecordsFromCompanyAll } from '@/api/checkManage'
export default {
    name: "checkRecordReturns",
    components: {
        popOrderSee, topSearchMod, popBeiZhu
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {
            topSearchData: {
                userid: {
                    title: '用户账号：',
                    type: 'text',
                    placeholder: '输入用户账号搜索'
                },
                state: {
                    title: '状态：',
                    type: 'select',
                    placeholder: '选择分类信息',
                    data: [{
                        label:"全部",
                        value: ''
                    }]
                },  
                region: {
                    title: '地区：',
                    type: 'selectArea',
                    data: ''
                },
                date: {
                    title: '时间：',
                    type: 'date',
                    Rename: ['startDate', 'endDate']
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
                },
                popSeeImg: {
                    show: false,
                    data: ''
                },
                popBeiZhu: {
                    show: false,
                    data: ''
                }
            },
            loading: false
        }
    },
    mounted() {
        this.getState(this.toSearch)
    },
    methods: {
        getState(callback) {
            this.$store.dispatch('GETPurchaseState').then((data) => {
                this.topSearchData.state.data = data
                callback ? callback() : '';
            })
        },
        toPopSee(name, data) {
            this.pop[name].show = true;
            this.pop[name].data = data;
        },
        closePop(name) {
            this.pop[name].show = false;
            this.pop[name].data = '';
        },
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageInfo = {
                countPerPage: 10,
                pageNo:  val - 1
            } 
            this.getList(opt)
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { flagRe: false });
            this.getList(opt, (data) => {
                this.pagTotal = data.count;
            })
        },
        getList(obj, callback) {
            let opt = {
                "flagRe": true, //true获取记录，false获取记录个数
                type: 1,
                pageInfo: {
                    countPerPage: 10,
                    pageNo: 0
                }
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getReturnRecordsFromCompanyAll(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            let dataList = data.list;
            this.tableData = [];
            for (let item of dataList) {
                this.tableData.push({
                    id: item.id,
                    orderNo: item.orderNo,
                    info: item.info,
                    userName: item.userName,
                    nickName: item.nickName,
                    identitination: item.identitination,
                    state: item.state,
                    stateVal: this.getTypeVal(item.state),
                    addtime: item.addtime ? parseTime(item.addtime) : '',
                    proInfo: [{
                        protitle: item.proName,
                        list_attrkv: item.list_attrkv,
                        count: item.count
                    }]
                })
            }
        },
        getTypeVal(state) {
            let val = ''
            this.topSearchData.state.data.forEach((ele) => {
                if (ele.value === state) {
                    val = ele.label
                    return val
                }
            })
            return val;
        }
    }
}
</script>