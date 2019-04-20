<template>
  <div>
    <PlayerSelector></PlayerSelector>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerSelector from '../components/PlayerSelector.vue'
export default Vue.extend({
  name: 'Player',
  components: { PlayerSelector }
})
</script>
