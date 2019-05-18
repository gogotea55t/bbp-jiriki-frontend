<template>
  <div>
    <section class="section">
      <PlayerSelector @player-selected="searchByPlayer"></PlayerSelector>
      <SearchWindow @search-emit="searchSongs"></SearchWindow>
    </section>
    <section class="section">
      <SongsTableWithScore ref="songTable" :query="query"></SongsTableWithScore>
      <img
        id="songlist-loader"
        src="~/static/loading.gif"
        alt="now loading..."
      />
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerSelector from '../components/PlayerSelector.vue'
import SearchWindow from '../components/SearchWindow.vue'
import SongsTableWithScore from '../components/SongsTableWithScore.vue'
export default Vue.extend({
  name: 'Player',
  components: { PlayerSelector, SearchWindow, SongsTableWithScore },
  data() {
    return {
      query: '/players/u001/scores?page=',
      playerId: 'u001',
      page: 0
    }
  },
  head() {
    return {
      title: '得点一覧 - 大合奏！バンドブラザーズ☆10地力表',
      meta: [
        { name: 'twitter:card', content: 'summary' },
        {
          name: 'twitter:title',
          content: '得点一覧 - 大合奏！バンドブラザーズ☆10地力表'
        },
        {
          name: 'twitter:description',
          content: 'プレイヤーごとの得点一覧です。'
        },
        {
          name: 'description',
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
      songsTable.loadSongsByQuery(this.query + this.page)
      this.enableLoading()
    },
    async getMore() {
      this.page = this.page + 1
      let songsTable: any = this.$refs.songTable
      let numberOfSongsAdded: number = await songsTable.loadMore(
        this.query + this.page
      )
      if (numberOfSongsAdded < 20) {
        this.disableLoading()
      } else {
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
    }
  }
})
</script>
