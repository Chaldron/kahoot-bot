// private kahoot.js worker API
import registerPromiseWorker from 'promise-worker/register'

// map postMessage inputs to worker actions
registerPromiseWorker((message) => {
  if (message.type === 'init') {
    console.log(message.payload)
  }
})