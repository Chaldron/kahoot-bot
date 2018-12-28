// public API for kahoot.js worker
import PromiseWorker from 'promise-worker'
import Worker from 'worker-loader!./worker'

// KahootWorker class
class KahootWorker {
    // id: worker ID
    // gameConfig: dict
        // name: name of the player
        // gamePIN: game pin to target
        // playstyle: 'fixed' to play a single fixed answer from setAnswer(), or 'random'
    constructor(id, gameConfig) {
        this.id = id // id
        this.gameConfig = gameConfig
        
        const worker = new PromiseWorker(new Worker()) // encapsulated promise worker
        worker.postMessage({type: 'init', payload: gameConfig}) // init worker
    }
}



export default KahootWorker