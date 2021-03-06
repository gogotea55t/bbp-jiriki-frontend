<template>
  <div class="control has-icons-left">
    <div class="select is-fullwidth">
      <select v-model="playerId" @change="selectChanged">
        <option v-if="!playerOnly" value="average">
          プレイヤーを選択してください
        </option>
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
library.add(faUser)
export default Vue.extend({
  name: 'PlayerSelector',
  components: { FontAwesomeIcon },
  props: {
    /**
     *  プレイヤーと紐づく情報だけを表示するかどうか
     *  trueにすると「平均」などが表示されない
     */
    playerOnly: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      players: new Array<Players>(),
      playerId: 'average',
    }
  },
  computed: {
    defaultPlayerId(): string {
      return this.$store.state.auth.loginUserId || 'average'
    },
  },
  watch: {
    defaultPlayerId() {
      this.$data.playerId = this.defaultPlayerId
      this.$emit('player-selected', this.playerId)
    },
  },
  async created() {
    await axios
      .get(process.env.apiBaseUrl + '/v1' + '/players')
      .then((response) => {
        this.players = response.data.map((s) => {
          return new Players(s.userId, s.userName)
        })
      })
      .catch((error) => {
        const errMsg = 'サーバーとの通信に失敗しました'
        this.$nuxt.error({ statusCode: error.response.status, message: errMsg })
      })
  },
  mounted() {
    if (this.playerOnly) {
      this.playerId = 'u001'
    }
    if (this.$store.state.auth.loginUserId) {
      this.playerId = this.$store.state.auth.loginUserId
    }
    this.$emit('player-selected', this.playerId)
  },
  methods: {
    selectChanged() {
      this.$emit('player-selected', this.playerId)
    },
  },
})
</script>
