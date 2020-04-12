<template>
  <div>
    <div class="field is-horizontal">
      <label class="label">BEST</label
      ><input v-model.number="best" class="input" type="number" />
    </div>
    <div class="field is-horizontal">
      <label class="label">GOOD</label
      ><input v-model.number="good" class="input" type="number" />
    </div>
    <div class="field is-horizontal">
      <label class="label">BAD</label
      ><input v-model.number="bad" class="input" type="number" />
    </div>
    <div class="field is-horizontal">
      <label class="label">MISS</label
      ><input v-model.number="miss" class="input" type="number" />
    </div>
    <div>TOTAL NOTES: {{ total }}</div>
    <div>SCORE: {{ scoreView }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      best: 0,
      good: 0,
      bad: 0,
      miss: 0
    }
  },
  computed: {
    total(): Number {
      return this.best + this.good + this.bad + this.miss
    },
    score(): Number {
      if (this.total) {
        return (
          ((this.best + this.good * 0.85 + this.bad * 0.65) /
            Number(this.total)) *
          100
        )
      } else {
        return 0
      }
    },
    isValid(): boolean {
      return false
    },
    scoreView(): Number {
      return Math.floor(this.score.valueOf())
    }
  }
})
</script>
