<template>
  <div class="header">
    <div class="header-menu">
      <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" >
        <el-menu-item style="float:left">
          <i v-on:click="show" class="el-icon-arrow-left"></i>
        </el-menu-item>
        <el-menu-item >
          <el-dropdown >
            <span class="el-dropdown-link" style="color:white;">
              <img src="../../assets/yuntech.jpg" width="30px" height="30px" style="margin-right:10px"/>
              {{username}}    <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><i class="el-icon-user"></i> Edit Profile</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-back"></i> Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>

  </div>
</template>

<script>
export default{
  name:"Header",
  data:function(){
    return {
      foldAside:false,
      username:'default'
    }
  },
  methods: {
    show() {
      window.alert('show')
    }
  }
}
</script>
<style scoped>
.el-menu--horizontal>.el-menu-item{
  float:right;
}
.el-dropdown img{
  border-radius: 50%;
}
.el-menu{

}

</style>
<style>
.header {

    height: 50px;
    line-height: 50px;
}
.header-menu{
  height: 50px;
}
.header-title {
    height: 50px;
    width: 50px;

    font-size: 50px;

}


</style>
