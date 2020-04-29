<template>
  <div>
    <h2>スコア計算機</h2>
    <div class="field is-horizontal control">
      <label class="field-label best">
        BEST
      </label>
      <input
        v-model.number="best"
        class="field-body input"
        type="number"
        max="10000"
        min="0"
      />
    </div>
    <div class="field is-horizontal">
      <label class="field-label good">
        GOOD
      </label>
      <input
        v-model.number="good"
        class="field-body input"
        type="number"
        max="10000"
        min="0"
      />
    </div>
    <div class="field is-horizontal">
      <label class="field-label bad">
        BAD
      </label>
      <input
        v-model.number="bad"
        class="field-body input"
        type="number"
        max="10000"
        min="0"
      />
    </div>
    <div class="field is-horizontal">
      <label class="field-label miss">
        MISS
      </label>
      <input
        v-model.number="miss"
        class="field-body input"
        type="number"
        max="10000"
        min="0"
      />
    </div>
    <div class="field is-horizontal">
      <label class="field-label total">
        TOTAL NOTES
      </label>
      <input
        v-model.number="total"
        class="field-body input"
        type="number"
        readonly
      />
    </div>
    <article v-if="isValid" id="score-result">
      得点は
      <span id="score-numeral-part" class="numeral">
        {{ scoreView }}
      </span>
      .
      <span id="score-decimal-part" class="decimal">
        {{ decimal }}
      </span>
      点です。
    </article>
    <article v-else id="score-invalid-angry">
      コラコラコラコラ～ッ！(`o´)
    </article>
    <article v-if="isValid">
      <div v-if="lossByGood > 0" id="score-loss-by-good">
        GOODでの失点は{{ lossByGood.toFixed(2) }}点です。
      </div>
      <div v-if="lossByBad > 0" id="score-loss-by-bad">
        BADでの失点は{{ lossByBad.toFixed(2) }}点です。
      </div>
      <div v-if="lossByMiss > 0" id="score-loss-by-miss">
        MISSでの失点は{{ lossByMiss.toFixed(2) }}点です。
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      best: 1,
      good: 0,
      bad: 0,
      miss: 0
    }
  },
  computed: {
    total(): Number {
      return (
        Number(this.best) +
        Number(this.good) +
        Number(this.bad) +
        Number(this.miss)
      )
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
      function validate(num: Number): boolean {
        return (
          num.toString().indexOf('-') >= 0 || num.toString().indexOf('.') >= 0
        )
      }
      return !(
        validate(this.best) ||
        validate(this.good) ||
        validate(this.bad) ||
        validate(this.miss)
      )
    },
    scoreView(): Number {
      return Math.floor(this.score.valueOf())
    },
    decimal(): String {
      return (
        Math.floor((this.score.valueOf() - this.scoreView.valueOf()) * 100) /
        100
      )
        .toFixed(2)
        .slice(-2)
    },
    lossByGood(): number {
      return ((this.good * 0.15) / this.total.valueOf()) * 100
    },
    lossByBad(): number {
      return ((this.bad * 0.35) / this.total.valueOf()) * 100
    },
    lossByMiss(): number {
      return (this.miss / this.total.valueOf()) * 100
    }
  }
})
</script>

<style>
.best {
  background-color: red;
  color: white;
  text-align: center;
  font-size: 150%;
}

.good {
  background-color: orange;
  text-align: center;
  font-size: 150%;
}

.bad {
  background-color: #1133ee;
  color: white;
  text-align: center;
  font-size: 150%;
}

.miss {
  background-color: gray;
  color: white;
  text-align: center;
  font-size: 150%;
}

.total {
  background-color: greenyellow;
  text-align: center;
  font-size: 110%;
}

.numeral {
  font-size: 25px;
}
</style>
