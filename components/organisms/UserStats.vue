<template>
  <div>
    <label class="checkbox">
      <input v-model="showNone" type="checkbox" />
      未プレイのものを含む
    </label>
    <div class="columns">
      <div class="column is-quarter"></div>
      <div class="clumn is-half">
        <ScorePieChart
          v-if="graphLoaded"
          :stats="stats"
          :show-none="showNone"
          :header="'全曲'"
        />
      </div>
      <div class="column is-quarter"></div>
    </div>
    <button class="button" @click="toggleDetail()">
      地力別に表示する
    </button>
    <div v-if="showDetail" class="columns is-multiline">
      <div
        v-for="detail of detailedStats"
        :key="detail.jirikiRank"
        class="column is-half"
      >
        <score-pie-chart
          :stats="{
            gold: detail.gold,
            silver: detail.silver,
            bronze: detail.bronze,
            blue: detail.blue,
            gray: detail.gray,
            none: detail.none
          }"
          :header="detail.jirikiRank"
          :show-none="showNone"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScorePieChart from '../molecules/ScorePieChart.vue'
import axios from 'axios'
import StatsWithJiriki from '../types/StatsWithJiriki'
import ChartData from '../types/ChartData'
import Stats from '../types/Stats'

export default Vue.extend({
  components: { ScorePieChart },
  data() {
    return {
      stats: new StatsWithJiriki(0, 0, 0, 0, 0, 0, ''),
      detailedStats: new Array<StatsWithJiriki>(),
      graphLoaded: false,
      showNone: false,
      showDetail: false
    }
  },
  async mounted() {
    await this.loadStats()
  },
  watch: {
    chartData() {
      this.loadStats()
    }
  },
  methods: {
    async loadStats() {
      try {
        await axios
          .get(
            process.env.apiBaseUrl +
              '/v1/players/' +
              this.$store.state.auth.loginUserId +
              '/stats'
          )
          .then(response => {
            const respData: StatsWithJiriki = response.data
            this.stats = respData
            this.graphLoaded = true
          })
      } catch (error) {
        this.$nuxt.error(error)
      }
    },
    async loadDetailedStats() {
      try {
        await axios
          .get(
            process.env.apiBaseUrl +
              '/v1/players/' +
              this.$store.state.auth.loginUserId +
              '/stats/detail'
          )
          .then(response => {
            const respData: Array<StatsWithJiriki> = response.data
            this.detailedStats = respData
          })
      } catch (error) {
        this.$nuxt.error(error)
      }
    },
    toggleDetail() {
      this.showDetail = !this.showDetail
      if (this.showDetail && this.detailedStats.length === 0) {
        this.loadDetailedStats()
      }
    }
  }
})
</script>
