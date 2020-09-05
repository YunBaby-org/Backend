const getters = {
    sidebar:(state)=>state.app.sidebar,
    userinfo:(state)=>state.user.userinfo,
    trackerList:(state)=>state.trackers.tracker_list,
    trackersInfo:(state)=>state.trackers.trackers
}

export default getters