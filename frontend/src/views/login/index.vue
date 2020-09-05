<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="LoginInfo" :rules="LoginRules" class="login-form"  label-width="80px" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    使用者登入
                </h3>
            </div>

            <!-- email -->
            <el-form-item  prop="email">
                <span class="svg-container">
                    <i class="el-icon-user"></i>
                </span>

                <el-input v-model="LoginInfo.email" placeholder="請輸入您的信箱"></el-input>
            </el-form-item>

            <!-- password -->
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="el-icon-lock"></i>
                </span>
                <el-input type="password" v-model="LoginInfo.password" placeholder="請輸入您的密碼"></el-input>
            </el-form-item>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="post" style="width:100%; margin-top:20px;">登入</el-button>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="post2" style="width:100%; margin-top:20px;">登入</el-button>
            <div class="tips" style="width:100%;text-align:center; margin-top:30px;">
                <router-link to="register">註冊帳號</router-link>
            </div>
        </el-form>
    </div>
</template>


<script>

import {UserLogin} from '@/apis/user'

export default {
  data:function(){
    const ValidEmail = (rule,value,callback)=>{
      callback()
    }
    const ValidPassword = (rule,value,callback)=>{
      if(value.length<6){
        callback(new Error('密碼長度必須大於6個字元'))
      }
      else{
        callback()
      }
    }
    return {
      LoginInfo:{
        email:"",
        password:""
      },
      LoginRules:{
        email:[{validator:ValidEmail}],
        password:[{validator:ValidPassword}]
      },
      fullscreenLoading:false
    }
  },
  methods:{
    HandleLogin:async function(){
      this.fullscreenLoading = true
      let data = {
        "email":this.LoginInfo.email,
        "password":this.LoginInfo.password
      }
      await UserLogin(data).then(res=>{
        console.log('this is response')
        console.log(res)
        console.log(res.status)
          
      }).catch(err=>{
        console.log('this catch ')
        console.log(err.response)
      })
    
      this.fullscreenLoading = false

    }
  }
}
</script>

<style lang="scss">


$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  
  }
  .el-form-item__content{
    margin-left:0px !important;
    
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>