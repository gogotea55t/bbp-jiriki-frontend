<template>
  <div>
    <h1>得点一覧</h1>
    <section class="section">
      <PlayerSelector @player-selected="playerIdChanged"></PlayerSelector>
      <SearchWindow @search-emit="searchSongs"></SearchWindow>
    </section>
    <section class="section">
      <SongsTableWithScore
        ref="songTable"
        :query="query"
        :decimal="decimal"
        :player-id="playerId"
        @toggleModal="toggleModal"
      ></SongsTableWithScore>
      <song-loader
        :has-next-page-to-load="hasNextPageToLoad"
        :is-fetch-on-progress="isFetchOnProgress"
        @load-more="getMore"
      />
      <SongInfoModal ref="modalSection"></SongInfoModal>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerSelector from '../components/atoms/PlayerSelector.vue'
import SearchWindow from '../components/molecules/SearchWindow.vue'
import SongsTableWithScore from '../components/organisms/SongsTableWithScore.vue'
import SongInfoModal from '../components/molecules/SongInfoModal.vue'
import SongLoader from '../components/molecules/SongLoader.vue'
export default Vue.extend({
  name: 'Player',
  components: {
    PlayerSelector,
    SearchWindow,
    SongsTableWithScore,
    SongLoader,
    SongInfoModal
  },
  data() {
    return {
      query: '/players/average/scores?page=',
      playerId: 'average',
      page: 0,
      hasNextPageToLoad: true,
      isFetchOnProgress: false
    }
  },
  head() {
    const BASE_URL: string = process.env.baseUrl || ''
    return {
      title: '得点一覧 - 大合奏！バンドブラザーズ☆10地力表',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '登録されている楽曲の一覧です。'
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@bbp10_jiriki' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: BASE_URL + '/player'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '得点一覧 - 大合奏！バンドブラザーズ☆10地力表'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'プレイヤーごとの得点一覧です。'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: BASE_URL + '/favicon.ico'
        },
        { name: 'twitter:card', content: 'summary' },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'プレイヤーごとの得点一覧です。'
        }
      ]
    }
  },
  computed: {
    decimal(): boolean {
      return this.playerId === 'average'
    }
  },
  watch: {
    playerId() {
      this.searchByPlayer(this.playerId)
    }
  },
  created() {
    if (this.$store.state.auth.loginUserId) {
      this.query =
        '/players/' + this.$store.state.auth.loginUserId + '/scores?page='
    }
  },
  methods: {
    searchByPlayer(playerId) {
      this.page = 0
      this.playerId = playerId
      this.query = '/players/' + this.playerId + '/scores?page='
      let songsTable: any = this.$refs.songTable
      songsTable.loadSongsByQuery(this.query + this.page).then(() => {
        this.isFetchOnProgress = false
      })
      this.hasNextPageToLoad = true
    },
    searchSongs(queryString: string) {
      this.page = 0
      this.query =
        '/players/' + this.playerId + '/scores?' + queryString + '&page='
      let songsTable: any = this.$refs.songTable
      songsTable
        .loadSongsByQuery(this.query + this.page)
        .then(numberOfSongsAdded => {
          this.isFetchOnProgress = false
          if (numberOfSongsAdded < 20) {
            this.hasNextPageToLoad = false
          } else {
            this.hasNextPageToLoad = true
          }
        })
    },
    async getMore() {
      this.isFetchOnProgress = true
      this.page = this.page + 1
      let songsTable: any = this.$refs.songTable
      await songsTable
        .loadMore(this.query + this.page)
        .then(numberOfSongsAdded => {
          this.isFetchOnProgress = false
          if (numberOfSongsAdded < 20) {
            this.hasNextPageToLoad = false
          } else {
            this.hasNextPageToLoad = true
          }
        })
    },
    toggleModal(emittedSongId) {
      const modalComponent: any = this.$refs.modalSection
      modalComponent.toggleModal(emittedSongId)
    },
    playerIdChanged(playerId) {
      this.playerId = playerId
    }
  }
})
</script>
