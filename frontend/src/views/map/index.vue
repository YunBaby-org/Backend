<template>
  <div class="app-container" style="height:100%" >
    <div class="color-mark">
      
      <el-row>
        <el-col>
          <div style="width:15px; height:15px; background-color: #FF6666;display: inline-block;" ></div>
          Geo-fence
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div style="width:15px; height:15px; background-color: #B266FF;display: inline-block;" ></div>
          User-position
        </el-col>
      </el-row>
    </div>
    <el-select placeholder="目標" v-model="select_value" @change="SelectChange" style="width:100%; margin-bottom:10px;">
      <el-option
        v-for="(m,index) in tracker_list"
        :label="m"
        :value="m"
        :key="index">
      </el-option>
    </el-select>
    <el-button style="width:100%; margin-bottom:10px;" @click="StartTracking">開啟追蹤</el-button>

    <GmapMap
      ref="map"
      :center="MapCenter"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height:700px"
      :options="{mapTypeControl:false}">
      <div v-if="marker_loading">
        <gmap-custom-marker 
          :marker="CurrentMarker.current_position" 
          alignment="center" 
          @click.native="MarkerEvent"
          :class="bounce_animation" >
          <el-avatar :size="50">123</el-avatar>
        </gmap-custom-marker>  

        <GmapInfoWindow
          :opened="info_window"
          @closeclick="InfoWindowClose"
          :position="CurrentMarker.current_position">
          lat: {{target.lat}} lng: {{target.lng}}
        </GmapInfoWindow>
  
        <GmapCircle
          :options="{fillColor:'#0000ff',fillOpacity:0.4,strokeColor:'#0000ff',strokeOpacity:0.4}"
          :center="CurrentMarker.current_position"
          :radius="CurrentMarker.radius">
        </GmapCircle>

        <!-- test fake data -->
        <GmapMarker
          :position='target'>
        </GmapMarker>

        <GmapCircle 
          :options="{fillColor:'#ff0000',fillOpacity:0.4,strokeColor:'#ff0000',strokeOpacity:0.4}"
          :center="current_boundary"
          :radius="boundary_radius">
        </GmapCircle>
        <GmapPolyline 
            :path="roads"
            v-bind:options="{ 
              strokeColor:'#00ff00',
              strokeWeight:8,
              strokeOpacity:0.8,
              icons:[{
                icon:{
                  path:google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  fillColor: '#22bf15',
                  strokeColor: '#22bf15',
                  scale:4,
                  fillOpacity:1
                  },
                  
                }]
              }">
        </GmapPolyline>
      </div>

    </GmapMap>
  </div>
</template>
  



<script>
  import GmapCustomMarker from 'vue2-gmap-custom-marker';
  import {gmapApi} from 'vue2-google-maps'
  import {GetAllMarkers} from '@/apis/map.js'
  import {GetBoundaryPosition} from '@/apis/boundary.js'
  import {CreateStompClient} from '@/utils/stompclient.js'
  export default {
    components:{
      'gmap-custom-marker': GmapCustomMarker
    },
    computed:{
      google:gmapApi,
      CurrentMarker:function(){
        return this.markers[this.select_value]
      },
      MapCenter:function(){
        if (!this.marker_loading)
          return this.map_default_center 
        return this.current_boundary
      },
      /* get trakcer list */
      tracker_list:function(){
        return this.$store.getters.trackerList
      },
      /*  get current tracker */ 
      tracker:function(){
        return this.$store.getters.trackersInfo[this.select_value] 
      }
    },
    data() {
      return {
        map_default_center:{
          lat:23.696413,
          lng:120.532343
        },
        info_window:false,
        select_value:'請選擇目標',
        target:{
          lat:0,
          lng:0
        },
        current_boundary:{
          lat:0,
          lng:0
        },
        stomp_client:null,
        boundary_radius:0,
        markers:null,
        marker_loading:false,
        roads:[],
        bounce_animation:'animate__animated animate__bounce animate__infinite	infinite',
        pulse_animation:'animate__animated animate__pulse animate__infinite	infinite',
      }
    },
    methods:{

      /*  marker click event  */
      MarkerEvent:function(){
        this.info_window = true
      },

      /*  select event  */
      SelectChange:function(){
        this.marker_loading = true
        console.log('selection change')
        /*
          Todo: 
          selection被選到特定的trakcer時
          向後端請求該trakcer的電子圍籬資訊
        */
        GetBoundaryPosition(this.select_value).then(res=>{
          this.current_boundary = {lat:parseFloat(res.data.boundary.lat),lng:parseFloat(res.data.boundary.lng)}
          this.boundary_radius = res.data.boundary.radius
        })
      },

      /*  marker infowindow close event */
      InfoWindowClose:function(){
        this.info_window = false
      },
      /*  tracking target */
      StartTracking:function(){
        console.log(this.stomp_client)
        this.stomp_client.subscribe('/queue/test123',(msg)=>{
          console.log(typeof(JSON.parse(msg.body)))
          this.target.lat = JSON.parse(msg.body).lat 
          this.target.lng = JSON.parse(msg.body).lng
          this.roads.push({lat:this.target.lat,lng:this.target.lng})
     
        })

      }

    },
    created(){
      /* just need tracker's boundary position */
      GetAllMarkers().then(res=>{ 
        this.markers = res.data.markers 
      }).catch(err=>{
        console.log(err)
      })
      this.stomp_client = CreateStompClient()
    }
  }
</script>
<style scoped>
  .mymap{
    width: 85%;
    height: 700px;
  }
  .color-mark{
    width: 30%;
    margin-bottom: 15px;
    
  }
</style>