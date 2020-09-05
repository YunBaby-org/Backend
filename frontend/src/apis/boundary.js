import request from '../utils/request'



export function GetBoundaryPosition(target_id){
    let api_url = '/api/v1/resources/users/boundary/'+target_id
    let config = {
        url:api_url,
        method:'GET'
    }

    return request(config)
}