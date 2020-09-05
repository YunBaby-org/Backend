<template>
    <div class="app-container">
        
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名稱</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{o}}
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名稱</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{o}}
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名稱</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{o}}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card{
    background: red;
    width: 80%;
  }

</style>