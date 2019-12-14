<template>
    <div class="app-dialog">
        <el-button type="link" @click="noteReturn=true" style="width:150px;">退货备注</el-button>

        <el-dialog title="退货备注" :visible.sync="noteReturn" width="570px" center>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label=" 我的退货信息：">
                    <div class="info-item">
                        <ul>
                            <li>退货时间：2018-02-30</li>
                            <li>退货原因：<br>
                                 <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请填写你的退货原因"
                    v-model="textarea">
                  </el-input>
                            </li>
                        </ul>
                    </div>                 
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
        .el-input,.el-textarea{
            width: 300px;
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
            noteReturn:false,
            textarea:""               
            };
        }
    };
</script>