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
    await axios.get(process.env.apiBaseUrl + this.query).then(response => {
      this.songs = response.data.map(s => {
        new SongsWithScore(
          s.songId,
          s.jirikiRank,
          s.songName,
          s.contributor,
          s.instrument,
          s.score
        )
      })
    })
  }
})
</script>
