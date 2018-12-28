<!-- Kahoot Game PIN Input Component -->
<template>
    <div class="game-pin-input">
        <input placeholder="Game PIN" type="text" v-model="pin">
    </div>
</template>


<script>
export default {
  name: 'PINInput',
  props: {
  },
  computed: {
     pin: {
          get() {
              return this.$store.state.gamePIN
          },
          set (pin) {
              this.$store.commit('updateGamePIN', pin)
          }
      }
  }
}
</script>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css?family=Montserrat')

.game-pin-input
    width: 35%

    input
        border: .125rem solid #ccc
        border-radius: 0
        width: 100%
        height: 50px
        line-height: 50px
        text-align: center
        font-family: 'Montserrat'
        font-weight: 700
        font-size: 30px
        color: black

        &:focus
            outline: none

    margin-bottom: 60px
</style>
