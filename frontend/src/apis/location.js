import request from '../utils/request'
const base_url = process.env.VUE_APP_BASE_URL

export function GetLocation(id){
    let config = {
        url:base_url+'/location/'+id,
        method:'GET',
       
    }
    return request(config)
}