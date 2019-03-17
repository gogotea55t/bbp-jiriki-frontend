<template>
  <td :class="classObject">
    {{ score }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ScoreStyle',
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      classObject: null
    }
  },
  mounted() {
    let sc = this.score
    if (0 <= sc && sc < 50) {
      this.classObject = {
        'masaka-honkija': true
      }
    } else if (50 <= sc && sc < 80) {
      this.classObject = {
        'chuto-hampa': true
      }
    } else if (sc >= 80 && sc < 90) {
      this.classObject = {
        'masaka-konoteido': true
      }
    } else if (sc >= 90 && sc < 100) {
      this.classObject = {
        'manzoku-sitenai': true
      }
    } else if (sc == 100) {
      this.classObject = {
        'chousini-norunja': true
      }
    }
  }
})
</script>

<style>
.masaka-honkija {
  background-color: #efefef;
}

.chuto-hampa {
  background-color: #a4c2ea;
}

.masaka-konoteido {
  background-color: #ea9999;
}

.manzoku-sitenai {
  background-color: #cccccc;
}

.chousini-norunja {
  background-color: gold;
}
</style>
