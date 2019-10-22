<template>
  <div class="control has-icons-left">
    <div class="select is-fullwidth">
      <select v-model="playerId" @change="selectChanged">
        <option
          v-for="player in players"
          :key="player.userId"
          :value="player.userId"
        >
          {{ player.userName }}
        </option>
      </select>
    </div>
    <span class="icon is-left">
      <font-awesome-icon icon="user"></font-awesome-icon>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Players from '../types/Players'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { error } from 'util'
library.add(faUser)
export default Vue.extend({
  name: 'PlayerSelector',
  components: { FontAwesomeIcon },
  data: function() {
    return {
      players: new Array<Players>(),
      playerId: 'u001'
    }
  },
  async created() {
    await axios
      .get(process.env.apiBaseUrl + '/v1' + '/players')
      .then(response => {
        this.players = response.data.map(s => {
          return new Players(s.userId, s.userName)
        })
      })
      .catch(error => {
        console.log(error)
        throw new Error('サーバーとの通信に失敗しました。')
      })
  },
  mounted() {
    if (this.$store.state.auth.loginUserId) {
      this.playerId = this.$store.state.auth.loginUserId
    }
  },
  methods: {
    selectChanged() {
      this.$emit('player-selected', this.playerId)
    }
  }
})
</script>
