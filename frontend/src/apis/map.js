import request from '../utils/request'

export function RoadApi(roads){
    //roads === [{lat:23,lng:23},...]
    let api_key = process.env.VUE_APP_ROAD_API
    
    let data = null 
    for(let i = 0;i<roads.length;i++){
        data = data + roads[i]['lat']+','+roads[i]['lng']
        if(!(i==this.roads.length-1))
            data+='|' 
    }
    let api_url = 'https://roads.googleapis.com/v1/snapToRoads?path='+data+'&interpolate=true&key='+api_key
    let config = {
        url:api_url,
        method:'GET'
    }

    return request(config)
}

export function GetAllMarkers(){
    let api_url = '/user/locations'
    let config = {
        url:api_url,
        method:'GET'
    }

    return request(config)
}