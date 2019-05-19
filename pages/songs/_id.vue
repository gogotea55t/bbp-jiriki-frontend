<template>
  <div>
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
  head() {
    const songsIdentifier =
      this.$data.song.songName +
      ' / ' +
      this.$data.song.contributor +
      ' (' +
      this.$data.song.instrument +
      ')'
    return {
      title: songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表',
      meta: [
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:title',
          content: songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表'
        },
        {
          name: 'twitter:description',
          content: songsIdentifier + 'の得点一覧です。'
        }
      ]
    }
  },
  async created() {
    let id = this.$route.params.id
    let songResponse: Songs = await axios
      .get(process.env.apiBaseUrl + '/v1' + '/songs/' + id)
      .then(response => {
        let s: any = response.data
        return new Songs(
          s.songId,
          s.jirikiRank,
          s.songName,
          s.contributor,
          s.instrument
        )
      })
      .catch(error => {
        console.log(error)
        throw new Error('サーバーとの接続に失敗しました')
      })

    let scoreResponse = await axios
      .get(process.env.apiBaseUrl + '/v1' + '/songs/' + id + '/scores')
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.log(error)
        throw new Error('サーバーとの接続に失敗しました')
      })
    this.song = songResponse
    this.scores = scoreResponse
  }
})
</script>
