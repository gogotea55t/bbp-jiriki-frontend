<template>
  <div>
    <player-selector
      :player-only="true"
      @player-selected="selectChanged"
    ></player-selector>
    <section class="section">
      地力表のスプレッドシート上のユーザー名を選んでください。<br />
      登録がない場合、「今は紐づけない」を選んで、スプレッドシートからユーザを登録してください。
    </section>
    <div class="buttons is-centered">
      <button v-if="enableCancelButton" class="button" @click="cancel">
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
  props: {
    enableCancelButton: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      playerId: 'u001'
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async linkage() {
      const token = await this.$auth.getTokenSilently()
      const data = {
        userId: this.playerId,
        twitterUserId: this.$auth.user.sub
      }
      await axios
        .put(process.env.apiBaseUrl + '/v1/players/auth0', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json'
          }
        })
        .then(res => {
          alert(`${res.data.userName}さんに紐づけしました。`)
          this.$store.commit('auth/setLoginUserId', res.data.userId)
          this.$emit('settings-changed')
          this.$router.push('/player')
        })
        .catch(err => {
          const errMsg = 'サーバーとの通信に失敗しました'
          this.$nuxt.error({ statusCode: err.response.status, message: errMsg })
        })
    },
    selectChanged(playerId) {
      this.playerId = playerId
    }
  }
})
</script>
