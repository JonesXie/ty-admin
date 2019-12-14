<template>
    <div class="power-pg">
        <div class="section role-bar lineMid">
            <topSearchMod :searchData="topSearchData" :toSec="false" :toClear="false"  @change="toSearch"></topSearchMod>   
        </div>
        <!-- 接口管理 -->
        <div class="section api-section" v-loading="loading">
            <div v-for="(mod, index) in apiItem" :key="'api_mod'+index">
                <h2 class="api-title">{{mod.nameinfo}}</h2>
                <el-collapse>
                    <div v-if="mod.childUrl.length === 0" class="tc">暂无菜单</div>
                    <div class="colTitle" v-else v-for="(item, index) in mod.childUrl" :key="'api_item'+index">
                        <el-collapse-item>
                            <template slot="title">  
                                <div class="clearfix">                      
                                    <span class="api-type" >
                                        {{item.nameinfo}}
                                    </span>
                                    <p style="display:inline-block;font-size: 14px;margin-left:12px;color:#999">{{item.url}}</p>
                                </div>             
                            </template>
                            <div class="api-info tl">
                                <div v-if="item.apis.length === 0" class="tc">
                                    暂无绑定接口
                                </div>                       
                                <span v-else class="power-list-i" v-for="(api, index) in item.apis" :key="'api_span'+index" >                            
                                    <i class=" green"><svg-icon icon-class="icon-sure"></svg-icon></i> {{api.description}}
                                </span> 
                            </div>
                        </el-collapse-item>  
                        <span class="colTitleAbo">
                            <a @click="toUpdataRole(mod, item)" class="blue">修改</a>
                        </span>  
                    </div>
                </el-collapse>         
            </div>
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
import topSearchMod from '@/components/topSearch/index'
import { getAllUrlApiPageList } from '@/api/power-apiUrl'
export default { 
    name: 'menuApiManage',
    components: {
        topSearchMod
    },
    data() {
        return { 
            loading:false,
            pagTotal: 0,
            topSearchData: {
                menutype: {
                    title: '项目选择：',
                    type: 'select',
                    placeholder: '选择接口状态',
                    data: []
                }
            },
            toSearchData: {},
            apiItem:[]
        }
    },
    mounted() {
        this.$store.dispatch('GETMenuType').then((data) => {
            this.topSearchData.menutype.data = data
            let menuType = this.$route.query.menuType
            if (menuType) {
              menuType = parseInt(menuType)
              this.topSearchData.menutype.defalut = menuType
              this.toSearchData.menutype = menuType
            } else {
              this.topSearchData.menutype.defalut = data[0].value
              this.toSearchData.menutype = data[0].value
            }
            this.toSearch()
        })
    },
    methods:{
        toUpdataRole(mod, item) {
            this.$store.dispatch('SetMenuApiRole', item)
            this.$router.push(`/power/menuApiModify/${mod.id}/${item.id}?menutype=${this.toSearchData.menutype}&title=${item.nameinfo}`)
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
                "pageSize": 10,
                menutype: 0
            }
            opt = Object.assign(opt, obj);
            this.loading = true;
            getAllUrlApiPageList(opt).then((res) => {
                this.loading = false;
                if (callback) callback(res.data)
                else this.applyList(res.data)
            }).catch(() => {
                this.loading = false;
            })
        },
        applyList(data) {
            this.apiItem = []
            this.apiItem = data.list
        }
    } 
};
</script>
<style lang="scss" scoped>
@import "../power.scss";
.power-pg {
    .colTitle{
        position: relative;
        .colTitleAbo{
            position: absolute;
            right: 0;
            top: 5px;
            line-height:35px;
            display: block;
            width: 60px;
            text-align: center;
        }
    }
    .api-section {
        .api-type {
            width: auto;
            min-width: 90px;
        }
    }
    .power-list-i{
        width: auto;
    } 
} 
 .api-section{
    .api-title{
        font-size: 16px;               
    }
 }
</style>


