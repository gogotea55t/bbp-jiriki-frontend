<template>
  <div>
    <p>登録済み曲数：{{ totalPlayed }} 曲</p>
    <label class="checkbox">
      <input type="checkbox" v-model="showNone" />
      未プレイのものを含む
    </label>
    <ScorePieChart v-if="graphLoaded" :stats="stats" :show-none="showNone" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ScorePieChart from '../molecules/ScorePieChart.vue'
import axios from 'axios'
import Stats from '../types/Stats'
import ChartData from '../types/ChartData'

export default Vue.extend({
  components: { ScorePieChart },
  data() {
    return {
      stats: new Stats(0, 0, 0, 0, 0, 0),
      graphLoaded: false,
      showNone: false
    }
  },
  computed: {
    totalPlayed() {
      return (
        this.$data.stats.gold +
        this.$data.stats.silver +
        this.$data.stats.bronze +
        this.$data.stats.blue +
        this.$data.stats.gray
      )
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
            const respData: Stats = response.data
            this.stats = respData
            this.graphLoaded = true
          })
      } catch (error) {
        this.$nuxt.error(error)
      }
    }
  }
})
</script>
