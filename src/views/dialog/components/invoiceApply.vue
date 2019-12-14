<template>
    <div class="app-dialog">
        <el-button type="link" @click="invoiceApply=true">申请开票</el-button>

        <el-dialog title="申请开票" :visible.sync="invoiceApply" width="1000px" center>
            <div class="dialog-body invoice">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label=" 发票信息：">
                   <el-select v-model="invoiceInfo" placeholder="请选择开票信息" style="width:120px;">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>   
                       
                <el-form-item label="发票类型：">
                   <el-radio-group v-model="ruleForm.invoiceType">
                    <el-radio label="纸质发票"></el-radio>
                    <el-radio label="电子发票"></el-radio>                    
                    </el-radio-group>
                </el-form-item>
                 <el-form-item label="邮寄地址：">
                    <ul class="addr-list fix">
                         <li class="addr-cur">
                            <div class="toolbar"><span class="link">修改</span>
                            <span class="link">删除</span>
                            </div>
                            <p class="name">李大力</p>
                            <p class="addr">安徽省 合肥市 蜀山区 稻香村街道 望江西路与肥西路交叉口西湖国际广场C座22楼</p>
                            <p class="tel">136****5456</p>
                            <span class="check">
                                <i class="el-icon-check"></i>
                            </span>
                        </li>
                        <li v-for="i in 5" :key="i">
                            <div class="toolbar"><span class="link">修改</span>
                            <span class="link">删除</span>
                            </div>
                            <p class="name">李大力</p>
                            <p class="addr">安徽省 合肥市 蜀山区 稻香村街道 望江西路与肥西路交叉口西湖国际广场C座22楼</p>
                            <p class="tel">136****5456</p>
                        </li>
                    </ul>
                    <el-button icon="el-icon-plus" class="add-button" type="primary" plain>使用新地址</el-button>
                </el-form-item>  
                 <el-form-item label="选择支付方式：" style="margin-top:37px;">
                    <div class=" pay-list">                
                       <el-radio v-model="radio1" label="1" border class="pay-sel">
                            <i class="imgBox">
                                <img src="@/assets/stock_img/pay/pay_klqianbao.png" alt="酷聊钱包">    
                            </i>   
                        </el-radio> 
                        <el-radio v-model="radio1" label="2" border class="pay-sel">
                            <i class="imgBox">
                                <img src="@/assets/stock_img/pay/pay_zhifubao.png" alt="支付宝">   
                            </i>   
                        </el-radio> 
                        <el-radio v-model="radio1" label="3" border class="pay-sel">
                            <i class="imgBox">
                                <img src="@/assets/stock_img/pay/pay_weixin.png" alt="微信钱包">   
                            </i>   
                        </el-radio> 
                        <el-radio v-model="radio1" label="4" border class="pay-sel">
                            <i class="imgBox">
                               在线支付   
                            </i>   
                        </el-radio>                    
                    </div>
                </el-form-item> 
                <el-form-item label="开票费用：">
                   <b class="red">￥20.0</b>
                </el-form-item>
                <div class="tc" style="margin-top:50px;">
                     <el-button type="primary" class="submit-102w36" round >提交</el-button>   
                     <el-button type="danger" class="submit-102w36" round >取消</el-button>   
                </div>
                 </el-form>                 
            </div>
        </el-dialog>
      
    </div>

</template>


<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.red{
    color: $danger;
}
 .addr-list {
    li {
      float: left;
      margin: 0 14px 14px 0;
      width: 240px;
      height: 105px;
      border: 1px dashed #DEDEDE;
      padding: 12px 15px;
      position: relative;
      color: #666;
      font-size: 12px;
      line-height: 1;
      &.addr-cur {
        border: 2px dashed $danger;
        span.check {
          position: absolute;
          right: 0;
          bottom: 0;
          &::after {
            position: absolute;
            bottom: -2px;
            right: -2px;
            display: inline-block;
            font-size: 0;
            content: "";
            border-top: 24px solid transparent;
            border-left: 24px solid transparent;
            border-right: 24px solid $danger;
            z-index: 9;
          }
          &>i {
            position: relative;
            color: #fff;
            font-size: 14px;
            font-weight: 900;
            top: 2px;
            text-align: center;
            z-index: 10;
          }
        }
      }
      .name {
        font-size: 14px;
        font-weight: bold;
      }
      .tel {
        font-weight: 600;
      }
      .addr {
        line-height: 18px;
        padding: 10px 0;
        display: -webkit-box; 
        -webkit-line-clamp: 2; 
        overflow: hidden; 
        height: 56px;                                                  
      }
      .toolbar {
        position: absolute;
        right: 8px;
        top: 8px;
        .link {
          padding: 7px;
          color: $primary;
          &:hover {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }
  .add-button {
    width: 100px;
    font-size: 12px;
  }
.invoice{    
    padding-top:15px;
    padding-bottom: 20px;
     .pay-list {
         padding-left: 30px;     
      .is-bordered{
                position: relative;   
                width: 128px;
                height: 44px;
                line-height: 42px;
                padding: 0; 
                text-align: center;            
            }      
    .el-radio__label{
        .imgBox{
            width: 80%;
            height: auto;
            display: inline-block;
        }
    }
  }
    .el-form-item{
        .el-input,.el-cascader{
            width: 340px;
        }
        b{
            font-weight: bold;
        }
    }
    .el-button+.el-button{
        margin-left:126px;
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
}
.mt80{
    margin-top:80px;
}

</style>

<script>
    export default {
        data() {
            return {
                options:[
                    {
                        label: "发票一",
                        value: "发票一"
                    }, {
                        label: "发票二",
                        value: "发票二"
                    },
                     {
                        label: "发票三",
                        value: "发票三"
                    }
                ],      
                /* 表单绑定数据 */
                ruleForm: {
                    invoiceType: '纸质发票',
                    address: '',
                    input:[11, 22, 33]
                },
            invoiceApply:false,
            invoiceInfo:"",
            radio1: "1"           
            };
        }
    };
</script>