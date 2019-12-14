<template>
<div class="power-pg">
    <!-- 菜单接口管理 -->
    <div class="section role-bar lineMid">
        <topSearchMod :searchData="setSys" :toSec="false" :toClear="false"  @change="toSysType"></topSearchMod>   
        <el-button type="primary" plain round style="width:100px;" @click="toInit()">
            <span>刷新接口</span>
        </el-button>   
    </div>
    <div class="section role-bar lineMid">   
        <topSearchMod :searchData="topSearchData"  @toSearch="toSearch"></topSearchMod>   
        <el-button type="success" round style="width:110px;" @click="toPopSee('addApi')">
            <i class="el-icon-plus"></i>
            <span>添加接口</span>
        </el-button>
    </div>
    <div class="section api-section" v-loading="loading">
        <template v-for="opt in ApiData" >
        <div :key="opt.controller + opt.id">
            <h2 class="api-title">{{opt.controller}}</h2>
            <el-collapse>
                <div v-for="(item, index) in opt.list" :key="'api_mod'+index" class="collApseBody">
                    <el-collapse-item >
                        <template slot="title">  
                            <div class="clearfix">                      
                                <span class="api-type" >
                                    {{splitUrl(item.apiurl, 0)}}
                                </span>
                                <span class="api-path">
                                    {{splitUrl(item.apiurl, 1)}}
                                </span> 
                            </div>             
                        </template>
                        <div class="api-info">                       
                            <ul>
                                <li>接口名称： {{item.name}}</li>
                                <li>接口说明: {{item.description}}</li>
                                <li>接口地址： {{item.apiurl}}</li>
                                <li>添加时间： {{getAddtime(item.addtime)}}</li>
                                <li>接口状态： {{getTypeVal(item.state)}}</li>
                            </ul>                      
                        </div>
                    </el-collapse-item>  
                    <span class="aloneClick">
                        <el-button type="text" class="blue" @click="toPopSee('editApi', item)">修改</el-button>       
                        <el-button v-if="item.state==1" type="text" class="red" @click="toPopSee('stopApi', item)">停用</el-button>
                        <el-button v-else type="text" class="green" @click="toPopSee('startApi', item)">启用</el-button>      
                    </span>
                </div>
            </el-collapse> 
        </div>
        </template>
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
    <!-- 弹窗 -->
    <add-api :pop = pop.addApi :sysType="sysType" :controller="topSearchData.controller.data" @closePop="closePop('addApi', $event)"></add-api>      
    <edit-api :pop = pop.editApi  @closePop="closePop('editApi', $event)"></edit-api>      
    <start-api :pop = pop.startApi  @closePop="closePop('startApi', $event)"></start-api>      
    <stop-api :pop = pop.stopApi  @closePop="closePop('stopApi', $event)"></stop-api>  
</div>
</template>
<script>
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import addApi from "./addApi.vue"
import editApi from "./editApi.vue"
import startApi from "./startApi.vue"
import stopApi from "./stopApi.vue"
import { getApiPageList, initApi, getAllController } from '@/api/power-apiUrl'
export default {
    name: 'apiManage',
    components:{
        addApi, editApi, startApi, stopApi, topSearchMod
    },
    data() {
        return { 
            topSearchData: {
                controller: {
                    title: 'controller：',
                    type: 'select',
                    placeholder: '选择主类',
                    data: []
                },
                state: {
                    title: '状态：',
                    type: 'select',
                    placeholder: '选择接口状态',
                    data: []
                }
            },
            setSys: {
                sysType: {
                    title: '系统类型：',
                    type: 'select',
                    placeholder: '选择系统',
                    data: []
                }
            },
            toSearchData: {},
            sysType: '',
            pagTotal: 0,
            loading: false,
            ApiData: [],
            pop: {
                addApi: {
                    show: false,
                    data: ''
                },
                editApi: {
                    show: false,
                    data: ''
                },
                startApi: {
                    show: false,
                    data: ''
                },
                stopApi: {
                    show: false,
                    data: ''
                }
            }
        }
    },
    created() {
        this.$store.dispatch('GETSysType').then(data => {
            this.setSys.sysType.data = data;
            this.setSys.sysType.defalut = data[0]
            this.toSearchData.sysType = data[0]
            this.GETApiAllController(data[0])
            this.toSysType({
                sysType: data[0]
            })
        })
        this.$store.dispatch('GETApiState').then(data => {
            this.topSearchData.state.data = data;
        })
    },
    mounted() {

    },
    methods:{
        toSysType(opt) {
            if (!opt) return
            this.sysType = opt.sysType
            this.GETApiAllController(opt.sysType)
        },
        GETApiAllController(data) {
            getAllController({
                sysType: data
            }).then(res => {
                this.topSearchData.controller.data = [{
                    value: '',
                    label: '全部'
                }]
                for (let key in res.data) {
                    this.topSearchData.controller.data.push({
                        value: res.data[key],
                        label: res.data[key]
                    })
                }
                this.$nextTick(() => {
                    this.toSearchData = {}
                    this.toSearch()
                })
            })
        },
        toInit() {
            this.loading = true;
            initApi().then((res) => {
                if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                this.$message.success(res.data.msg)
                this.toSearch()
            })
        },
        closePop(name, val) {
            this.pop[name].show = false
            this.pop[name].data = ''
            if (val) this.toSearch()
        },
        toPopSee(name, data) {
            this.pop[name].show = true;
            this.pop[name].data = data;
        },
        getAddtime(addtime) {
            return addtime ? parseTime(addtime) : ''
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
        },
        splitUrl(url, index) {
            return url.split(' ')[index]
        },
        handleCurrentChange(val) {
            let opt = Object.assign({}, this.toSearchData);
            opt.pageNo = val - 1;
            this.getList(opt)
        },
        getTotal(opt) {
            opt = Object.assign({}, opt, { init: true });
            this.getList(opt, (data) => {
                this.pagTotal = data.count;
            })
        },
        toSearch(opt) {
            opt ? this.toSearchData = opt : opt = this.toSearchData;
            opt.sysType = this.sysType;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getList(obj, callback) {
            let opt = {
                "init": false, //true获取记录，false获取记录个数
                "pageNo": 0,
                "pageSize": 10
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getApiPageList(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.ApiData = data.list ? data.list : []
        }
    } 

};
</script>
<style lang="scss" scoped>
@import "../power.scss";
.collApseBody{
    position: relative;
    .aloneClick{
        position: absolute;
        top: 6px;right: 0;
    }
}
</style>



