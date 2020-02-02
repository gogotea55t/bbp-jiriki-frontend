<template>
  <tr @click="toggleModal">
    <JirikiRank :jiriki-rank="song.jirikiRank" />
    <td>{{ song.songName }}</td>
    <td>{{ song.contributor }}</td>
    <td>{{ song.instrument }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import JirikiRank from '../atoms/JirikiRank.vue'
import Songs from '../types/Songs'

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
    toggleModal: function() {
      this.$emit('toggleModal', this.$props.song.songId)
    }
  }
})
</script>

<style>
tbody tr {
  cursor: pointer;
}
</style>
