<template>
    <div class="back-wrap logist-page">
        <freight-template-add v-if="addTools" @returnData="temChose" :updata="updata"></freight-template-add>
        <div v-else>
            <el-tabs v-model="activeName" @tab-click="1">
                <el-tab-pane label="运费模板设置" name="templateSet">
                    <temExpress @temChose="temChose" @toUpdata="updata=$event"></temExpress>
                </el-tab-pane>
                <!-- 物流信息跟踪- - -  - -->
                <!-- <el-tab-pane label="物流信息跟踪" name="logisitic">
                    <infoExpress></infoExpress>
                </el-tab-pane>         -->
            </el-tabs>
        </div>
    </div>
</template>
<script>
import freightTemplateAdd from './components/freightTemplateAdd.vue'
import temExpress from './components/temExpress.vue'
import infoExpress from './components/infoExpress.vue'
import { parseTime } from '@/utils'
export default {
    name: 'logisticTools',
    components:{
        freightTemplateAdd, temExpress, infoExpress
    },
    data() {
        return {  
            updata: '',               
            addTools: 0,
            activeName: 'templateSet'
        };
    },
    methods: {
        temChose(val) {
            this.addTools = val
        }
    }
};
</script>
<style lang="scss">
.logist-page{
    .topLine{
        margin-left: 80px;
        padding-bottom: 22px;
    }
    .back-wrap .el-tabs__item{
        padding:0 30px;
    }
    .logist-search-bar{
        padding:15px 30px 30px;
        border-bottom: 1px solid #e5e5e5;
    }
    .mtb30{margin:20px 0 30px 30px;}
    .el-form--inline .el-form-item{
        margin-bottom: 0;
        margin-left: 30px;
        &:first-child{
            margin-left: 0;
        }
    }
    .el-form-item__label{
        color: #333;
    }
    .logist-result{
        border-top: 1px solid #e2e5ed;
        
    }
    .logistic-w{
        width:375px;
    }
    .temp-body{
        padding: 20px 30px;
        border-top:1px solid #e5e5e5;
        border-bottom: 1px solid #e2e5ed;
        &.bd-none{
            border:none;
        }
        .temp-title{
            font-weight: bold;
            font-size: 14px;
            color: #333;
            padding-bottom: 20px;
        }
        .el-form{
            padding-left: 20px;            
            .el-radio{
                width:120px;
            }
            .sub-form{
                .el-form-item{
                    padding-left: 20px; 
                }
                .el-form-item__label{
                    color:#666;
                    &:before{
                        display:inline-block;
                        margin-right: 4px;
                        width:3px;
                        height:3px;
                        background-color:#666;
                        border-radius: 50%;
                        content: "";
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .freight-extral{
        padding:20px 50px;
    }
    .bt-button{      
        padding:20px 50px;
        .el-button+.el-button{
            margin-left:15px;
        }
    }
     /* 运费模板 */
    .freight-form{
      max-width: 1000px;
      margin: 10px 0;
    .col-01{ min-width: 190px;}
    .col-03,  .col-04{ width: 150px;}
    .col-05{ width: 150px;}
    .col-06{width: 200px }
    td{
      border:1px solid #e7e7e7;
      text-align: center;
      .mod-input{
            display: inline-block;
            width: 100px;
            height: 32px;
            line-height: 32px;    
            margin:0 10px;     
            border: 1px solid #dcdcdc; 
            padding:0 5px;  
        }
    }
    .tr-title{
      &>td{
        height: 54px;
        line-height: 52px;
        background-color: #CCD9F1; 
        font-size: 14x;
        color: #333;
        
        &.tl{
            text-align: left;
            padding-left: 30px;
        } 
        &>title{
            label{
                color: #666;
            }
        }
        .el-button{
            &:hover{
                text-decoration: underline;
            }
        }    
      }

    }
    .tr-th{
      &>td{
        color: #333;
        font-weight: bold;
        background-color: #f1f1f1;
        height: 52px;
        line-height: 20px;
        padding:15px 10px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
    .tr-td{
      &>td{
        font-size: 12px;  
        color: #636c89;     
        line-height: 20px;
        padding:15px 10px;
        &.t-addr{
            a{
                white-space: nowrap;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
      }
    }
  }
}
</style>
