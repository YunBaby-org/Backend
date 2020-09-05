import request from '../utils/request'

//const base_url = process.env.VUE_APP_BASE_URL
export function GetAllTrackers(){
    let api_url = '/api/v2/resources/users/trackers'
    let config = {
        url:api_url,
        method:'GET'
    }
    return request(config)
}

export function UpdateAllTrackers(store){
    GetAllTrackers().then(res=>{
        store.dispatch("trackers/UpdateTrackers",res.data['trackers'])
        store.dispatch("trackers/UpdateTrackerList",Object.keys(res.data['trackers']))
    }).catch(err=>{
        console.log('-------Get all trackers Error-------')
        console.log(err)
    })
}
export function AddTracker(data){
    let api_url = '/api/v1/resources/users/addtracker'
    let config = {
        url:api_url,
        method:'POST',
        data
    }
    
    return request(config)
}
export function UpdateBoundary(){
    let api_url = '/api/v1/resources/users/boundary'
    let config = {
        url:api_url,
        method:'PUT'
    }
    return request(config)
}
