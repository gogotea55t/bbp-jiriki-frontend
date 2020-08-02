<template>
  <div>
    <section class="section">
      <SongInfo :song-id="id" @song-loaded="loaded"></SongInfo>
    </section>
    <section class="section">
      <song-share-button :song-id="id" :song-identifier="songsIdentifier" />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongInfo from '../../components/organisms/SongInfo.vue'
import ScoreStyle from '../../components/atoms/ScoreStyle.vue'
import Songs from '../../components/types/Songs'
import SongShareButton from '../../components/molecules/SongShareButton.vue'
import axios from 'axios'
export default Vue.extend({
  components: { SongInfo, SongShareButton },
  data: function () {
    return {
      id: this.$route.params.id,
      songsIdentifier: '',
    }
  },
  async created() {
    let id = this.$route.params.id
  },
  methods: {
    loaded(identifierEmitted) {
      this.songsIdentifier = identifierEmitted
    },
  },
  head() {
    const BASE_URL: string = process.env.baseUrl || ''
    return {
      title:
        this.$data.songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$data.songsIdentifier + 'の得点一覧、楽曲情報です。',
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@bbp10_jiriki' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: BASE_URL + '/songs/' + this.$route.params.id,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.$data.songsIdentifier + ' - 大合奏！バンドブラザーズ☆10地力表',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$data.songsIdentifier + 'の得点一覧、楽曲情報です。',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: BASE_URL + '/favicon.ico',
        },
        { name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$data.songsIdentifier + 'の得点一覧、楽曲情報です。',
        },
      ],
    }
  },
})
</script>
