<template>
  <tr class="score-table-tr">
    <JirikiRank
      :id="'jiriki_' + song.songId"
      :jiriki-rank="song.jirikiRank"
      @click="jumpToInfoPage"
    ></JirikiRank>
    <td :id="'songname_' + song.songId" @click="jumpToInfoPage">
      {{ song.songName }}
      <br class="is-hidden-desktop" />
      <span class="text-muted">/&nbsp;{{ song.contributor }} </span>
    </td>
    <td :id="'instrument_' + song.songId" @click="jumpToInfoPage">
      {{ song.instrument }}
    </td>
    <td>
      <ScoreInfo
        :song-id="song.songId"
        :score="song.score"
        :max="song.max"
        :average="song.average"
      ></ScoreInfo>
    </td>
    <ScoreStyle
      :id="'score_' + song.songId"
      :score="song.score"
      :max="song.max"
      :average="song.average"
      :song-id="song.songId"
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
import ScoreInfo from '../atoms/ScoreInfo.vue'

export default Vue.extend({
  name: 'SongColWithScore',
  components: { JirikiRank, ScoreStyle, ScoreInfo },
  props: {
    song: {
      type: SongsWithScore,
      default: new SongsWithScore('', '', '', '', '', 0, 0, 0)
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
<style scoped>
.score-table-tr td {
  vertical-align: middle !important;
}
.text-muted {
  font-size: 0.8em;
  color: #6c757d !important;
}
</style>
