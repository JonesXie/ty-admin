<template>
    <div class="app-dialog">
        <el-button type="link" @click="invoiceInfo=true">开票信息</el-button>

        <el-dialog title="开票信息" :visible.sync="invoiceInfo" width="700px" center>
            <div class="dialog-body invoice">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="modify-form" inline-message='true'>
                <el-form-item label=" 开票金额：">
                   <el-input value="10000000"></el-input>
                </el-form-item>   
                 <el-form-item label=" 发票编号：">
                   <el-input value=" 61641614116"></el-input>
                </el-form-item>  
                <el-form-item label=" 快递公司：">
                   <el-input value="顺丰快递"></el-input>
                </el-form-item>
                <el-form-item label="快递单号：">
                   <el-input value=" 365961641614116"></el-input>
                </el-form-item>
                <div class="h-mid"></div>
                <el-form-item label="发票种类：">
                   <el-radio-group v-model="ruleForm.invoiceKind" class="w14">
                    <el-radio label="纸质发票"></el-radio>
                    <el-radio label="电子发票"></el-radio>                    
                    </el-radio-group>
                </el-form-item> 
                <el-form-item label=" 发票类型：">
                   <el-radio-group v-model="ruleForm.invoiceType" class="ic-type">                       
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
                 <el-form-item label=" 发票信息名称：">
                   <el-input value="合肥酷聊餐饮费用"></el-input>
                </el-form-item>  
                 <el-form-item label=" 发票抬头：">
                   <el-input value="合肥酷聊智能科技公司"></el-input>
                </el-form-item>    
                <el-form-item label=" 企业信用代码:">
                   <el-input value=" QER1616161131"></el-input>
                </el-form-item>               
                 <el-form-item label=" 开户银行：">
                   <el-input value="中国工商银行"></el-input>
                </el-form-item>  
                 <el-form-item label=" 开户账户：">
                   <el-input value=" 62346245821556115"></el-input>
                </el-form-item> 
                 <el-form-item label=" 公司注册电话：">
                   <el-input value="14946161644"></el-input>
                </el-form-item>  
                 <el-form-item label=" 营业执照地址：">
                   <el-input value="安徽省合肥市蜀山区南七"></el-input>
                </el-form-item>   
                 <el-form-item label=" 邮箱：">
                   <el-input value="kuliao@139.com"></el-input>
                </el-form-item>  
                <div class="tc" style="margin-top:35px;">
                     <el-button type="primary" class="submit-102w36" round >保存</el-button>   
                     <el-button type="danger" class="submit-102w36" round >取消</el-button>   
                </div>
                 </el-form>                 
            </div>
        </el-dialog>       
    </div>

</template>

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

<script>
    export default {
        data() {
            return {             
                /* 表单绑定数据 */
                ruleForm: {
                    invoiceKind: '纸质发票',                                       
                    invoiceType: '增值税专用发票'
                },
             invoiceInfo:false               
            };
        }
    };
</script>