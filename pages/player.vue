<template>
  <div>
    <section class="section">
      <PlayerSelector @player-selected="searchByPlayer"></PlayerSelector>
      <SearchWindow @search-emit="searchSongs"></SearchWindow>
    </section>
    <section class="section">
      <SongsTableWithScore
        ref="songTable"
        :query="query"
        @toggleModal="toggleModal"
      ></SongsTableWithScore>
      <img
        id="songlist-loader"
        src="~/static/loading.gif"
        alt="now loading..."
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
export default Vue.extend({
  name: 'Player',
  components: {
    PlayerSelector,
    SearchWindow,
    SongsTableWithScore,
    SongInfoModal
  },
  data() {
    return {
      query: '/players/u001/scores?page=',
      playerId: 'u001',
      page: 0
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    searchByPlayer(playerId) {
      this.page = 0
      this.playerId = playerId
      this.query = '/players/' + this.playerId + '/scores?page='
      let songsTable: any = this.$refs.songTable
      songsTable.loadSongsByQuery(this.query + this.page)
      this.enableLoading()
    },
    searchSongs(queryString: string) {
      this.page = 0
      this.query =
        '/players/' + this.playerId + '/scores?' + queryString + '&page='
      let songsTable: any = this.$refs.songTable
      songsTable
        .loadSongsByQuery(this.query + this.page)
        .then(numberOfSongsAdded => {
          if (numberOfSongsAdded < 20) {
            this.disableLoading()
          } else {
            this.enableLoading()
          }
        })
    },
    async getMore() {
      this.page = this.page + 1
      let songsTable: any = this.$refs.songTable
      await songsTable
        .loadMore(this.query + this.page)
        .then(numberOfSongsAdded => {
          if (numberOfSongsAdded < 20) {
            this.disableLoading()
          } else {
            window.addEventListener('scroll', this.handleScroll)
          }
        })
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
    toggleModal(emittedSongId) {
      const modalComponent: any = this.$refs.modalSection
      modalComponent.toggleModal(emittedSongId)
    }
  }
})
</script>
