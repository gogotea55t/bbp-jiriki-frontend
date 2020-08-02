import Vue from 'vue'
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('pie-chart', {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    chartData: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
