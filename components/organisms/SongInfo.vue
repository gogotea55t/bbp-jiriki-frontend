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
import SongCol from '../molecules/SongCol.vue'
import ScoreStyle from '../atoms/ScoreStyle.vue'
import Songs from '../types/Songs'
import axios from 'axios'

export default Vue.extend({
  components: { SongCol, ScoreStyle },
  props: {
    songId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      song: new Songs(this.songId, '', '', '', ''),
      scores: []
    }
  },
  watch: {
    songId: function() {
      this.resetData()
      this.loadInfo(this.$props.songId)
    }
  },
  async created() {
    if (this.songId === '') {
      return
    } else {
      this.loadInfo(this.songId)
    }
  },
  methods: {
    async loadInfo(id) {
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
      this.$data.song = songResponse
      this.$data.scores = scoreResponse
      this.$emit(
        'song-loaded',
        this.$data.song.songName +
          ' / ' +
          this.$data.song.contributor +
          ' (' +
          this.$data.song.instrument +
          ')'
      )
    },
    resetData: function() {
      this.song = new Songs('', '', '', '', '')
      this.scores = []
    }
  }
})
</script>
