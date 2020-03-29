<template>
  <td :class="classObject" align="right">
    <span class="control" v-if="edit">
      <score-form
        :score="score"
        :songId="songId"
        :userId="playerId"
        @score-submitted="scoreSubmitted"
      />
    </span>
    <span v-else>{{ scoreView }}</span>
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
import ScoreForm from '~/components/atoms/ScoreForm.vue'
export default Vue.extend({
  name: 'ScoreStyle',
  components: { ScoreForm },
  props: {
    score: {
      type: Number,
      default: 0
    },
    decimal: {
      type: Boolean,
      default: false
    },
    songId: {
      type: String,
      default: null
    },
    playerId: {
      type: String,
      default: null
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      classObject: new ScoreStyleClassObject(this.score)
    }
  },
  computed: {
    scoreView(): string {
      if (!this.score) {
        return ''
      }
      if (this.decimal) {
        return this.score.toFixed(2)
      } else {
        return this.score.toFixed(0)
      }
    }
  },
  watch: {
    score() {
      this.classObject = new ScoreStyleClassObject(this.score)
    }
  },
  methods: {
    scoreSubmitted(score: Number): void {
      this.classObject = new ScoreStyleClassObject(score)
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
