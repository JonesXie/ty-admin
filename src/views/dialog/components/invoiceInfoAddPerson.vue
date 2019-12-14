<template>
    <div class="app-dialog">
        <el-button type="link" @click="invoiceInfoAddPerson=true" style="width:150px">添加开票信息-个人</el-button>

        <el-dialog title="添加开票信息-个人" :visible.sync="invoiceInfoAddPerson" width="530px" center>
            <div class="dialog-body invoice">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="136px" class="modify-form" inline-message='true'>
                <el-form-item label=" *发票信息名称：">
                   <el-input placeholder="发票信息1"></el-input>
                </el-form-item>                         
                <el-form-item label="开具类型：">
                   <el-radio-group v-model="ruleForm.invoiceUnit" class="ic-unit">
                    <el-radio label="个人"></el-radio>
                    <el-radio label="企业"></el-radio>                    
                    </el-radio-group>
                </el-form-item>              
                 <el-form-item label=" *发票抬头：">
                  <span class="form-text">个人</span>
                </el-form-item>  
             <el-form-item label=" *发票类型：">
                <el-tooltip placement="top-end" effect="light" class="invoice-radio">
                    <div slot="content">增值税普通发票开给小规模纳税人或者开票资料不齐全的购买人，<br>购买人取得后不可以进行进项税额抵扣。<br>若您还有疑问，建议联系贵司财务确认后再提交开票需求。</div>
                    <span class="form-text">增值税普通发票</span>
                </el-tooltip>
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
    .invoice {
        padding-top: 10px;
        padding-bottom: 20px;
        .el-form-item {
            margin-bottom: 5px;            
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
            margin-left: 86px;
        }       
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
                invoiceInfoAddPerson: false
            };
        }
    };
</script>