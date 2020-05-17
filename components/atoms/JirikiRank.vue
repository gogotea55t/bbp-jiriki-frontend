<template>
  <td align="center">
    <span class="tag is-medium" :class="classObj">{{ jirikiRank }}</span>
  </td>
</template>

<script lang="ts">
import Vue from 'vue'

export class JirikiRankStyleClassObject {
  red: boolean = false
  white: boolean = false
  splus: boolean = false
  sn: boolean = false
  aplus: boolean = false
  an: boolean = false
  bplus: boolean = false
  bn: boolean = false
  cn: boolean = false
  dn: boolean = false
  en: boolean = false
  fn: boolean = false
  unaccomplished: boolean = false

  constructor(jirikiRank: string) {
    switch (jirikiRank) {
      case '地力Ｓ＋':
        ;(this.red = true), (this.splus = true)
        break
      case '個人差Ｓ＋':
        ;(this.red = true), (this.splus = true)
        break
      case '地力Ｓ':
        ;(this.white = true), (this.sn = true)
        break
      case '個人差Ｓ':
        ;(this.white = true), (this.sn = true)
        break
      case '地力Ａ＋':
        ;(this.white = true), (this.aplus = true)
        break
      case '個人差Ａ＋':
        ;(this.white = true), (this.aplus = true)

        break
      case '地力Ａ':
        ;(this.white = true), (this.an = true)

        break
      case '個人差Ａ':
        ;(this.white = true), (this.an = true)

        break
      case '地力Ｂ＋':
        ;(this.white = true), (this.bplus = true)

        break
      case '個人差Ｂ＋':
        ;(this.white = true), (this.bplus = true)

        break
      case '地力Ｂ':
        ;(this.white = true), (this.bn = true)

        break
      case '個人差Ｂ':
        ;(this.white = true), (this.bn = true)

        break
      case '地力Ｃ':
        ;(this.white = false), (this.cn = true)

        break
      case '個人差Ｃ':
        ;(this.white = false), (this.cn = true)

        break
      case '地力Ｄ':
        ;(this.white = false), (this.dn = true)

        break
      case '個人差Ｄ':
        ;(this.white = false), (this.dn = true)

        break
      case '地力Ｅ':
        ;(this.white = false), (this.en = true)

        break
      case '個人差Ｅ':
        ;(this.white = false), (this.en = true)

        break
      case '地力Ｆ':
        ;(this.white = false), (this.fn = true)

        break
      case '個人差Ｆ':
        ;(this.white = false), (this.fn = true)

        break
      case '求90':
        this.unaccomplished = true

        break
      default:
    }
  }
}

export default Vue.extend({
  name: 'JirikiRank',
  props: {
    jirikiRank: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {
      classObj: new JirikiRankStyleClassObject('地力Ｓ＋')
    }
  },
  watch: {
    jirikiRank() {
      this.classObj = new JirikiRankStyleClassObject(this.jirikiRank)
    }
  },
  mounted() {
    this.classObj = new JirikiRankStyleClassObject(this.jirikiRank)
  }
})
</script>

<style>
.red {
  color: crimson !important;
}

.white {
  color: white !important;
}

.splus {
  background-color: black !important;
  font-weight: bold !important;
}

.sn {
  background-color: black !important;
  font-weight: bold !important;
}

.aplus {
  background-color: #333333 !important;
}

.an {
  background-color: #3f3f3f !important;
}

.bplus {
  background-color: #5f5f5f !important;
}

.bn {
  background-color: #7f7f7f !important;
}

.cn {
  background-color: #9f9f9f !important;
}

.dn {
  background-color: #bfbfbf !important;
}

.en {
  background-color: #efefef !important;
}

.fn {
  background-color: #cfdfe6 !important;
}

.unaccomplished {
  background-color: orange !important;
}

.default-jiriki {
  background-color: white !important;
}
</style>
