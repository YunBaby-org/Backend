
import {GetUserInfo} from '@/apis/user'
import {getToken,removeToken} from '@/utils/auth'
const state = {
    userinfo:{
        token:getToken(),
        username:'',
        userimg:'https://i.imgur.com/4cBfkJM.png'
    }
}


//會有一個固定的參數state 
const mutations = {
    SET_TOKEN:function(state,token){
        console.log("set token")
        state.userinfo.token = token
    },
    SET_USERNAME:function(state,name){
        state.userinfo.username = name 
    },
    SET_USERIMG:function(state,img_url){
        state.userinfo.userimg = img_url
    },
    RESET_STATE:function(state){
        state.userinfo.token = getToken()
        state.userinfo.userimg = 'https://i.imgur.com/4cBfkJM.png'
        state.userinfo.username = 'default'
    }
}

//會有一個固定的參數 commit 
const actions = {
    GetUserInfo:function({commit,}){
        return new Promise((resolve,reject)=>{
            GetUserInfo().then(res=>{

                const {data} = res
                const username = data.username

                /*  call mutation to change vuex state's value  */
                commit("SET_USERNAME",username)

                resolve(data)
            }).catch(err=>{
                console.lg("GetUserInfo error :"+err)
                reject(err)
            })
        })
    },
    Login:function({commit}){
        console.log("Login action")
        commit("SET_TOKEN","default-token")
    },
    ResetToken:function({commit}){
        return new Promise(resolve =>{
            removeToken()
            commit("RESET_STATE")
            resolve()
        })
    }

}



export default {
    state,mutations,actions,
    namespaced: true,//note it 
}