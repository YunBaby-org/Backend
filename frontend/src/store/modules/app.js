import Cookies from 'js-cookie'
const state = {
    app_name:"final project",
    sidebar:{
        open:Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false 
    },
    device:"desktop"
}

//會有一個固定的參數state 
const mutations = {
    TOOGLE_SIDEBAR:(state)=>{
        state.sidebar.open = !state.sidebar.open
        state.sidebar.withoutAnimation = false
        if(state.sidebar.open ==true){
            Cookies.set('sidebarStatus',1)

        }
        else{
            Cookies.set('sidebarStatus',0)
        }
    },
    CLOSE_SIDEBAR:(state,ani)=>{
        Cookies.set('sidebarStatus', 0)
        state.sidebar.open = false
        state.sidebar.withoutAnimation = ani
    },
    TOGGLE_DEVICE:(state,device)=>{
        state.device = device
    }
}

//會有一個固定的參數 commit 
const actions = {
    toggleSideBar:function({ commit }){
        commit("TOOGLE_SIDEBAR")
    },
    closeSideBar:function({commit},{ withoutAnimation }){
        commit("CLOSE_SIDEBAR",withoutAnimation)
    },
    toggleDevice:function({commit},device){
        commit("TOGGLE_DEVICE",device)
    }
}



export default {
    state,mutations,actions,
    namespaced: true,//note it 
}