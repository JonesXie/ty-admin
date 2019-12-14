<template>
<div class="power-pg">
    <!-- 菜单接口管理 -->
    <div class="section role-bar lineMid">   
        <p class="title">{{pathData.title}}</p>
        <topSearchMod :searchData="topSearchData"  @toSearch="toSearch"></topSearchMod>   
    </div>
    <div class="section role-bar fix toSure">
        <div class="roleList" style="min-height: 120px" v-loading="loading">
            <div class="scroll-box" v-if="Object.keys(pageNow.initApis).length > 0">
                <span v-for="api in pageNow.initApis" :key="'api'+ api.id" class="power-list-i"><i class=" green"><svg-icon icon-class="icon-sure"></svg-icon></i>{{api.controller}} > {{api.description}}</span> 
            </div>
            <div v-else class="tc" style="line-height:80px">无绑定接口</div>
        </div>
        <div class="fr">
            <span style="margin-right:20px;">绑定接口数量： {{Object.keys(pageNow.initApis).length}}</span>
            <el-button type="success" round style="width:110px;" @click="submitUpdate">
                <span>保存</span>
            </el-button>
        </div>
    </div>
    <div class="section api-section content" v-loading="loading">
        <template v-for="(opt) in ApiData" >
        <div :key="opt.controller + opt.id">
            <h2 class="api-title">{{opt.controller}}</h2>
            <el-collapse>
                <div v-for="(item, index) in opt.list" :key="'api_mod'+index" class="collApseBody">
                    <el-collapse-item >
                        <template slot="title">  
                            <div class="clearfix"> 
                                <el-checkbox-group class="fr" v-model="item.check" @change="clickCheck(item, item.check)">
                                    <el-checkbox></el-checkbox>
                                </el-checkbox-group>
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
        :page-size="30"
        prev-text="上一页"
        next-text="下一页"
        :total="pagTotal">
        </el-pagination>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import topSearchMod from '@/components/topSearch/index'
import { getApiPageList, alterUrlApi, getAllController } from '@/api/power-apiUrl'
export default {
    name: 'menuApiModify',
    components:{
        topSearchMod
    },
    data() {
        return { 
            title: 'menuApiModify',
            topSearchData: {
                controller: {
                    title: 'controller：',
                    type: 'select',
                    placeholder: '选择主类',
                    data: []
                }
            },
            toSearchData: {},
            pathData: {
                title:'',
                parId: '',
                childId: '',
                menuType: ''
            },
            stateType: '',
            pagTotal: 0,
            loading: false,
            ApiData: [],
            pageNow: {
                data: {},
                initApis: {}
            },
            subMit: {
                addArr: [],
                delArr: [],
                childUrlId: ''
            },
            pop: {
                
            }
        }
    },
    computed: {
        ...mapGetters([
            'menuApiRole', 'visitedViews'
        ])
    },
    created() {
        if (!this.menuApiRole) {
            this.$nextTick(() => {
                this.closePage('/power/menuApiManage')
            })
            return
        }
        this.loading = true;
        this.pageNow.data = Object.assign({}, this.menuApiRole);
        this.subMit.childUrlId = this.menuApiRole.id
        this.pathData = {
            title: this.$route.query.title, 
            parId: parseInt(this.$route.params.parId), 
            childId: parseInt(this.$route.params.childId),
            menuType: parseInt(this.$route.query.menutype)
        }
        this.$store.dispatch('GETApiState').then(data => {
            this.stateType = data;
            this.GETApiAllController(this.$route.query.menutype)
        })
    },
    mounted() {

    },
    methods:{
        submitUpdate() {
            this.$confirm('确认提交？', '提示', { type: 'warning' }).then(() => {
                alterUrlApi(this.subMit).then(res => {
                    if (res.data.errno <= 0) return this.$message.error(res.data.msg)
                    this.$message.success('操作成功！')
                    this.$store.dispatch('delCachedView', 'menuApiManage'); //关闭缓存
                    this.closePage('/power/menuApiManage?menuType=' + this.pathData.menuType)
                })
            }).catch()
        },
        checkArray(item) {
            let blo = false;
            this.pageNow.data.apis.forEach((api) => {
                if (api.id === item.id) {
                    blo = true
                    return blo
                }
            })
            return blo
        },
        doAdd(item, method) {
            if (method === 'add') return this.subMit.addArr.push(item.apikey)
            this.subMit.addArr.forEach((apikey, index) => {
                if (apikey === item.apikey) {
                    return this.subMit.addArr.splice(index, 1)
                }
            })
        },
        doDel(item, method) {
            if (method === 'add') return this.subMit.delArr.push(item.apikey)
            this.subMit.delArr.forEach((apikey, index) => {
                if (apikey === item.apikey) {
                    return this.subMit.delArr.splice(index, 1)
                }
            })
        },
        clickCheck(item, checked=false) {
            let init = this.checkArray(item)
            if (checked) {
                this.$set(this.pageNow.initApis, item.id, item)
                if (!init) this.doAdd(item, 'add') //如果不存在原api数组则添加
                this.doDel(item, 'del')
            } else {
                this.$delete(this.pageNow.initApis, item.id)
                if (init) this.doDel(item, 'add') //如果存在原api数组则删除
                this.doAdd(item, 'del')
            }
        },
        GETApiAllController(data) {
            getAllController({
                menuType: data
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
        getAddtime(addtime) {
            return addtime ? parseTime(addtime) : ''
        },
        getTypeVal(state) {
            let val = ''
            this.stateType.forEach((ele) => {
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
            opt.menuType = this.pathData.menuType;
            this.pagTotal = 0;
            this.getTotal(opt)
            this.getList(opt)
        },
        getList(obj, callback) {
            let opt = {
                "init": false, //true获取记录，false获取记录个数
                "pageNo": 0,
                "pageSize": 30
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
            let list = Object.assign([], data.list);
            list.forEach((opt) => {
                opt.list.forEach((item) => {
                    this.initCheck(item)
                })
            })
            this.ApiData = list
        },
        initCheck(opt) {
            this.pageNow.data.apis.forEach((api) => {
                this.$set(this.pageNow.initApis, api.id, api) 
                if (api.id === opt.id) {
                    opt.check = true
                }
                return 
            })
            for (let key in this.pageNow.initApis) {
                if (this.pageNow.initApis[key].id === opt.id) opt.check = true
            }
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
.collApseBody{
    position: relative;
    .aloneClick{
        position: absolute;
        top: 6px;right: 0;
    }
}
.power-pg .role-bar {
    font-size: 14px;
    p{
        font-size: 16px;
        font-weight: bold;
        margin-right: 40px;
    }
    div.roleList {
        margin-bottom: 20px; 
        .scroll-box{
            overflow-y: auto;
            max-height: 120px;
        }
    } 
    .power-list-i{width: 50%;margin: 5px 0} 
}
</style>




