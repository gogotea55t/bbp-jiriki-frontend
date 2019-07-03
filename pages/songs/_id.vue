<template>
  <div><SongInfo :song-id="id" @song-loaded="loaded"></SongInfo></div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongInfo from '../../components/SongInfo.vue'
import ScoreStyle from '../../components/ScoreStyle.vue'
import Songs from '../../components/Songs'
import axios from 'axios'
export default Vue.extend({
  components: { SongInfo },
  data: function() {
    return {
      id: this.$route.params.id,
      songsIdentifier: ''
    }
  },
  head() {
    return {
      title:
        this.$data.songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表',
      meta: [
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:title',
          content:
            this.$data.songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表'
        },
        {
          name: 'twitter:description',
          content: this.$data.songsIdentifier + 'の得点一覧です。'
        }
      ]
    }
  },
  async created() {
    let id = this.$route.params.id
  },
  methods: {
    loaded(identifierEmitted) {
      this.songsIdentifier = identifierEmitted
    }
  }
})
</script>
