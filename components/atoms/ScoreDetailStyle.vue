<template>
  <div>
    <div style="white-space: nowrap;">
      <span class="tag">BEST:&nbsp;{{ max }}</span>
      <font-awesome-icon
        v-if="score >= max"
        :icon="['fa', 'medal']"
        class="color-gold"
      ></font-awesome-icon>
    </div>
    <div style="white-space: nowrap;">
      <span class="tag color-silver">AVG&nbsp;:&nbsp;{{ average }}</span>
      <font-awesome-icon
        v-if="score >= average"
        :icon="['fa', 'medal']"
        class="color-silver"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

library.add(faMedal)

export default Vue.extend({
  name: 'ScoreDetailStyle',
  components: { FontAwesomeIcon },
  props: {
    score: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    average: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style>
.color-gold {
  color: #dbb400;
}
.color-silver {
  color: #9fa0a0;
}
</style>
