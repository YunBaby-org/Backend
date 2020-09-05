import Cookies from 'js-cookie'

const tokenkey = 'token'

export function getToken(){
    return Cookies.get(tokenkey)
}
export function setToken(token){
    console.log("set token")
    return Cookies.set(tokenkey,token)
}
export function removeToken() {
    return Cookies.remove(tokenkey)
}