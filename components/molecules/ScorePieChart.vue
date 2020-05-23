<template>
  <PieChartWrapper :chartData="chartData" />
</template>

<script lang="ts">
import Vue from 'vue'
import Stats from '../types/Stats'
import ChartData from '../types/ChartData'
import PieChartWrapper from '../atoms/PieChartWrapper.vue'
export default Vue.extend({
  components: { PieChartWrapper },
  props: {
    stats: { type: Stats }
  },
  data() {
    return {
      chartData: new ChartData([], [])
    }
  },
  methods: {
    renderGraph() {
      this.$data.chartData = new ChartData(
        [
          {
            data: [
              this.stats.gold,
              this.stats.silver,
              this.stats.bronze,
              this.stats.blue,
              this.stats.gray,
              this.stats.none
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
    }
  },
  watch: {
    stats() {
      this.renderGraph()
    }
  },
  mounted() {
    this.renderGraph()
  }
})
</script>
