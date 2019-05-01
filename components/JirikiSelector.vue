<template>
  <select v-model="jirikiRankSelected" @change="selectChanged">
    <option
      v-for="jirikiRank of jirikiRanks"
      :key="jirikiRank"
      :value="jirikiRank"
    ></option>
  </select>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'JirikiSelector',
  data: function() {
    return {
      jirikiRanks: [
        '地力Ｓ＋',
        '個人差Ｓ＋',
        '地力Ｓ',
        '個人差Ｓ',
        '地力Ａ＋',
        '個人差Ａ＋',
        '地力Ａ',
        '個人差Ａ',
        '地力Ｂ＋',
        '個人差Ｂ＋',
        '地力Ｂ',
        '個人差Ｂ',
        '地力Ｃ',
        '個人差Ｃ',
        '地力Ｄ',
        '個人差Ｄ',
        '地力Ｅ',
        '個人差Ｅ',
        '地力Ｆ',
        '個人差Ｆ',
        '求90',
        '未決定'
      ],
      jirikiRankSelected: '未決定'
    }
  },
  methods: {
    selectChanged() {
      this.$emit('jiriki-rank-changed', this.jirikiRankSelected)
    }
  }
})
</script>
