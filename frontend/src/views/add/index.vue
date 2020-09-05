<template>
    <div class="app-container">
        <el-card shadow="hover" id="tracker_add">
            <div slot="header" style="text-align:center;">
                <h1>新增追蹤目標</h1>
            </div>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標信箱</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.email" placeholder="enter tracker's email"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" justify="center" type="flex" style="align-items: center;display: flex;">
                <el-col :xs="10" :sm="6" :md="6" :lg="4" :xl="2">目標密碼</el-col>
                <el-col :xs="14" :sm="6" :md="9" :lg="9" :xl="9">
                    <el-input v-model="target_form.password" placeholder="enter tracker's email"></el-input>
                </el-col>
            </el-row>
            <el-button @click="AddTracker" style="margin:0 auto;display:block; width:100px;" type="primary" plain>新增</el-button>        

        </el-card>
        <!-- 
            lg = 一般大型螢幕
            md = 中型螢幕
            sm = 小型設備
            xs = 超小型設備
         -->
        <el-card shadow="hover" id="tracker_table">
            <div slot="header" style="text-align:center;">
                <h1>追蹤清單</h1>
            </div>
            <el-button @click="UpdateTrackers" type="primary" icon="el-icon-refresh" circle style="margin-bottom:15px;"></el-button>
            <el-table
                style="width:100%"
                :data="trackersInfo"
                height="250"
                border>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>

                <el-table-column
                    prop="phone"
                    label="手機號碼">
                </el-table-column>

                <el-table-column
                    prop="email"
                    label="信箱">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                <template slot-scope="scope"> 
                    <el-button @click="EditBoundary(scope.$index, scope.row)" size="mini">圍籬</el-button>
                    <el-button @click="DeleteTracker(scope.$index, scope.row)" type="danger" size="mini" >刪除</el-button>
                </template>
                
                </el-table-column>
            </el-table>      

        </el-card>
        <el-dialog title="設置電子圍籬" :visible.sync="dialog_boundary" width="85%" @close="DialogClose">
            <h2>目標: {{temp_marker_userinfo.username}} 目標id: {{temp_marker_userinfo.userid}}</h2>
            <el-input-number v-model="temp_marker_radius" placeholder="請輸入電子圍籬半徑" style="margin-bottom:5px; width:100%;"></el-input-number>
            <el-button type="primary" @click="AddTracker" style="margin-bottom:5px; width:100%;">更新</el-button>
        
            <GmapMap
                ref="map"
                @click="ClickEvent"
                :zoom="15"
                :center="map_default_center"
                style="width: 100%; height:700px">

                <div v-if="marker_clicked">
                    <GmapMarker
                        :position="temp_marker_position">
                    </GmapMarker>
                    <GmapCircle
                        :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
                        :center="temp_marker_position"
                        :radius="temp_marker_radius">
                    </GmapCircle>
                </div>

            </GmapMap>
        </el-dialog>
    </div>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
import {UpdateAllTrackers,AddTracker} from '@/apis/tracker.js'
export default {
    data:function(){
        return {
            target_form:{
                "email":null,
                "password":null
            },        
            map_default_center:{
                lat:23.696413,
                lng:120.532343
            },
            dialog_boundary:false,
            dialog_delete:false,
            marker_clicked:false,
            temp_marker_position:null, //選擇boundary所在位置的那個marker
            temp_marker_radius:0, //選擇boundary的半徑   
            temp_marker_userinfo:{}
        }
    },
    computed:{
        google:gmapApi,
        trackersInfo:function(){
            /*  return all trackers information from vuex   */
            console.log(this.$store.getters.trackersInfo)
            console.log(Object.values(this.$store.getters.trackersInfo))
            return Object.values(this.$store.getters.trackersInfo)
        }
    },
    methods:{
        DialogClose:function(){
            //close dialog 
            //reset some attribute  
            this.marker_clicked = false 
            this.temp_marker_position = null 
            this.temp_marker_radius = 0
            this.temp_marker_userinfo = {}
        },
        ClickEvent:function(event){
            console.log(this.google)
            this.$refs.map.$mapPromise.then((map)=>{
                let click_position = {
                    lat:event.latLng.lat(),
                    lng:event.latLng.lng()
                }
                /*  會移動到所點的位置   */
                map.panTo(click_position)
                this.marker_clicked = true 
                this.temp_marker_position = click_position
            })
        },

        /*  tracker's function   */
        AddTracker:async function(){
            //put data to the server 
            AddTracker(this.target_form)
        },
        DeleteTracker(index, row) {
            console.log(index, row)
            this.dialog_delete = true
        },
        UpdateTrackers:function(){
            console.log('update trackers')
            //GetAllTrackers again 
            UpdateAllTrackers(this.$store)
        },

        /*  boundary function   */
        EditBoundary(index, row) {
            console.log(index, row)
            console.log(row)
            this.dialog_boundary = true 
            this.temp_marker_userinfo = {
                userid:row.userid,
                username:row.name,
                phone:row.phone,
                email:row.email
            }
        }
    }
    
}
</script>
<style>
  #tracker_table{
    font-family: Microsoft YaHei;
    color: #2c3e50;
    margin-top: 25px;
  }
  #tracker_add{
    font-family: Microsoft YaHei;
    color: #2c3e50;
  }
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>