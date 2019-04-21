<template>
  <select v-model="playerId" @change="selectChanged">
    <option
      v-for="player in players"
      :key="player.userId"
      :value="player.userId"
    >
      {{ player.userName }}
    </option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'
import Players from './Players'
import axios from 'axios'
export default Vue.extend({
  name: 'PlayerSelector',
  data: function() {
    return {
      players: new Array<Players>(),
      playerId: 'u001'
    }
  },
  async created() {
    await axios.get(process.env.apiBaseUrl + '/players').then(response => {
      this.players = response.data.map(s => {
        return new Players(s.userId, s.userName)
      })
    })
  },
  methods: {
    selectChanged() {
      this.$emit('player-selected', this.playerId)
    }
  }
})
</script>
