<template>
  <td :class="classObj">
    {{ jirikiRank }}
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
  mounted() {
    this.classObj = new JirikiRankStyleClassObject(this.jirikiRank)
  }
})
</script>

<style>
.red {
  color: crimson;
}

.white {
  color: white;
}

.splus {
  background-color: black;
  font-weight: bold;
}

.sn {
  background-color: black;
  font-weight: bold;
}

.aplus {
  background-color: #333333;
}

.an {
  background-color: #3f3f3f;
}

.bplus {
  background-color: #5f5f5f;
}

.bn {
  background-color: #7f7f7f;
}

.cn {
  background-color: #9f9f9f;
}

.dn {
  background-color: #bfbfbf;
}

.en {
  background-color: #efefef;
}

.fn {
  background-color: #cfdfe6;
}

.unaccomplished {
  background-color: orange;
}

.default-jiriki {
  background-color: white;
}
</style>
