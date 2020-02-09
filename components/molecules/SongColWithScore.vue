<template>
  <tr @click="jumpToInfoPage">
    <JirikiRank :jiriki-rank="song.jirikiRank"></JirikiRank>
    <td>{{ song.songName }}</td>
    <td>{{ song.contributor }}</td>
    <td>{{ song.instrument }}</td>
    <ScoreStyle :score="song.score" :decimal="isDecimal"></ScoreStyle>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import SongsWithScore from '../types/SongsWithScore'
import JirikiRank from '../atoms/JirikiRank.vue'
import ScoreStyle from '../atoms/ScoreStyle.vue'
export default Vue.extend({
  name: 'SongColWithScore',
  components: { JirikiRank, ScoreStyle },
  props: {
    song: {
      type: SongsWithScore,
      default: new SongsWithScore('', '', '', '', '', 0)
    },
    decimal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDecimal: this.decimal
    }
  },
  methods: {
    jumpToInfoPage: function() {
      this.$emit('toggleModal', this.$props.song.songId)
    }
  }
})
</script>
