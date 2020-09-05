import axios from 'axios'

axios.defaults.withCredentials = true;

/*
    create axios instance 
*/

/* declare const */
const axios_instance = axios.create({
    //baseURL:process.env.VUE_APP_BASE_URL,
    timeout:5000
})

/*
    set request interceptors 
    送到http request前會先來這邊
    可以再這邊做一些加上token的動作
*/

axios_instance.interceptors.request.use((config)=>{
    // do something before request is sent
    return config 
},(error)=>{
    console.log("ERRROR in request interceptors")
    return Promise.reject(error)
})

/*
    set response interceptores 
    收到http response後會先來這邊，再到使用者那邊
*/
axios_instance.interceptors.response.use((response)=>{
    return response
},(error)=>{
    //return error
    return Promise.reject(error)
})

export default axios_instance