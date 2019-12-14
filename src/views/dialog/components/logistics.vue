<template>
    <div class="app-dialog">
        <el-button type="link" @click="logistics=true" style="width:150px;">填写物流单号</el-button>

        <el-dialog title="填写物流单号" :visible.sync="logistics" width="465px" center>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label="*选择快递公司：">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>   
                <el-form-item label="*填写快递单号：">
                  <el-input placeholder="请输入快递单号"></el-input>
                </el-form-item>                                             
                <div class="tc" style="margin-top:50px;">
                     <el-button type="primary" class="submit-102w36" round >保存</el-button>                  
                </div>
                 </el-form>                 
            </div>
        </el-dialog>
      
    </div>

</template>


<style lang="scss" scoped>
$danger:#F73B42;
$primary:#4C8AFD;
.note{    
    padding-top:15px;
    padding-bottom: 20px;
    .form-text{
        line-height: 18px;
        padding: 8px 0;
        max-width: 200px;
    }
    .el-form-item{
        margin-bottom: 19px;
        .el-input,.el-textarea,.el-select{
            width: 235px;
        }        
    }
    .el-button+.el-button{
        margin-left:126px;
    }  
}

</style>

<script>
    export default {
        data() {           
            return {                               
                logistics:false,
                textarea:"",
                options: [
                    {
                    value: "圆通快递",
                    label: "0001"
                    },
                    {
                    value: "申通快递",
                    label: "0002"
                    },
                    {
                    value: "顺丰快递",
                    label: "0003"
                    }                   
                ]               
            };
        }
    };
</script>