<template>
<div class="login-container">
  <audio src=""></audio>
  <video style="width: 100%" class="bgVideo" autoplay="" loop="" muted="" src="../assets/1022_ce287a58d8c94d339da053631ca9d6ea.f0.mp4"><source src="" type="video/mp4"></video>

  <div class="login-box">
    <div class="avatar-my">
      <img src="../assets/title.jpg" class="title-my">
    </div>
    <div class="login-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
      <el-form-item  prop="username">
        <el-input prefix-icon="el-icon-user" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input prefix-icon="fa-lock" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <div class="btn-my">
      <el-form-item>
        <el-button type="primary" @keydown.enter.native="submitForm('ruleForm')" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      </div>
    </el-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Login",

  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.ruleForm.username !== '') {
          // this.$refs.ruleForm.validateField('username');
        }
        callback();
      }
    };

    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.password !== '') {
      //
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get("/login",{params:{username:this.ruleForm.username,password:this.ruleForm.password}})
          .then((res)=>{
            if(res.data.code != 200){
              this.$message.error('登录失败，请检查用户名密码');
            }else {
              window.sessionStorage.setItem("token", res.data.data)
              window.sessionStorage.setItem("username", this.ruleForm.username)
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$router.push('/home')
            }
          }).catch(err=>{
            console.log(err)})
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped en="less">
.login-container{
height: 100%;
  margin: 0;

}

.btn-my{
  display: flex;
  justify-content: flex-end;


}

.login-box{
  background-color: #EBEEF5;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  height:300px;
  border-radius: 3%;
  box-shadow: 10px 10px 10px #82848a;
  transform: translate(-50%,-50%);
}
.login-form{

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

}
.bgVideo{
  position: fixed;
  z-index: -100;
}
.title-my{
  width: 30%;
  border-radius:50%;
  border: 1px solid #E4E7ED;
  box-shadow: 10px 10px 5px #82848a;
}
.avatar-my{
  display: flex;
  justify-content: center;
  margin-top: -8%;

}
.el-form{
  width: 100%;
  margin: 60px 80px;

}
</style>
