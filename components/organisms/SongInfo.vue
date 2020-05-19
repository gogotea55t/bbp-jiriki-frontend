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
        <ScoreStyle
          :song-id="song.songId"
          :player-id="score.userId"
          :score="score.score"
        />
      </tr>
    </table>

    <PieChart v-if="graphLoaded" :chartData="chartData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../molecules/SongCol.vue'
import ScoreStyle from '../atoms/ScoreStyle.vue'
import PieChart from '../atoms/PieChart.vue'
import Songs from '../types/Songs'
import axios from 'axios'
import Stats from '../types/Stats'

export default Vue.extend({
  components: { SongCol, ScoreStyle, PieChart },
  props: {
    songId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      song: new Songs(this.songId, '', '', '', ''),
      scores: [],
      graphLoaded: false,
      chartData: new ChartData([], [])
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
      try {
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

        let scoreResponse = await axios
          .get(process.env.apiBaseUrl + '/v2' + '/songs/' + id + '/scores')
          .then(response => {
            return response.data
          })

        let scoreStat: Stats = await axios
          .get(process.env.apiBaseUrl + '/v1' + '/songs/' + id + '/stats')
          .then(response => {
            const respData: Stats = response.data
            this.$data.chartData = new ChartData(
              [
                {
                  data: [
                    respData.gold,
                    respData.silver,
                    respData.bronze,
                    respData.blue,
                    respData.gray,
                    respData.none
                  ],
                  backgroundColor: [
                    'gold',
                    '#cccccc',
                    '#ea9999',
                    '#a4c2ea',
                    '#efefef',
                    'white'
                  ]
                }
              ],
              ['100', '99~90', '89~80', '79~50', '50~0', 'no entry']
            )
            this.graphLoaded = true
            return response.data
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
      } catch (error) {
        const errMsg = 'サーバーとの通信に失敗しました'
        this.$nuxt.error({ statusCode: 500, message: errMsg })
      }
    },
    resetData: function() {
      this.song = new Songs('', '', '', '', '')
      this.scores = []
    }
  }
})

class ChartData {
  datasets: Array<Object>
  labels: String[]
  constructor(datasets: Array<Object>, labels: String[]) {
    this.datasets = datasets
    this.labels = labels
  }
}
</script>
