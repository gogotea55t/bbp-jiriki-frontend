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
      <label class="field-label miss">
        TAIL MISS
      </label>
      <input
        v-model.number="tailMiss"
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
        id="total_notes"
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
      <div v-if="lossByTailMiss > 0" id="score-loss-by-miss">
        TAIL MISSでの失点は{{ lossByTailMiss.toFixed(2) }}点です。
      </div>
    </article>
    <article>
      <h3 id="furtherOptionButton" @click="furtherOption = !furtherOption">
        <span v-if="furtherOption">▼</span>
        <span v-else>▶</span>
        詳細
      </h3>
      <div v-if="furtherOption">
        <ul>
          <li>
            実際の点数が
            <input
              v-model="actualScore"
              type="number"
              min="0"
              max="100"
            />であれば、予想されるTAIL MISSは
            <span id="estimated_min_tail_miss">
              {{ estimatedMinTailMiss }}
            </span>
            ~
            <span id="estimated_max_tail_miss">
              {{ estimatedMaxTailMiss }}
            </span>
            個です。
          </li>
          <li>
            目標の点数が
            <input
              v-model="goalScore"
              type="number"
              min="0"
              max="100"
            />であれば、減らすべきGOODは
            <span id="good_for_goal">
              {{ goodForGoal }}
            </span>
            個、減らすべきBADは
            <span id="bad_for_goal">
              {{ badForGoal }}
            </span>
            個、減らすべきMISSは
            <span id="miss_for_goal">
              {{ missForGoal }}
            </span>
            個です。（実現可能性は考えていません）
          </li>
        </ul>
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
      miss: 0,
      tailMiss: 0,
      actualScore: 0,
      goalScore: 0,
      furtherOption: false
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
          ((this.best +
            this.good * 0.85 +
            this.bad * 0.65 -
            this.tailMiss * 0.5) /
            Number(this.total)) *
          100
        )
      } else {
        return 0
      }
    },
    isValid(): boolean {
      /**
       * 小数点か負の数を入力されたら不正な値とする
       */
      function validate(num: Number): boolean {
        return (
          num.toString().indexOf('-') >= 0 || num.toString().indexOf('.') >= 0
        )
      }
      return !(
        validate(this.best) ||
        validate(this.good) ||
        validate(this.bad) ||
        validate(this.miss) ||
        validate(this.tailMiss) ||
        // TAIL MISSの数がBAD以上より大きい時は不正とする
        this.best + this.good + this.bad < this.tailMiss
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
    },
    lossByTailMiss(): number {
      return ((this.tailMiss * 0.5) / this.total.valueOf()) * 100
    },
    estimatedMinTailMiss(): number {
      if (this.score < this.actualScore) {
        return 0
      }
      return Math.max(
        Math.floor(
          ((this.score.valueOf() -
            this.actualScore -
            1 +
            this.lossByTailMiss.valueOf()) *
            this.total.valueOf()) /
            50
        ),
        0
      )
    },
    estimatedMaxTailMiss(): number {
      if (this.score < this.actualScore) {
        return 0
      }
      return Math.max(
        Math.floor(
          ((this.score.valueOf() -
            this.actualScore +
            this.lossByTailMiss.valueOf()) *
            this.total.valueOf()) /
            50
        ),
        0
      )
    },
    goodForGoal(): number {
      if (this.goalScore < this.score) {
        return 0
      }
      return (
        Math.floor(
          ((this.goalScore - this.score.valueOf()) * this.total.valueOf()) / 15
        ) + 1
      )
    },
    badForGoal(): number {
      if (this.goalScore < this.score) {
        return 0
      }
      return (
        Math.floor(
          ((this.goalScore - this.score.valueOf()) * this.total.valueOf()) / 35
        ) + 1
      )
    },
    missForGoal(): number {
      if (this.goalScore < this.score) {
        return 0
      }
      return (
        Math.floor(
          ((this.goalScore - this.score.valueOf()) * this.total.valueOf()) / 100
        ) + 1
      )
    }
  }
})
</script>

<style>
.best {
  background-color: rgb(208, 0, 0);
  color: white;
  text-align: center;
  font-size: 150%;
}

.good {
  background-color: rgb(255, 186, 8);
  text-align: center;
  font-size: 150%;
}

.bad {
  background-color: rgb(63, 136, 197);
  color: white;
  text-align: center;
  font-size: 150%;
}

.miss {
  background-color: rgb(162, 174, 187);
  color: white;
  text-align: center;
  font-size: 150%;
}

.total {
  background-color: rgb(28, 49, 68);
  color: white;
  text-align: center;
  font-size: 110%;
}

.numeral {
  font-size: 25px;
}

article {
  padding-top: 15px;
}
</style>
