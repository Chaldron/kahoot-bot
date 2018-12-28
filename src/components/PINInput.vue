<!-- Kahoot Game PIN Input Component -->
<template>
    <div class="game-pin-input">
        <input placeholder="Game PIN" type="text" :value="gamePIN" @input="updateGamePIN">
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PINInput extends Vue {
    
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

</style>
