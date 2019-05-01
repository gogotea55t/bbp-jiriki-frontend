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
      ></SongColWithScore>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import SongsWithScore from './SongsWithScore'
import SongColWithScore from './SongColWithScore.vue'
export default Vue.extend({
  name: 'SongsTableWithScore',
  components: { SongColWithScore },
  props: {
    query: {
      type: String,
      default: ''
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
      await axios.get(process.env.apiBaseUrl + query).then(response => {
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
    },
    async loadMore(query: String) {
      let count: number = 0
      await axios.get(process.env.apiBaseUrl + query).then(response => {
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

      return count
    }
  }
})
</script>
