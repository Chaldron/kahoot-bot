import Vue from 'vue'
import Vuex from 'vuex'
import KahootWorker from '@/kahoot'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    // current state of the app
    appState: 'inactive',
    // current game PIN we are targetting
    gamePIN: '',
    // number of workers to use
    numWorkers: 10,
    // actual kahoot.js workers
    workers: [],
  },
  mutations: {
    // update the bot state
    updateAppState(state, appState) {
      state.appState = appState
    },
    // update the game PIN
    updateGamePIN(state, pin) {
      state.gamePIN = pin
    },
    // add worker(s) to the queue
    addWorkers(state, worker) {
      if (Array.isArray(worker)) {
        for (const w of worker) {
          state.workers.push(w)
        }
      }
      else
      {
        state.workers.push(worker)
      }      
    }
  },
  actions: {
    // start bot worker action
    startBot(context) {
      // update the app state
      context.commit('updateAppState', 'active')

      // create workers
      const workers = []
      for (let i = 0; i < context.state.numWorkers; i++)
      {
        const worker = new KahootWorker(i, {name: 'Name', gamePIN: 'pin'})
        workers.push(worker)
      }
      context.commit('addWorkers', workers)
    }
    
  }
})
