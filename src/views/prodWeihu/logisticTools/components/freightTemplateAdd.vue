<template>
    <div class="add-template">
        <div class="temp-body">
            <div class="temp-title">
                新增运费模板
            </div>
            <el-form v-loading="loading">
                <el-form-item label="模板名称：">
                    <el-input placeholder="请输入模板名称" v-model="subMitData.modelname" style="width:300px"></el-input>
                </el-form-item>
                <div class="sub-form">
                    <el-form-item label="是否包邮：">
                        <el-radio-group v-model="subMitData.isbaoyou">
                        <el-radio :label="0">自定义运费</el-radio>
                        <el-radio :label="1">卖家包邮</el-radio>                    
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运送方式：">
                        <el-radio-group v-model="subMitData.sendway">
                            <el-radio label="快递"></el-radio>
                            <el-radio label="EMS"></el-radio>                    
                            <el-radio label="平邮"></el-radio>                    
                        </el-radio-group>
                    </el-form-item>      
                    <el-form-item label="计价方式：" v-if="!subMitData.isbaoyou">
                        <el-radio-group v-model="subMitData.getpriceway">
                        <el-radio :label="0">按件数</el-radio>
                        <el-radio :label="1">按重量</el-radio>                    
                        </el-radio-group>
                    </el-form-item>
                    <table class="freight-form" style="margin-left:90px;" v-if="!subMitData.isbaoyou">
                        <colgroup>
                            <col class="col-01">
                            <col class="col-02">
                            <col class="col-03">                   
                            <col class="col-04">
                            <col class="col-05">
                            <col class="col-06">
                        </colgroup>               
                        <template >
                            <tbody>
                                <tr class="tr-title">
                                    <td colspan="5" class="tl">
                                        默认运费
                                        <input type="text" class="mod-input" v-model="subMitData.mincount" v-if="!subMitData.getpriceway">
                                        <input type="text" class="mod-input" v-model="subMitData.minkg" v-else>
                                        <span>{{ subMitData.getpriceway ? 'kg' : '件'}}内</span>
                                    
                                        <input type="text" class="mod-input" v-model="subMitData.minmoney">
                                        <span>元，每增加</span>
                                    
                                        <input type="text" class="mod-input" v-model="subMitData.xcount" v-if="!subMitData.getpriceway">
                                        <input type="text" class="mod-input" v-model="subMitData.xkg" v-else>
                                        <span>{{ subMitData.getpriceway ? 'kg' : '件'}}，运费增加</span>
                                    
                                        <input type="text" class="mod-input" v-model="subMitData.addMoney">
                                        <span>元</span>
                                    </td>                                       
                                </tr>
                                <tr class="tr-th">
                                    <td class="">运送地</td>
                                    <td>首件{{ subMitData.getpriceway ? '（kg）' : '数（件）'}}</td>
                                    <td>首件费用（元）</td>                  
                                    <td>续件{{ subMitData.getpriceway ? '（kg）' : '数（件）'}}</td>
                                    <td>续费（元）</td>
                                </tr>
                                <tr class=" tr-td" >
                                    <td class="t-addr">
                                        <span>{{subMitData.spedestination}}</span>
                                        <a @click="toPopSee('popSelectArea', {
                                            type: 'spec',
                                            initData: subMitData.speregionlist
                                        })" class="blue edit-area-btn">编辑地区</a>
                                    </td>
                                    <td>
                                        <input type="text" class="mod-input" v-model="subMitData.spemincount" v-if="!subMitData.getpriceway">
                                        <input type="text" class="mod-input" v-model="subMitData.speminkg" v-else>
                                    </td>     
                                    <td> <input type="text" class="mod-input" v-model="subMitData.speminmoney"></td>
                                    <td>
                                        <input type="text" class="mod-input" v-model="subMitData.spexcount" v-if="!subMitData.getpriceway">
                                        <input type="text" class="mod-input" v-model="subMitData.spexkg" v-else>
                                    </td>
                                    <td> <input type="text" class="mod-input" v-model="subMitData.speaddmoney"></td> 
                                </tr>         
                            </tbody>                   
                        </template>
                    </table>          
                </div>
            </el-form>
        </div>
        <div class="freight-extral" v-if="!subMitData.isbaoyou">
            <el-checkbox-group v-model="specBao">
                <el-checkbox >指定地区包邮</el-checkbox>
            </el-checkbox-group>
            <table class="freight-form" style="width:100%" v-if="specBao">
                <colgroup>
                    <col class="col-01">
                    <col class="col-02">
                    <col class="col-03">                                       
                </colgroup>               
                <template >
                    <tbody>
                        <tr class="tr-th">
                            <td class="">地区</td>                          
                        </tr>
                        <tr class=" tr-td" >
                            <td class="t-addr">
                                <span>{{subMitData.destination}}</span>
                                <a class="blue edit-area-btn"  @click="toPopSee('popSelectArea', {
                                    type: 'baoyou',
                                    initData: subMitData.regionlist
                                })">编辑地区</a>
                            </td>
                        </tr>                 
                    </tbody>                   
                </template>
            </table> 
        </div>
        <div class="bt-button">
            <el-button v-if="btnType" type="success" class="submit-120w36" round @click="toUpdateExpressModels">修改并返回</el-button>
            <el-button v-else type="success" class="submit-120w36" round @click="toExpressModesAdd">保存并返回</el-button>
            <el-button type="info" round @click="goTemp">取消</el-button>
        </div>
    <!-- 选择地区弹窗 -->
        <popSelectArea :pop="pop.popSelectArea" @closePop="closePop('popSelectArea')" @returnData="setRegion"></popSelectArea>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { expressModesAdd, updateExpressModels } from '@/api/setting'
