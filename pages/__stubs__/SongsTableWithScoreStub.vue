<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SongsTableWithScore',
  methods: {
    async loadSongsByQuery(query: string) {
      if (query === '/players/u001/scores?instrument=クラシックギター&page=0') {
        return 20
      } else {
        return 0
      }
    },
    async loadMore(query: string) {
      if (query === '/players/u001/scores?page=2') {
        return 2
      } else {
        return 20
      }
    },
  },
})
</script>
