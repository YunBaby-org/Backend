<template>
    <div class="navbar">
        <hamburger :isActive="sidebar.open" class="hamburger-container" @toggleClick="toggleSideBar" />
        
        <!-- 右邊的使用者照片 -->
        <div class="right-menu">
          <el-dropdown class="avatar-container" trigger="click">
            <!-- avatar專門放使用者資訊的地方 -->
            <div class="avatar-wrapper">
              <!-- <img :src="userinfo.userimg" style="width:35px; height:35px"> -->
              <el-avatar :src="userinfo.userimg"></el-avatar>
              <i class="el-icon-arrow-down"></i>
            </div>
          
            <!-- el-dropdown menu 則是click後出現的下滑選項 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>test1</el-dropdown-item>
              <el-dropdown-item>test2</el-dropdown-item>
              <el-dropdown-item>test3</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>

</template>

<script>
import hamburger from '@/components/hamburger/index.vue'

export default {
    components:{
        hamburger,
    },
    methods:{
        toggleSideBar:function(){
            this.$store.dispatch('app/toggleSideBar')
            
        }
    },
    computed:{
      sidebar:function(){
        return this.$store.getters.sidebar
      },
      userinfo:function(){
        return this.$store.getters.userinfo //has token, username ,userimg 
      }
    },

}
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;

  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>