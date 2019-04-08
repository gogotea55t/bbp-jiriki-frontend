<template>
  <tr @click="jumpToInfoPage">
    <JirikiRank :jiriki-rank="song.jirikiRank" />
    <td>{{ song.songName }}</td>
    <td>{{ song.contributor }}</td>
    <td>{{ song.instrument }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import JirikiRank from './JirikiRank.vue'
import Songs from './Songs'

export default Vue.extend({
  name: 'SongCol',
  components: { JirikiRank },
  props: {
    song: Songs
  },
  data: function() {
    return {}
  },
  methods: {
    jumpToInfoPage: function() {
      window.location.href = '/songs/' + this.$props.song.songId
    }
  }
})
</script>

<style>
tbody tr {
  cursor: pointer;
}
</style>
