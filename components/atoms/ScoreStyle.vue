<template>
  <td :class="classObject">
    {{ score }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue'

export class ScoreStyleClassObject {
  masakaHonkija: boolean
  chutoHampa: boolean
  masakaKonoteido: boolean
  manzokuSitenai: boolean
  chousiniNorunja: boolean
  constructor(score: Number) {
    this.masakaHonkija = false
    this.chutoHampa = false
    this.masakaKonoteido = false
    this.manzokuSitenai = false
    this.chousiniNorunja = false
    if (0 <= score && score < 50) {
      this.masakaHonkija = true
    } else if (50 <= score && score < 80) {
      this.chutoHampa = true
    } else if (score >= 80 && score < 90) {
      this.masakaKonoteido = true
    } else if (score >= 90 && score < 100) {
      this.manzokuSitenai = true
    } else if (score == 100) {
      this.chousiniNorunja = true
    }
  }
}

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
      classObject: new ScoreStyleClassObject(this.score)
    }
  },
  watch: {
    score() {
      this.classObject = new ScoreStyleClassObject(this.score)
    }
  }
})
</script>

<style>
.masakaHonkija {
  background-color: #efefef;
}

.chutoHampa {
  background-color: #a4c2ea;
}

.masakaKonoteido {
  background-color: #ea9999;
}

.manzokuSitenai {
  background-color: #cccccc;
}

.chousiniNorunja {
  background-color: gold;
}
</style>
