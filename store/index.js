import { createStore } from 'vuex'
import loginModule from './modules/loginModule.js'
export default createStore({
  state: {
    manager:false
  },
  mutations: {
    isManager(state){
      state.manager=true
    }
  },
  actions: {
  },
  modules: {
    loginModule
  }
})
