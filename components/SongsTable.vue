<template>
  <table>
    <thead>
      <th>地力</th>
      <th>楽曲名</th>
      <th>投稿者名</th>
      <th>楽器名</th>
    </thead>
    <tbody>
      <SongCol
        v-for="song of songs"
        :key="'song' + song.songId"
        :song="song"
      ></SongCol>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from './SongCol.vue'
import Songs from './Songs'
import axios from 'axios'
export default Vue.extend({
  name: 'SongsTable',
  components: { SongCol },
  props: {
    query: {
      default: '/songs?page=',
      type: String
    }
  },
  data() {
    return {
      songs: new Array<Songs>()
    }
  },
  async created() {
    await this.loadSongsByQuery(this.query)
  },
  methods: {
    async loadSongsByQuery(query: string) {
      let url = process.env.apiBaseUrl + '/v1' + query
      let songsResponse: Array<Songs> = await axios
        .get<Array<Songs>>(url)
        .then(response => {
          return response.data.map(s => {
            return new Songs(
              s.songId,
              s.jirikiRank,
              s.songName,
              s.contributor,
              s.instrument
            )
          })
        })
        .catch(error => {
          console.log(error)
          throw new Error('サーバーとの通信に失敗しました。')
        })
      this.songs = songsResponse
      return songsResponse.length
    },
    async loadMore(query: string) {
      let numberOfSongsAdded: number = await axios
        .get(process.env.apiBaseUrl + '/v1' + query)
        .then(response => {
          if (response.data.length > 0) {
            response.data.forEach(element => {
              this.songs.push(
                new Songs(
                  element.songId,
                  element.jirikiRank,
                  element.songName,
                  element.contributor,
                  element.instrument
                )
              )
            })
          }
          return response.data.length
        })
        .catch(error => {
          console.log(error)
          return 0
        })
      return numberOfSongsAdded
    }
  }
})
</script>
