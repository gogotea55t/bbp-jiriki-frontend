<template>
  <div>
    <player-selector @player-selected="selectChanged"></player-selector>
    <section class="section">
      地力表のスプレッドシート上のユーザー名を選んでください。<br />
      今後ログインした時、このユーザーの情報が最初に表示されるようになります。<br />
      この選択は後でも行えます。
    </section>
    <div class="buttons is-centered">
      <button class="button">
        今は紐づけない
      </button>
      <button class="button is-info" @click="linkage">
        紐づける
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import PlayerSelector from '../atoms/PlayerSelector.vue'
import Players from '../types/Players'
export default Vue.extend({
  components: { PlayerSelector },
  data: function() {
    return {
      playerId: 'u001'
    }
  },
  methods: {
    async linkage() {
      const token = await this.$auth.getAccessToken()
      const data = {
        userId: this.playerId,
        twitterUserId: this.$auth.profile.sub
      }
      await axios
        .put(process.env.apiBaseUrl + '/v1/players', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        })
        .then(res => {
          alert(`${res.data.userName}さんに紐づけしました。`)
          this.$router.push('/player')
        })
        .catch(err => {
          throw new Error(err)
        })
    },
    selectChanged(playerId) {
      this.playerId = playerId
    }
  }
})
</script>
