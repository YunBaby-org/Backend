<template>

    <!-- 在router.js裡面，我們為一些route加上了hidden的屬性，我們在處理sidebar有什麼功能時，hidden為true的就過濾掉 -->
    <!-- 並且在index.vue裡面透過props，把路由的資訊(item,base_path)給傳過來 -->

    <div v-if="!item.hidden">
        <el-menu-item :index="item_index" @click="push">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
    </div>
</template>


<script>
export default {
    props:{
        item:{
            type:Object,
            required:true
        },
        base_path:{
            type:String
        },
        item_index:{
            required:true
        }
    },
    methods:{
        push:function(){
            this.$router.push(this.item.path+'/index')
            if(this.$store.state.app.device==='mobile'){
                this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    }
}
</script>