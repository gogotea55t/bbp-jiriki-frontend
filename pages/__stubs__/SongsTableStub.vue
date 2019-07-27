<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SongsTable',
  props: {
    query: {
      default: '',
      type: String
    }
  },
  methods: {
    async loadSongsByQuery(query: String) {
      if (query === '/songs?instrument=ネンリキ&page=0') {
        return 0
      } else {
        return 20
      }
    },
    async loadMore(query: String) {
      if (query === '/songs?name=RPG&page=1') {
        return 2
      } else if (query === '/songs?page=2') {
        return 15
      } else {
        return 20
      }
    }
  }
})
</script>
