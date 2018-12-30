<template>
  <tr>
    <td>{{ jirikiRank }}</td>
    <td>{{ songName }}</td>
    <td>{{ contributor }}</td>
    <td>{{ instrument }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SongCol',
  props: {
    id: {
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
  }
})
</script>
