<template>
  <div>
    <h3 v-if="header" class="centerize">
      {{ header }}
    </h3>
    <div v-if="total === 0">
      1曲も登録されていません
    </div>
    <PieChartWrapper v-else :chart-data="chartData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Stats from '../types/Stats'
import ChartData from '../types/ChartData'
import PieChartWrapper from '../atoms/PieChartWrapper.vue'
export default Vue.extend({
  components: { PieChartWrapper },
  props: {
    header: { type: String, default: '' },
    stats: { type: Object, default: new Stats(0, 0, 0, 0, 0, 0) },
    showNone: { type: Boolean, default: false }
  },
  data() {
    return {
      chartData: new ChartData([], [])
    }
  },
  computed: {
    total(): number {
      return (
        this.stats.gold +
        this.stats.silver +
        this.stats.bronze +
        this.stats.blue +
        this.stats.gray
      )
    }
  },
  watch: {
    stats() {
      this.renderGraph()
    },
    showNone() {
      this.renderGraph()
    }
  },
  mounted() {
    this.renderGraph()
  },
  methods: {
    renderGraph() {
      if (this.showNone) {
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
      } else {
        this.$data.chartData = new ChartData(
          [
            {
              data: [
                this.stats.gold,
                this.stats.silver,
                this.stats.bronze,
                this.stats.blue,
                this.stats.gray
              ],
              backgroundColor: [
                'gold',
                '#cccccc',
                '#ea9999',
                '#a4c2ea',
                '#efefef'
              ]
            }
          ],
          ['100', '99~90', '89~80', '79~50', '50~0']
        )
      }
    }
  }
})
</script>
<style>
.centerize {
  text-align: center;
}
</style>
