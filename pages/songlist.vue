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
    <img id="songlist-loader" src="~/static/loading.gif" alt="now loading..." />
    <SongInfoModal ref="modalSection"></SongInfoModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongsTable from '../components/SongsTable.vue'
import SearchWindow from '../components/SearchWindow.vue'
import Songs from '../components/Songs'
import SongInfoModal from '../components/SongInfoModal.vue'
import axios from 'axios'

export default Vue.extend({
  components: { SongsTable, SearchWindow, SongInfoModal },
  data: function() {
    return {
      songs: new Array<Songs>(),
      page: 0,
      query: '/songs?page='
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
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getMore: async function() {
      this.page = this.page + 1
      let songTable: any = this.$refs.songTable
      let numberOfSongsAdded: number = await songTable.loadMore(
        this.query + this.page
      )
      if (numberOfSongsAdded < 20) {
        // 空のデータしか返ってこなかった場合、ローディング画像を消す
        let loaderImage = document.getElementById('songlist-loader')
        if (loaderImage !== null) {
          loaderImage.style.display = 'none'
        }
      } else {
        // スクロールを検知するイベントリスナーを追加
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    // ローディング画像のところまでスクロールが行くと次のデータを読み込むようにする
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      let loaderImage = document.getElementById('songlist-loader')
      let loaderImagePosition = 0
      if (loaderImage !== null) {
        loaderImagePosition = loaderImage.offsetTop
      } else {
        window.removeEventListener('scroll', this.handleScroll)
      }
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      let scrollBottom = clientHeight + scrollTop
      if (scrollBottom > loaderImagePosition) {
        // 多重に通信されると困るので条件を満たした時点でイベントリスナーを一度消す
        window.removeEventListener('scroll', this.handleScroll)
        this.getMore()
      }
    },
    enableLoading() {
      let loader = document.getElementById('songlist-loader')
      if (loader === null) {
      } else if (loader.style.display === 'none') {
        loader.style.display = 'block'
        window.addEventListener('scroll', this.handleScroll)
      }
    },
    disableLoading() {
      let loader = document.getElementById('songlist-loader')
      if (loader !== null) {
        loader.style.display = 'none'
      }
      window.removeEventListener('scroll', this.handleScroll)
    },
    async search(searchQuery) {
      this.enableLoading()
      this.query = '/songs?' + searchQuery + '&page='
      this.page = 0
      let songTable: any = this.$refs.songTable
      songTable
        .loadSongsByQuery(this.query + this.page)
        .then(numberOfSongsAdded => {
          if (numberOfSongsAdded < 20) {
            this.disableLoading()
          }
        })
    },
    toggleModal(emittedSongId) {
      const modalComp: any = this.$refs.modalSection
      modalComp.toggleModal(emittedSongId)
    }
  }
})
</script>
