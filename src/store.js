import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    // current state of the bot
    botState: 'inactive',
    // current game PIN we are targetting
    gamePIN: '',
    // kahoot.js workers
    workers: [],
  },
  mutations: {
    // update the bot state
    updateBotState(state, botState) {
      state.botState = botState
    },
    // update the game PIN
    updateGamePIN(state, pin) {
      state.gamePIN = pin
    },
  },
  actions: {
    // start bot worker action
    startBot(state) {
      // update the app state
      state.commit('updateBotState', 'active')

      let worker = new Worker('@/kahoot/worker.js')

      // start the web worker queue
      //let worker = new Worker('worker.js')
    }

  }
})
