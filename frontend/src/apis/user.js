import request from '../utils/request'

//const base_url = process.env.VUE_APP_BASE_URL
export function UserLogin(data){
    let config = {
        url:'/auth/login',
        method:'POST',
        data
    }
    //axios instance看到這個config裡面的method，就會自動發出POST

    return request(config)

}
export function UserRegister(data){
    let config = {
        url:'/auth/register',
        method:'POST',
        data
    }

    return request(config)
}

export function GetUserInfo(){
    let config = {
        url:'/api/v1/resources/users/information',
        method:'GET'
    }

    return request(config)
}
