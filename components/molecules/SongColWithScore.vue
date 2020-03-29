<template>
  <tr>
    <JirikiRank
      :jiriki-rank="song.jirikiRank"
      @click="jumpToInfoPage"
    ></JirikiRank>
    <td @click="jumpToInfoPage">{{ song.songName }}</td>
    <td @click="jumpToInfoPage">{{ song.contributor }}</td>
    <td @click="jumpToInfoPage">{{ song.instrument }}</td>
    <ScoreStyle
      :score="song.score"
      :songId="song.songId"
      :player-id="playerId"
      :decimal="isDecimal"
    ></ScoreStyle>
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
    },
    playerId: {
      type: String,
      default: null
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
