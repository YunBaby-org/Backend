<template>
    <div class="register-container">
        <el-form class="register-form">
            <div class="title-container">
                <h3 class="title">註冊帳號</h3>
            </div>
            <el-form-item label="信箱">
                <el-input v-model="RegisterForm.email"></el-input>
            </el-form-item>

            <el-form-item label="密碼">
                <el-input type="password" v-model="RegisterForm.password"></el-input>
            </el-form-item>

            <el-form-item label="手機">
                <el-input v-model="RegisterForm.phone"></el-input>
            </el-form-item>
            
            <el-button v-loading.fullscreen.lock="fullscreenLoading" style="width:100%; margin-top:20px;" @click="HandleRegister">註冊</el-button>
           
            
        </el-form>
    </div>
</template>




<script>
import {UserRegister} from '@/apis/user'
export default {
    data:function(){
        return {
            RegisterForm:{
                email:'',
                password:'',
                phone:''
            },
            fullscreenLoading:false
        }
    },
    methods:{
      HandleRegister:async function(){
        this.fullscreenLoading = true 
        let data = {
          "userid":"asd96148",
          "username":"邱品峰",
          "phone":this.RegisterForm.phone,
          "email":this.RegisterForm.email,
          "password":this.RegisterForm.password,
          "address":"三蝦"
        }
        
        await UserRegister(data).then(res=>{
          console.log('register response')
          console.log(res)
        }).catch(err=>{
          console.log('register error catch ')
          console.log(err.response)
        })
        this.fullscreenLoading = false
        console.log('register complete')
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
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
 
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1px;
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
.el-button{
    margin: 0 auto;
}
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 600px;
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