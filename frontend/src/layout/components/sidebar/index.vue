<template>
    <div :class="{'has-logo':test}">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="active_index"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                :collapse="!sidebar.open"
                :unique-opened="false"
                mode="vertical"
            >
                <!-- 要放index 不然怪怪的 -->
                <sidebaritem v-for="(route,index) in routes" :key="route.path" :item="route" :base_path="route.path" :item_index="index+''"></sidebaritem>
            <!-- <el-menu-item index="1">
                <i class="el-icone-edit"></i>
                <span slot="title">asfasfasf</span>
            </el-menu-item>

            <el-menu-item index="2">
                <i class="el-icone-edit"></i>
                <span slot="title">asfasfasf</span>
            </el-menu-item> -->
            
            </el-menu>

        </el-scrollbar>
    </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import sidebaritem from '@/layout/components/sidebar/sidebaritem.vue'
export default {
    components:{
        sidebaritem 
    },
    data:function(){
        return {
            test:false,
            array:[1,2,3,4,5,6],
            test_close:false,
            active_index:'1'
        }
    },
    computed:{
        variables:function(){
            return variables
        },
        routes:function(){
            return this.$router.options.routes
        },
        testing:function(){
            return [1,2,3,4,5,6]
        },
        sidebar:function(){
            return this.$store.state.app.sidebar
        }
    },
    mounted(){
        
    }
}
</script>