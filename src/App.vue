<template>
  <div id="app">
    <PINInput></PINInput>
    <StartButton></StartButton>
  </div>
</template>

<script>
import PINInput from './components/PINInput.vue'
import StartButton from './components/StartButton.vue'

export default {
  name: 'app',
  components: {
    PINInput,
    StartButton
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0

html, body
  height: 100%
  margin: 0
  padding: 0
body
  background-color: #66bf3a

#app
  height: 100%
  display: flex
  flex-flow: column nowrap
  justify-content: center
  align-items: center
</style>
