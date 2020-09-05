<template>

  <el-aside :width="AsideLength">
      <el-menu  :collapse="isCollapsed" background-color="#545c64" text-color="#fff">
        <div class="header-logo">
          System
        </div>
        <el-submenu index="1">
          <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">Setting</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">option1</el-menu-item>
            <el-menu-item index="1-2">option2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- setting button  -->
        <!-- <el-menu-item index="1" v-on:click="$router.push({name:'Setting'})">
          <i class="el-icon-setting"></i>
          <span slot="title">Setting</span>
        </el-menu-item> -->

        <!-- map button  -->
        <el-menu-item index="2" v-on:click="$router.push({name:'Map'})">
          <i class="el-icon-map-location"></i>
          <span slot="title">Map</span>
        </el-menu-item>

        <!-- help button -->
        <el-menu-item index="3">
          <i class="el-icon-help"></i>
          <span slot="title">Help</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

</template>

<script>
export default{
  name:"Aside",
  data:function(){
    return {
      isCollapsed:false,
      AsideLength:'250px'
    }
  }
}
</script>
<style scoped>
.el-menu{
  background-color:#FFFFFF;
  height: 100%;
}
</style>
<style>
.header-logo {
  background-color: #17b3a3;
  text-align: center;
  height: 61px;
  line-height: 50px;

  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 0;
  cursor: pointer;
}
</style>
