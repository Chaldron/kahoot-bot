<!-- Start Button Component -->
<template>
    <div class="start-button" @click="startBot">
        <p>Start</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'StartButton',
  methods: {
      ...mapActions({
          startBot: 'startBot'
      })
  }
}
</script>

<style lang="sass" scoped>
.start-button
    width: 35%
    height: 50px
    background-color: #333

    display: flex
    justify-content: center
    align-items: center
    
    font-family: 'Montserrat'
    font-weight: 700
    font-size: 30px
    color: white

    &:hover
        background-color: darken(#333, 5%)
        cursor: pointer

    transition: 0.3s ease all

</style>
