import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app.js'
import user from './modules/user.js'
import trackers from './modules/trackers.js'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    app,user,trackers
  },
  getters
})
