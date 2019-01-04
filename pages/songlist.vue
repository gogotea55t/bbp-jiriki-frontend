<template>
  <div>
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
    <img
      src="~/static/loading.gif"
      alt="now loading...">
  </div>
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
      songs: [],
      page: 1
    }
  },
  mounted: function() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getMore: function() {
      console.log('呼ばれてはいる')
      let more = axios
        .get(process.env.apiBaseUrl + '/songs?page=' + this.page)
        .then(response => {
          if (response.data.length > 0) {
            for (let d of response.data) {
              this.songs.push(d)
            }
            this.page += 1
          } else {
            console.log(response.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleScroll() {
      console.log(this)
    }
  },
  asyncData(context) {
    let url = process.env.apiBaseUrl + '/songs/'
    let songs = []
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
