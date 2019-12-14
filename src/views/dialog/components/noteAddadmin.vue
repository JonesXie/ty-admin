<template>
    <div class="app-dialog">
        <el-button type="link" @click="noteAddadmin=true" style="width:150px;">录入备注-管理员</el-button>

        <el-dialog title="录入备注-管理员" :visible.sync="noteAddadmin" width="570px" center>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label=" 录入人员：">
                  <el-input placeholder="请输入录入人姓名"></el-input>
                </el-form-item>   
                <el-form-item label=" 客户姓名：">
                  <el-input placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item label=" 手机号码：">
                  <el-input placeholder="请输入客户手机号"></el-input>
                </el-form-item>
                <el-form-item label="其他信息：">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="您还可备注其他客户相关信息，方便客户回、访或者日后查看"
                    v-model="textarea">
                  </el-input>
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
            noteAddadmin:false,
            textarea:""               
            };
        }
    };
</script>