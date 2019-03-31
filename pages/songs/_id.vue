<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>地力</th>
          <th>楽曲名</th>
          <th>投稿者名</th>
          <th>楽器名</th>
        </tr>
      </thead>
      <tbody>
        <SongCol :song="song" />
      </tbody>
    </table>
    <table class="table">
      <tr>
        <th>プレイヤー</th>
        <th>得点</th>
      </tr>
      <tr v-for="score in scores" :key="score.id">
        <td>{{ score.userName }}</td>
        <ScoreStyle :score="score.score" />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../../components/SongCol.vue'
import ScoreStyle from '../../components/ScoreStyle.vue'
import Songs from '../../components/Songs'
import axios from 'axios'
export default Vue.extend({
  components: { SongCol, ScoreStyle },
  data: function() {
    return {
      id: this.$route.params.id,
      song: new Songs(this.$route.params.id, '', '', '', ''),
      scores: []
    }
  },
  // 書き方はここをパクった→https://github.com/nuxt/nuxt.js/issues/978
  async asyncData(context) {
    let id = context.params.id

    let songResponse: Songs = await axios
      .get(process.env.apiBaseUrl + '/songs/' + id)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      })

    let scoreResponse = await axios
      .get(process.env.apiBaseUrl + '/songs/' + id + '/scores')
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
      })

    return {
      song: songResponse,
      scores: scoreResponse
    }
  },
  mounted() {
    console.log(this.song)
  }
})
</script>
