<template>
  <el-container>
<!--    头部-->
    <el-header>

        <div>
        <h4 style="margin-left: 20px;cursor: pointer" @click="$router.push('/home')" >重庆汇亮科技</h4>
        </div>
      <div> <el-dropdown style="margin-right: 20px">
        <el-button type="text">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown></div>
    </el-header>
    <el-container style="height: 100%">
<!--      侧边栏-->
      <el-aside :width="isCollapse?'65px':'200px'" style="background-color: #545c64" >
        <div  style="text-align: center;background-color: #545c64;cursor: pointer;" @click="isCollapse=!isCollapse"><span style="cursor: pointer" ><i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i></span></div>
          <el-menu router :default-active="defaultActive" :unique-opened="true" :collapse-transition="false" background-color="#545c64" text-color="#fff" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
              <el-menu-item index="user"> <i class="el-icon-menu"></i><span slot="title">用户列表</span></el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span slot="title">部门管理</span>
            </template>
          <el-menu-item index="department">
            <i class="el-icon-menu"></i>
            <span slot="title">部门列表</span>
          </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-set-up"></i>
              <span slot="title">设备管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">导航3-1</span>
            </el-menu-item>
          </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span slot="title">报表查询</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                <span slot="title">导航4-1</span>
              </el-menu-item>
            </el-submenu>




        </el-menu>
      </el-aside>
<!--      主题区域-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>




export default {
  name: "Home",

  data() {
    return {
      defaultActive:'',
      isCollapse: false,
      username: ''
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.defaultActive = key
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  created() {
    this.username= window.sessionStorage.getItem("username")
  }

}
</script>

<style scoped>
.el-container{
  height: 100%;
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  background-color: #666666;
}
.el-main{
  height: 100%;
}


.el-button{
  margin-top: 10px;
}
.el-menu{
  border-right: 0;
}
/*.el-menu{*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
</style>
