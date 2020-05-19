<template>
  <pie-chart :chart-data="chartData" :options="chartOptions"></pie-chart>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    chartData: { type: Object, default: null },
    chartOptions: { type: Object, default: null }
  }
})
</script>
