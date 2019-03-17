<template>
  <td :class="classObj">
    {{ jirikiRank }}
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
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
      classObj: null
    }
  },
  mounted() {
    switch (this.jirikiRank) {
      case '地力Ｓ＋':
        this.classObj = {
          red: true,
          splus: true
        }
        break
      case '個人差Ｓ＋':
        this.classObj = {
          red: true,
          splus: true
        }
        break
      case '地力Ｓ':
        this.classObj = {
          white: true,
          sn: true
        }
        break
      case '個人差Ｓ':
        this.classObj = {
          white: true,
          sn: true
        }
        break
      case '地力Ａ＋':
        this.classObj = {
          white: true,
          aplus: true
        }
        break
      case '個人差Ａ＋':
        this.classObj = {
          white: true,
          aplus: true
        }
        break
      case '地力Ａ':
        this.classObj = {
          white: true,
          an: true
        }
        break
      case '個人差Ａ':
        this.classObj = {
          white: true,
          an: true
        }
        break
      case '地力Ｂ＋':
        this.classObj = {
          white: true,
          bplus: true
        }
        break
      case '個人差Ｂ＋':
        this.classObj = {
          white: true,
          bplus: true
        }
        break
      case '地力Ｂ':
        this.classObj = {
          white: true,
          bn: true
        }
        break
      case '個人差Ｂ':
        this.classObj = {
          white: true,
          bn: true
        }
        break
      case '地力Ｃ':
        this.classObj = {
          white: false,
          cn: true
        }
        break
      case '個人差Ｃ':
        this.classObj = {
          white: false,
          cn: true
        }
        break
      case '地力Ｄ':
        this.classObj = {
          white: false,
          dn: true
        }
        break
      case '個人差Ｄ':
        this.classObj = {
          white: false,
          dn: true
        }
        break
      case '地力Ｅ':
        this.classObj = {
          white: false,
          en: true
        }
        break
      case '個人差Ｅ':
        this.classObj = {
          white: false,
          en: true
        }
        break
      case '地力Ｆ':
        this.classObj = {
          white: false,
          fn: true
        }
        break
      case '個人差Ｆ':
        this.classObj = {
          white: false,
          fn: true
        }
        break
      case '求90':
        this.classObj = {
          unaccomplished: true
        }
        break
      default:
        this.classObj = {
          'default-jiriki': true
        }
    }
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
