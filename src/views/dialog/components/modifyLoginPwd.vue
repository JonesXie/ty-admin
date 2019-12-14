<template>
    <div class="app-container">
         <el-button type="text" @click="modifyPwd1=true">修改登录密码1</el-button>
         <el-button type="text" @click="modifyPwd2=true">修改登录密码2</el-button>
         <el-button type="text" @click="modifyPwd3=true">修改登录密码3</el-button>
         <!-- 第一步 -->
        <el-dialog title="修改登录密码" :visible.sync="modifyPwd1" width="580px" center>
           <div class="dialog-body">
            <el-steps :space="200" :active="1" finish-status="success" align-center >
                <el-step title="验证身份"></el-step>
                <el-step title="修改登录密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
               <el-form ref="form" :model="form" label-width="130px" class="modify-form">
                   <el-form-item label="已验证手机" >
                   <div class="form-text">138****2569</div>
                  </el-form-item>
                  <el-form-item label="填写手机验证码" 
                  :rules="[
                            { required: true, message: '请输入手机验证码', trigger: 'blur' },
                            { type: 'text', message: '请输入正确的手机验证码', trigger: ['blur', 'change'] }
                            ]">
                  <el-input ></el-input>
                  <el-button type='info' plain class="yzhm-btn">获取验证码</el-button>
                  </el-form-item>
                  <el-form-item label="验证码" 
                  :rules="[
                            { required: true, message: '请输入手机验证码', trigger: 'blur' },
                            { type: 'text', message: '请输入正确的手机验证码', trigger: ['blur', 'change'] }
                            ]">
                  <el-input ></el-input> <router-link tag="a" to="####" type="primary" class="change-btn">           
                      <img src="" alt="看不清，换一张">
                  </router-link>
                 
                  </el-form-item>
                  <el-form-item class="mt80 ml50" >
                    <el-button type="primary" class="submit-120w36" round >提交</el-button>                  
                 </el-form-item>
               </el-form>
           </div>
        </el-dialog>
         <!-- 第二步 -->
        <el-dialog title="修改登录密码" :visible.sync="modifyPwd2" width="580px" center>
           <div class="dialog-body">
            <el-steps :space="200" :active="2" finish-status="success" align-center >
                <el-step title="验证身份"></el-step>
                <el-step title="修改登录密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
               <el-form ref="form" :model="form" label-width="130px" class="modify-form">
                   
                  <el-form-item label="新密码" 
                  :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' }]">
                        <el-input ></el-input>                       
                  </el-form-item>
                  <el-form-item label="再次输入新密码" 
                  :rules="[
                            { required: true, message: '两次密码不一致', trigger: 'blur'}]">
                  <el-input ></el-input>
                 
                  </el-form-item>
                   <el-form-item label="验证码" 
                  :rules="[
                            { required: true, message: '请输入手机验证码', trigger: 'blur' },
                            { type: 'text', message: '请输入正确的手机验证码', trigger: ['blur', 'change'] }
                            ]">
                  <el-input ></el-input> <router-link tag="a" to="####" type="primary" class="change-btn">           
                      <img src="" alt="看不清，换一张">
                  </router-link>
                 
                  </el-form-item>
                  <el-form-item class="mt80 ml50" >
                    <el-button type="primary" class="submit-120w36" round >提交</el-button>                   
                 </el-form-item>
               </el-form>
           </div>
        </el-dialog>
         <!-- 第三步 -->
        <el-dialog title="修改登录密码" :visible.sync="modifyPwd3" width="580px" center>
           <div class="dialog-body">
            <el-steps :space="200" :active="3" finish-status="success" align-center >
                <el-step title="验证身份"></el-step>
                <el-step title="修改登录密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
               <div class="form-result tc">
                   <i class="result-icon success"><svg-icon icon-class="icon-complete" ></svg-icon>
                   </i>
                   <div class="result-txt">
                       <h3>恭喜您，密码修改成功</h3>
                       <p>您的账户安全等级：<span class="primary-color">较高</span></p>
                   </div>
                   <el-button type="primary" round class="submit-120w36"> 完成</el-button>
               </div>
           </div>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
$success:#56B987;
$primary:#4C8AFD;
.el-steps{
    margin-top:15px;
}
.modify-form{
    margin:40px 0;
    .el-input{
        margin-right:20px;
    }
    .yzhm-btn{
        width:120px;
        height:34px;
        line-height:32px;
        color:#999;
        font-size:12px;
    }
    .form-text{
        color:#999;
    }
    .change-btn{
        display:inline-block;
        height:34px;
        line-height:34px;     
        vertical-align: middle;
    }
}
.mt80{
    margin-top:80px;
}
.ml50{
    margin-left: 50px;
}
.form-result{
    text-align:center;
    color: #333;    
    padding-bottom: 50px;
    i.result-icon{
        display: inline-block;
        font-size: 54px;
        margin: 55px 0 25px;
        &.success{
            color: $success;
        }
    }
    .result-txt{
        margin-bottom: 70px;
        line-height: 1;
        h3{
            font-size: 14px;
        }
        p{
            font-size: 14px;
            margin-top: 18px;
            .primary-color{
                color: $primary;
            }
        }
    }
}
.dialog-body .el-form-item .el-input, .dialog-body .el-form-item .el-input__inner{
    width: 220px;
}
</style>


<script>
export default {
  
  data() {
    return {
      modifyPwd1: false,
      modifyPwd2: false,
      modifyPwd3: false
    };
  },
  methods: {}
};
</script>
