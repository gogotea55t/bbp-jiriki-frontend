<template>
  <tr @click="jumpToInfoPage">
    <JirikiRank :jiriki-rank="jirikiRank"/>
    <td>{{ songName }}</td>
    <td>{{ contributor }}</td>
    <td>{{ instrument }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import JirikiRank from './JirikiRank.vue'

export default Vue.extend({
  name: 'SongCol',
  components: { JirikiRank },
  props: {
    songId: {
      type: String,
      default: null
    },
    jirikiRank: {
      type: String,
      default: null
    },
    songName: {
      type: String,
      default: null
    },
    contributor: {
      type: String,
      default: null
    },
    instrument: {
      type: String,
      default: null
    }
  },
  data: function() {
    return {}
  },
  methods: {
    jumpToInfoPage: function() {
      window.location = '/songs/' + this.songId
    }
  }
})
</script>

<style>
tbody tr {
  cursor: pointer;
}
</style>
