<template>
  <table>
    <thead>
      <th>地力</th>
      <th>楽曲名</th>
      <th>投稿者名</th>
      <th>楽器名</th>
      <th>得点</th>
    </thead>
    <tbody>
      <SongColWithScore
        v-for="song of songs"
        :key="song.songId"
        :song="song"
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
        .get(apiBaseUrl + '/v1' + query)
        .then(response => {
          this.songs = response.data.map(s => {
            return new SongsWithScore(
              s.songId,
              s.jirikiRank,
              s.songName,
              s.contributor,
              s.instrument,
              s.score
            )
          })
        })
        .catch(error => {
          throw new Error('サーバーとの接続に失敗しました')
        })

      return this.songs.length
    },
    async loadMore(query: String) {
      let count: number = 0
      const apiBaseUrl: string =
        process.env.apiBaseUrl || 'http://localhost:8080'
      await axios
        .get(apiBaseUrl + '/v1' + query)
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
                s.score
              )
            )
          })
        })
        .catch(error => {
          throw new Error('サーバーとの接続に失敗しました')
        })

      return count
    },
    toggleModal(emittedSongId) {
      this.$emit('toggleModal', emittedSongId)
    }
  }
})
</script>
