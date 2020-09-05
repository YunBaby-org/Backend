<template>
  <el-main class="content">
    <el-card class="card" shadow="hover">
        <keep-alive>
            <router-view />
        </keep-alive>
    </el-card>
</el-main>
</template>

<script>
export default{
  name:"Content",
  data:function(){
    return {

    }
  }
}
</script>
<style scoped>
.content {
  background-color: #E4E7ED;
}
.card {
    height: 100%;
    
    margin: 10px;
}
</style>
<style>

</style>
