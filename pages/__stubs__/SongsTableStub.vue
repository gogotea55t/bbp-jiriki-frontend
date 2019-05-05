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
    loadSongsByQuery(query: String) {},
    loadMore(query: String) {
      if (query === '/songs?name=RPG&page=1') {
        return 2
      } else {
        return 20
      }
    }
  }
})
</script>
