const state = {

    trackers:{},//tracker's information 
    tracker_list:[] //tracker list ["test1id","test2id",.....]

}

const mutations = {
    UPDATE_TRACKERS:function(state,new_trackers){
        console.log('update tracker list (mutation)')
        state.trackers = new_trackers
    },
    UPDATE_TRACKER_LIST:function(state,new_tracker_list){
        console.log('update tracker list (mutation)')
        state.tracker_list = new_tracker_list
    }
}


const actions = {
    /*  用來更新所有tracker的個人資訊   */
    UpdateTrackers:function({commit},data){
        console.log('update tracker list (action)')
        commit("UPDATE_TRACKERS",data)
    },

    /*  更新該user所追蹤的tracker (list)  */
    UpdateTrackerList:function({commit},data){
        console.log('update tracker list (action)')
        commit("UPDATE_TRACKER_LIST",data)
    }
}



export default { 
    state,mutations,actions,
    namespaced: true,//note it 
}