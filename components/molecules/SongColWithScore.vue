<template>
  <tr>
    <JirikiRank
      :id="'jiriki_' + song.songId"
      :jiriki-rank="song.jirikiRank"
      @click="jumpToInfoPage"
    ></JirikiRank>
    <td :id="'songname_' + song.songId" @click="jumpToInfoPage">
      {{ song.songName }}
    </td>
    <td :id="'contributor_' + song.songId" @click="jumpToInfoPage">
      {{ song.contributor }}
    </td>
    <td :id="'instrument_' + song.songId" @click="jumpToInfoPage">
      {{ song.instrument }}
    </td>
    <ScoreStyle
      :id="'score_' + song.songId"
      :score="song.max"
      :song-id="song.songId"
      :player-id="playerId"
      :decimal="isDecimal"
    ></ScoreStyle>
    <ScoreStyle
      :id="'score_' + song.songId"
      :score="song.average"
      :song-id="song.songId"
      :player-id="playerId"
      :decimal="isDecimal"
    ></ScoreStyle>
    <ScoreStyle
      :id="'score_' + song.songId"
      :score="song.score"
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
export default Vue.extend({
  name: 'SongColWithScore',
  components: { JirikiRank, ScoreStyle },
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
