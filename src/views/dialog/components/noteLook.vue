<template>
    <div class="app-dialog">
        <el-button type="link" @click="noteLook=true">查看备注</el-button>

        <el-dialog title="备注信息" :visible.sync="noteLook" width="485px" center>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="modify-form" inline-message='true'>
                <el-form-item label=" 录入人员：">
                  <div class="form-text">李二包</div>
                </el-form-item>   
                <el-form-item label=" 客户姓名：">
                  <div class="form-text">孙🐒</div>
                </el-form-item>
                <el-form-item label=" 手机号码：">
                  <div class="form-text">13658864861</div>
                </el-form-item>
                <el-form-item label="其他信息：">
                  <div class="form-text">李家村扛把子，话说跟李二狗蛋是兄弟两个，还认识李铁蛋</div>
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
        margin-bottom: 5px;
        .el-input,.el-cascader{
            width: 340px;
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
            noteLook:false                 
            };
        }
    };
</script>