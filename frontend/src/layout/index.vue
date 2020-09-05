<template>
    
    <!-- 我們需要bind這個class 如果sidebar縮起來，就要換class -->
    <div :class="ResizeSidebar" class="app-wrapper">
        <div v-if="device==='mobile'&&sidebar.open" class="drawer-bg" @click="handleClickOutside" />
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <div :class="{'fixed-header':fixedheader}">
                <navbar></navbar>
            </div>
            <MainContent></MainContent>
        </div>
    </div>
</template>


<script>

import sidebar from './components/sidebar/index.vue'
import navbar from './components/navbar'
import MainContent from './components/MainContent'
import ResizeMixin from './mixin/resizehandle'
import {UpdateAllTrackers} from '@/apis/tracker.js'
export default {
  name:"layout",
  mixins:[ResizeMixin],
  data:function(){
    return {
      show:false
    }
  },
  components:{
    sidebar,
    navbar,
    MainContent
  },
  computed:{
    device:function(){
      return this.$store.state.app.device
    },
    sidebar:function(){
      return this.$store.state.app.sidebar
    },
    fixedheader:function(){
      return true 
    },
    ResizeSidebar:function(){
      return{
        hideSidebar: !this.sidebar.open,//如果這個為true，class就會後綴一個hidesidebar，就可以達到隱藏sidebar的功能
        openSidebar: this.sidebar.open,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods:{
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  created(){
    /*
      在這邊先request所有tracker的資訊
      並將這些資訊儲存進vuex 
      之後切換到 map,add....這些view的時候,就可以直接從vuex取得資料
    */
    UpdateAllTrackers(this.$store)

  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>