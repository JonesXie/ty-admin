<template>
  <div class="login-container">
    <div class="log lineMid">
      <div class="logIcon"></div>
      <div>
        <h2>进销存管理系统—后台</h2>
        <p>Purchase sales inventory management system</p>
      </div>
    </div>
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <h3 class="title">用户登陆</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="personalCenter" />
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="icon-password"></svg-icon>
        </span>
        <el-input
          name="password"
          :type="pwdType"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="请输入密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="icon-eye" />
        </span>
      </el-form-item>
      <el-form-item prop="captcha" class="yzm">
        <div class="lineMid">
          <el-input
            type="text"
            v-model="loginForm.captcha"
            @blur="getVerify()"
            @keyup.enter.native="toLogin"
            placeholder="请输入手机验证码"
          ></el-input>
          <el-button
            type="info"
            v-loading="pCaptcha.loading"
            :disabled="loginForm.username === '' || loginForm.password === '' || pCaptcha.time > 0"
            @click="getCaptcha()"
          >{{pCaptcha.time ? `${pCaptcha.time}秒后可重新获取` : pCaptcha.txt}}</el-button>
        </div>
      </el-form-item>
      <div class="remember">
        <el-checkbox v-model="loginForm.rememberMe">记住登录状态</el-checkbox>
      </div>
      <el-form-item class="btnLog">
        <el-button
          type="primary"
          class="submit-320w42"
          round
          :loading="loading"
          @click.native.prevent="toLogin"
        >登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uPattern } from "@/utils/validate";
import { getStorage, setStorage } from "@/utils/auth";
import { captcha, verify } from "@/api/login";
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!uPattern(value)) {
        callback(new Error("请输入正确的用户名！"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: "",
        rememberMe: true
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password", // 控制密码显示
      encryptType: "", // 密码传输类型  md5 或 ''
      Token: "", // 返回的token
      ValidationId: "", // 返回的验证
      userId: "", // 返回的userId
      pCaptcha: {
        time: 0,
        txt: "获取验证码",
        loading: false
      }
    };
  },
  mounted() {
    const storage = getStorage().login;
    if (!storage || !storage.time) return;
    this.counDown(storage.time);
  },
  methods: {
    toLogin() {
      if (!this.Token) return this.$message.error("请通过获取验证码验证信息！");
      if (!this.ValidationId) return this.getVerify(this.toLogin);
      const opt = {
        data: {
          captcha: this.loginForm.captcha,
          validationId: this.ValidationId,
          rememberMe: this.loginForm.rememberMe
        },
        Token: this.Token,
        rememberMe: this.loginForm.rememberMe,
        user: {
          userId: this.userId,
          userName: this.loginForm.username
        }
      };
      this.loading = true;
      this.$store
        .dispatch("Login", opt)
        .then(res => {
          this.loading = false;
          this.$router.push({ path: "/" });
        })
        .catch(data => {
          this.loading = false;
          this.$message.error(data.msg);
        });
    },
    getVerify(callBack) {
      if (!this.loginForm.captcha || !this.Token) return;
      if (this.ValidationId) return;
      verify(this.loginForm.captcha, this.Token).then(res => {
        if (res.data.errno > 0) {
          this.ValidationId = res.data.msg;
          callBack ? callBack() : "";
        } else this.$message.error(res.data.msg);
      });
    },
    counDown(time) {
      let timestamp = Date.parse(new Date());
      timestamp = timestamp - time;
      if (timestamp > 60000) return;
      this.pCaptcha.time = 60 - timestamp / 1000;
      const down = setInterval(() => {
        this.pCaptcha.time--;
        if (this.pCaptcha.time <= 0) clearInterval(down);
      }, 1000);
    },
    getCaptcha() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.pCaptcha.loading = true;
          const keyStr = Math.random()
            .toString(36)
            .substr(5);
          const loginData = {
            encryptType: this.encryptType ? this.encryptType : "none",
            key: this.encryptType ? keyStr : "",
            password:
              this.encryptType === "md5"
                ? md5(this.loginForm.password + keyStr)
                : this.loginForm.password,
            userName: this.loginForm.username.trim(),
            rememberMe: this.loginForm.rememberMe
          };
          captcha(loginData)
            .then(res => {
              this.pCaptcha.loading = false;
              const data = res.data;
              if (data.errno > 0) {
                const timestamp = Date.parse(new Date());
                const storage = getStorage();
                storage.login = {
                  time: timestamp
                };
                setStorage(storage);
                this.counDown(timestamp);
                this.Token = data.msg;
                this.userId = data.data;
              } else this.$message.error(data.msg);
            })
            .catch(data => {
              this.pCaptcha.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #b7d5f0;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 42px;
    width: 82%;
    input {
      background: transparent;
      border: 0px;
      font-size: 14px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 6px 5px 6px 0;
      height: 42px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #dedede;
    border-radius: 5px;
    color: #999999;
    margin-bottom: 26px;
    &.btnLog {
      border: none;
      margin-top: 40px;
    }
  }
  div.yzm {
    border: none;
    .el-input {
      width: 170px;
      padding: 0 15px;
      border: 1px solid #dedede;
      border-radius: 5px;
    }
    button {
      position: relative;
      background: #56b987;
      color: #fff;
      border-color: #56b987;
      top: 1px;
      width: 140px;
      height: 42px;
      line-height: 42px;
      margin-left: 10px;
      padding: 0;
      &:hover {
        background: #49af7c;
      }
      &[disabled] {
        color: #fff;
        background-color: #c8c9cc;
        border-color: #c8c9cc;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  min-height: 900px;
  background: url("~@/assets/login/bg-jpg.png");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  .log {
    position: absolute;
    top: 59px;
    left: 52px;
    line-height: 1;
    color: #fff;
    .logIcon {
      width: 47px;
      height: 56px;
      background: url("~@/assets/login/icon_logo.png");
      margin-right: 12px;
    }
    h2 {
      font-size: 32px;
      font-weight: bold;
      margin: 6px 0;
    }
    p {
      font-size: 15px;
    }
  }
  .login-form {
    // position: absolute;
    // top: 0;
    // right: 0;
    width: 500px;
    min-height: 580px;
    padding: 77px 85px 85px 95px;
    margin: 200px auto 0;
    // margin: 160px 250px 0 0;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 5px 24px rgba(41, 93, 188, 0.3);
  }
  .svg-container {
    padding: 0 5px 0 12px;
    color: #636c89;
    vertical-align: middle;
    width: 46px;
    height: 42px;
    line-height: 1;
    font-size: 0;
    display: inline-block;
    line-height: 42px;
    .svg-icon {
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
  }
  .title {
    font-size: 20px;
    color: #333;
    margin: 0 0 50px;
    text-align: left;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
