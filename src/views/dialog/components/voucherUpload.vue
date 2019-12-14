<template>
    <div class="app-dialog">
        <el-button type="link" @click="voucherUpload=true" style="width:150px;">上传汇款凭证</el-button>
        <el-dialog title="上传汇款凭证" :visible.sync="voucherUpload" width="450px" center>
            <div class="dialog-body note">               
                 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="jn-form" inline-message='true'>
                <el-form-item label="上传凭证：">
                  <el-upload
                    class="voucher-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="voucher">
                    <i v-else class="el-icon-plus "></i>
                </el-upload>
                </el-form-item>   
                                                       
                <div class="tc" style="margin-top:50px;">
                     <el-button type="primary" class="submit-102w36" round >提交</el-button>                  
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
<style lang="scss">
 .voucher-uploader {
    .el-upload {
      width: 78px;
      height: 78px;
      line-height: 76px;
      border-radius: 3px;
      border: 1px solid #E2E5ED;
      background-color: #fff;
      i {        
        font-size:40px;
        color:#dedede;
      }
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 78px;
      height: 78px;
      border-radius: 3px;
      margin: 0 16px 16px 0;
    }
}
</style>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        voucherUpload: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>