<template>
    <div class="app-dialog">
        <!-- <el-button type="link" @click="invoiceInfoAdd=true">添加开票信息</el-button> -->

        <el-dialog title="添加开票信息" :visible.sync="addShow" width="700px" center :before-close="closePop">
            <div class="dialog-body invoice">               
                 <el-form :model="ruleForm"  ref="ruleForm" label-width="136px" class="modify-form" inline-message>
                <el-form-item label=" 开票信息名称：">
                   <el-input></el-input>
                </el-form-item>                         
                <el-form-item label="开具类型：">
                   <el-radio-group v-model="ruleForm.invoiceUnit" @change="unitChange" class="ic-unit">
                    <el-radio label="个人" ></el-radio>
                    <el-radio label="企业"></el-radio>                    
                    </el-radio-group>
                </el-form-item> 
                <template v-if="unit">             
                    <el-form-item label=" 发票抬头：">
                    <el-input></el-input>
                    </el-form-item>  
                    <el-form-item label=" 发票类型：">
                    <el-radio-group v-model="ruleForm.invoiceType" @change="typeChange" class="ic-type">             
                            <el-tooltip placement="top" effect="light"  class="invoice-radio">
                                <div slot="content">增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，<br/>购买人取得后不可以进行进项税额抵扣。<br>若您还有疑问，建议联系贵司财务确认后再提交开票需求。</div>
                                <el-radio label="企业增值税普通发票"></el-radio><i class="el-icon-info"></i>
                            </el-tooltip>
                            <el-tooltip placement="top" effect="light"  class="invoice-radio">
                                <div slot="content">增值税专用发票开给一般纳税人，申请时需要提供公司名称、<br>税号、地址电话、开户行名称及账号，一般纳税人批复，<br>购买人取得后可以进行进项税额抵扣。若您还有疑问，<br>建议联系贵司财务确认后再提交开票需求。</div>
                                <el-radio label="增值税专用发票" ></el-radio><i class="el-icon-info"></i>
                            </el-tooltip>
                        <el-tooltip placement="top" effect="light"  class="invoice-radio">
                                <div slot="content">其他组织（如政府、公共事业、非盈利机构等），无税号。</div>
                                <el-radio label="组织增值税普通发票"></el-radio> <i class="el-icon-info"></i>
                            </el-tooltip>
                        </el-radio-group>
                    </el-form-item>  
                    <el-form-item label=" 企业信用代码：">
                    <el-input></el-input>
                                       
                    <div class="input-note" v-if="type==1">企业：包括公司、非公司制企业法人、企业分支机构、个人独资企业、合伙企业和其他企业。如果您属于以上"企业"，税号只能是15、17、18、20位数字或字母和数字的组合，请您准确填写。</div>
                    <div class="input-note" v-else-if="type==2">请与贵公司财务人员核实并填写准确的税务登记证号，以免影响您发票后续的使用</div>
                    <div class="input-note" v-else-if="type==3">组织：其他组织（如政府、公共事业、非盈利机构等），无税号，可以不用填写。请核实所属企业是否有税号，否则会影响发票的使用</div>
                    </el-form-item>  
                    <el-form-item label=" 开户银行：">
                    <el-input></el-input>
                    </el-form-item>  
                    <el-form-item label=" 开户账户：">
                    <el-input></el-input>
                    </el-form-item> 
                    <el-form-item label=" 公司注册电话：">
                    <el-input></el-input>
                    </el-form-item>  
                    <el-form-item label=" 营业执照地址：">
                    <el-input></el-input>
                    </el-form-item>   
                    <el-form-item label=" 邮箱地址：">
                    <el-input></el-input>
                    </el-form-item>   
                </template>
                <template v-else>
                     <el-form-item label=" *发票抬头：">
                    <span class="form-text">个人</span>
                    </el-form-item>  
                    <el-form-item label=" *发票类型：">
                        <el-tooltip placement="top-end" effect="light" class="invoice-radio">
                            <div slot="content">增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，<br>购买人取得后不可以进行进项税额抵扣。<br>若您还有疑问，建议联系贵司财务确认后再提交开票需求。</div>
                            <span class="form-text">增值税普通发票</span>
                        </el-tooltip>
                    </el-form-item>             
                </template>
<div class="tc" style="margin-top:35px;">
    <el-button type="primary" class="submit-102w36" round @click="closePop">保存</el-button>
    <el-button type="danger" class="submit-102w36" round @click="closePop">取消</el-button>
</div>
</el-form>
</div>
</el-dialog>
</div>

</template>

<style lang="scss" scoped>
    .invoice {
        padding-top: 10px;
        padding-bottom: 20px;
        .el-form-item {
            .el-input,
            .el-cascader {
                width: 300px;
            }
            .input-note {
                line-height: 18px;
                font-size: 12px;
                color: #666;
                padding-top: 10px;
                width: 406px;
            }
            .ic-type {
                .invoice-radio {
                    margin-right: 10px;
                }
                .el-icon-info {
                    color: #FF5353;
                    font-size: 12px;
                    padding-left: 4px;
                }
                .el-radio {
                    &+.el-radio {
                        margin-left: 15px;
                    }
                }
            }
            .ic-unit {
                .el-radio {
                    &+.el-radio {
                        margin-left: 35px;
                    }
                }
            }
        }
        .el-button+.el-button {
            margin-left: 96px;
        }
        .protrans-item {
            >li {
                margin-bottom: 15px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .pro-attr {
                padding-right: 15px;
                label+label {
                    padding-left: 15px;
                }
            }
        }
    }

    .mt80 {
        margin-top: 80px;
    }
</style>

<script>
    export default {
        data() {
            return {
                /* 表单绑定数据 */
                ruleForm: {
                    invoiceUnit: "个人",
                    invoiceType: '企业增值税普通发票'
                },
                addShow: this.addInvoice,
                unit: false,
                type:1
            };
        },
        props: ["addInvoice"],
        watch: {
            addInvoice(val) {
                this.addShow = val;
            }
        },
        methods: {
            closePop() {
                //this.addShow = false;
                this.$emit('test')
            },           
            unitChange(val) {
                if (val === "企业") {
                    this.unit = true;
                } else this.unit = false;
            },
            typeChange(val) {
                if (val === "企业增值税普通发票") {                                     
                    this.type = 1;                     
                } else if (val === "增值税专用发票") {
                    this.type = 2;                   
                } else {
                    this.type = 3
                }
            }
        }
    };
</script>