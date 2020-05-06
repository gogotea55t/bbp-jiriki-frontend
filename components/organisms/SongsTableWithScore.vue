<template>
  <table id="score-table">
    <thead>
      <th align="center">
        地力
      </th>
      <th align="center">
        楽曲名
      </th>
      <th align="center">
        楽器名
      </th>
      <th align="center" colspan="2">
        得点
      </th>
    </thead>
    <tbody>
      <SongColWithScore
        v-for="song of songs"
        :key="song.songId"
        :song="song"
        :player-id="playerId"
        :decimal="decimal"
        @toggleModal="toggleModal"
      ></SongColWithScore>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import SongsWithScore from '../types/SongsWithScore'
import SongColWithScore from '../molecules/SongColWithScore.vue'
export default Vue.extend({
  name: 'SongsTableWithScore',
  components: { SongColWithScore },
  props: {
    query: {
      type: String,
      default: ''
    },
    decimal: {
      type: Boolean,
      default: false
    },
    playerId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      songs: new Array<SongsWithScore>()
    }
  },
  async created() {
    await this.loadSongsByQuery(this.query)
  },
  methods: {
    async loadSongsByQuery(query: String) {
      // 表示を切り替える前に配列を初期化する。一度中身を消さないとcssのクラスが残ってしまう。
      this.songs = new Array<SongsWithScore>()
      const apiBaseUrl: string =
        process.env.apiBaseUrl || 'http://localhost:8080'
      await axios
        .get(apiBaseUrl + '/v2' + query)
        .then(response => {
          this.songs = response.data.map(s => {
            return new SongsWithScore(
              s.songId,
              s.jirikiRank,
              s.songName,
              s.contributor,
              s.instrument,
              s.score,
              s.max,
              s.average
            )
          })
        })
        .catch(err => {
          const errMsg = 'サーバーとの通信に失敗しました'
          this.$nuxt.error({ statusCode: 500, message: errMsg })
        })

      return this.songs.length
    },
    async loadMore(query: String) {
      let count: number = 0
      const apiBaseUrl: string =
        process.env.apiBaseUrl || 'http://localhost:8080'
      await axios
        .get(apiBaseUrl + '/v2' + query)
        .then(response => {
          response.data.forEach(s => {
            count++
            this.songs.push(
              new SongsWithScore(
                s.songId,
                s.jirikiRank,
                s.songName,
                s.contributor,
                s.instrument,
                s.score,
                s.max,
                s.average
              )
            )
          })
        })
        .catch(err => {
          const errMsg = 'サーバーとの通信に失敗しました'
          this.$nuxt.error({ statusCode: err.response.status, message: errMsg })
        })

      return count
    },
    toggleModal(emittedSongId) {
      this.$emit('toggleModal', emittedSongId)
    }
  }
})
</script>
