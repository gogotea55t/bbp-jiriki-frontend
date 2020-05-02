<template>
  <div>
    <section class="section">
      <search-window @search-emit="search" />
    </section>
    <section class="section">
      <SongsTable
        ref="songTable"
        :query="query"
        @toggle-modal="toggleModal"
      ></SongsTable>
    </section>
    <Song-Loader
      :has-next-page-to-load="hasNextPageToLoad"
      :is-fetch-on-progress="isFetchOnProgress"
      @load-more="getMore"
    />
    <SongInfoModal ref="modalSection"></SongInfoModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongsTable from '../components/organisms/SongsTable.vue'
import SearchWindow from '../components/molecules/SearchWindow.vue'
import Songs from '../components/types/Songs'
import SongInfoModal from '../components/molecules/SongInfoModal.vue'
import SongLoader from '../components/molecules/SongLoader.vue'
import axios from 'axios'

export default Vue.extend({
  components: { SongsTable, SearchWindow, SongInfoModal, SongLoader },
  data: function() {
    return {
      songs: new Array<Songs>(),
      page: 0,
      query: '/songs?page=',
      hasNextPageToLoad: true,
      isFetchOnProgress: false
    }
  },
  head() {
    const BASE_URL: string = process.env.baseUrl || ''
    return {
      title: '楽曲一覧 - 大合奏！バンドブラザーズ☆10地力表',
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
          content: BASE_URL + '/songlist'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '得点一覧 - 大合奏！バンドブラザーズ☆10地力表'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: '登録されている楽曲の一覧です。'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: BASE_URL + '/favicon.ico'
        }
      ]
    }
  },
  mounted: function() {
    this.hasNextPageToLoad = true
  },
  methods: {
    getMore: async function() {
      try {
        // 読み込み中フラグを立てておくことで二重通信を防ぐ
        this.isFetchOnProgress = true
        this.page = this.page + 1
        let songTable: any = this.$refs.songTable
        let numberOfSongsAdded: number = await songTable.loadMore(
          this.query + this.page
        )
        if (numberOfSongsAdded < 20) {
          // 空のデータしか返ってこなかった場合、ローディング画像を消し、ローディングをやめる
          this.hasNextPageToLoad = false
        } else {
          this.hasNextPageToLoad = true
        }
        this.isFetchOnProgress = false
      } catch (error) {}
    },
    async search(searchQuery) {
      try {
        this.hasNextPageToLoad = true
        this.query = '/songs?' + searchQuery + '&page='
        this.page = 0
        let songTable: any = this.$refs.songTable
        songTable
          .loadSongsByQuery(this.query + this.page)
          .then(numberOfSongsAdded => {
            if (numberOfSongsAdded < 20) {
              this.hasNextPageToLoad = false
            }
          })
      } catch (error) {}
    },
    toggleModal(emittedSongId) {
      const modalComp: any = this.$refs.modalSection
      modalComp.toggleModal(emittedSongId)
    }
  }
})
</script>
