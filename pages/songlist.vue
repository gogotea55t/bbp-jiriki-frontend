<template>
  <table class="table">
    <tr>
      <th>地力</th>
      <th>楽曲名</th>
      <th>投稿者名</th>
      <th>楽器名</th>
    </tr>
    <SongCol
      v-for="song in songs"
      v-bind="song"
      :key="song.songId"/>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../components/SongCol.vue'
import axios from 'axios'

export default Vue.extend({
  components: { SongCol },
  data: function() {
    console.log(process.env.apiBaseUrl)
    return {
      songs: []
    }
  },
  asyncData(context) {
    let url = process.env.apiBaseUrl + '/songs/'
    let songs = []
    console.log(url)
    return axios
      .get(url)
      .then(response => {
        return {
          songs: response.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>
