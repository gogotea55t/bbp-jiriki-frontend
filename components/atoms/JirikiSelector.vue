<template>
  <div class="control is-expanded">
    <div class="select is-fullwidth">
      <select id="jiriki-selector" v-model="jirikiRankSelected">
        <option
          v-for="jirikiRank of jirikiRanks"
          :key="jirikiRank"
          :value="jirikiRank"
        >
          {{ jirikiRank }}
        </option>
      </select>
    </div>
  </div>
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
  }
})
</script>