import popSelectArea from '@/components/popSelectArea'
export default {
    components: {
        popSelectArea
    },
    props: {
        updata: {
            default: ""
        }
    },
    watch: {
        updata: {
            handler(val) {
                if (val) {
                    this.subMitData = val;
                    this.btnType = true;
                }
                if (!this.subMitData.isbaoyou && this.subMitData.destination) {
                    this.specBao = true
                }
            },
            immediate: true
        }
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    },
    data() {
        return {
            btnType: false, //修改or添加
            specBao: false, //是否制定地区包邮
            subMitData: {
                "modelname": "", //名称
                "isbaoyou": 1, //是否包邮，1包邮，0 是不包邮
                "getpriceway": 0, //计价方式，0，按件数，1按重量
                "minmoney": '', //多少钱
                "mincount": '', //最少几个包邮，空值就不包邮
                "addMoney": 0, //每增加一件续件增加多少钱
                "minkg": '', //首件多重
                "sendway": "快递", //运送方式
                "speaddmoney": '', //特殊增加钱
                "spemincount": '', //特殊最小数量
                "speminkg": '', //特殊最少kg
                "speminmoney": '', //特殊首件钱
                "spexcount": '', //特殊续建
                "spexkg": '', //特殊续kG
                "xcount": '', //续件
                "xkg": '', //续kg
                "destination": "", //目的地,目的地集合
                "regionlist": "", //regionList包邮地集合
                'speregionlist': '', //特殊region集合
                'spedestination': '', //特殊目的地集合
                "userid": "" //登录userid
            },
            pop: {
                popSelectArea: {
                    show: false,
                    data: ''
                }
            },
            loading: false
        }
    },
    methods: {
        checkSpecBao() {
            if (this.specBao) return
            else {
                this.subMitData.destination = ''
                this.subMitData.regionlist = ''
            }
        },
        toUpdateExpressModels() {
            this.loading = true;
            this.subMitData.userid = this.user.userId
            this.checkSpecBao()
            updateExpressModels(this.subMitData).then(res => {
                this.loading = false;
                if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                this.$message.success('操作成功！')
                this.goTemp()
                this.initData()
            }).catch(() => { this.loading = false; })
        },
        toExpressModesAdd() {
            this.loading = true;
            this.subMitData.userid = this.user.userId
            this.checkSpecBao()
            expressModesAdd(this.subMitData).then(res => {
                this.loading = false;
                if (res.data.flag <= 0) return this.$message.error(res.data.msgInFo)
                this.$message.success('操作成功！')
                this.goTemp()
                this.initData()
            }).catch(() => { this.loading = false; })
        },
        setRegion(data) {
            if (data.type === 'baoyou') {
                this.subMitData.destination = data.nation
                this.subMitData.regionlist = data.region
            } else {
                this.subMitData.spedestination = data.nation
                this.subMitData.speregionlist = data.region
            }
        },
        goTemp() {
            this.$emit('returnData', 0)
        },
        toSelectArea(name, data) {
            this.pop[name].show = true
        },
        toPopSee(name, data) {
            this.pop[name].show = true;
            this.pop[name].data = data;
        },
        closePop(name) {
            this.pop[name].show = false;
            this.pop[name].data = '';
        },
        initData() {
            this.subMitData = {
                "modelname": "", //名称
                "isbaoyou": 0, //是否包邮，1包邮，0 是不包邮
                "getpriceway": 0, //计价方式，0，按件数，1按重量
                "minmoney": 0, //多少钱
                "mincount": '', //最少几个包邮，空值就不包邮
                "addMoney": '', //每增加一件续件增加多少钱
                "minkg": '', //首件多重
                "sendway": "快递", //运送方式
                "speaddmoney": '', //特殊增加钱
                "spemincount": '', //特殊最小数量
                "speminkg": '', //特殊最少kg
                "speminmoney": '', //特殊首件钱
                "spexcount": '', //特殊续建
                "spexkg": '', //特殊续kG
                "xcount": '', //续件
                "xkg": '', //续kg
                "destination": "", //目的地,目的地集合
                "regionlist": "", //regionList包邮地集合
                'speregionlist': '', //特殊region集合
                'spedestination': '', //特殊目的地集合
                "userid": "" //登录userid
            }
        }
    }
}
</script>
