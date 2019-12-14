<template>
    <div class="app-dialog">
        <el-dialog title="开票信息详情" :visible.sync="popShow" width="700px" center @close="closePop()">
            <div class="dialog-body invoice">
                <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="modify-form" inline-message>
                    <el-form-item label="发票信息名称：">
                        <div class="form-text">{{ruleForm.nickname}}</div>
                    </el-form-item>
                    <el-form-item label="开具类型：">
                        <template v-if="ruleForm.userType == 1">
                            <div class="form-text">个人</div>
                        </template>
                        <template v-if="ruleForm.userType == 2">
                            <div class="form-text">企业</div>
                        </template>
                    </el-form-item>
                    <el-form-item label="发票抬头：">
                        <div class="form-text">{{ruleForm.head}}</div>
                    </el-form-item>
                    <el-form-item label="发票类型：">
                        <template v-if="ruleForm.userType == 1">
                            <div class="form-text">增值税普通发票</div>
                        </template>
                        <template v-if="ruleForm.userType == 2">
                            <div class="form-text" v-if="ruleForm.taxType == 1">企业增值税普通发票</div>
                            <div class="form-text" v-if="ruleForm.taxType == 2">增值税专用发票</div>
                            <div class="form-text" v-if="ruleForm.taxType == 3">组织增值税普通发票</div>
                        </template>
                    </el-form-item>
                    
                    <template v-if="ruleForm.userType == 2">
                        <el-form-item label="企业信息代码：" v-if="ruleForm.companycode != ''">
                            <div class="form-text">{{ruleForm.companycode}}</div>
                        </el-form-item>
                        <el-form-item label="开户银行：" v-if="ruleForm.bankname != ''">
                            <div class="form-text">{{ruleForm.bankname}}</div>
                        </el-form-item>
                        <el-form-item label="开户账户:" v-if="ruleForm.bankcardnumber != ''">
                            <div class="form-text">{{ruleForm.bankcardnumber}}</div>
                        </el-form-item>
                        <el-form-item label="公司注册电话：" v-if="ruleForm.tel != ''">
                            <div class="form-text">{{ruleForm.tel}}</div>
                        </el-form-item>
                        <el-form-item label="营业执照地址：" v-if="ruleForm.hallcardaddress != ''">
                            <div class="form-text">{{ruleForm.hallcardaddress}}</div>
                        </el-form-item>
                        <el-form-item label="邮箱地址：" v-if="ruleForm.email != ''">
                            <div class="form-text">{{ruleForm.email}}</div>
                        </el-form-item>
                       
                    </template>
                     <div class="tc">
                            <el-button type="primary" class="submit-102w36" round @click="closePop()">开票</el-button>
                            <el-button type="danger" class="submit-102w36" round @click="closePop()">拒绝开票</el-button>
                        </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                /* 表单绑定数据 */
                ruleForm: {
                    userType: 2,
                    taxType: 2,
                    nickname: "",
                    head: "",
                    companycode: "",
                    bankname: "",
                    bankcardnumber: "",
                    tel: "",
                    hallcardaddress: "",
                    email: "",
                    userid: ""
                },
                popShow: false
            };
        },
        props: {
            detail:"",
            pop: {
                type: Object,
                default:() => { return {} }
            }
        },
        watch: {
            detail:{
                handler(value) {
                    this.invoiceInfo = value.show;
                    this.ruleForm = Object.assign({}, value.data);
                    return;
                },
                deep: true
            },
            pop:{
            handler(value) {
                this.popShow = value.show;
                if (!value.show) return;                
            },
            deep: true
        }
        },
        methods: {       
            closePop() {            
                this.$emit('closePop');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .invoice{
        padding-top:10px;
        padding-bottom: 20px;
        .el-form-item{
            .el-input,.el-cascader{
                width: 300px;
            }
        }
        .el-button+.el-button{
            margin-left: 96px;
        }
        .protrans-item{
            >li{
                margin-bottom: 15px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
            .pro-attr{
                padding-right:15px;
                label+label{
                    padding-left: 15px;
                }
            }
        }
        .h-mid{
            height: 0;
            border-bottom: 1px dashed #9e9e9e;
            margin: 10px 0;
        }
    }
    .mt80{
        margin-top:80px;
    }
</style>