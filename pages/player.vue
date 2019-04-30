<template>
  <div>
    <PlayerSelector @player-selected="searchByPlayer"></PlayerSelector>
    <SongsTableWithScore ref="songTable" :query="query"></SongsTableWithScore>
    <img id="songlist-loader" src="~/static/loading.gif" alt="now loading..." />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerSelector from '../components/PlayerSelector.vue'
import SongsTableWithScore from '../components/SongsTableWithScore.vue'
export default Vue.extend({
  name: 'Player',
  components: { PlayerSelector, SongsTableWithScore },
  data() {
    return {
      query: '/players/u001/scores',
      playerId: 'u001',
      page: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    searchByPlayer(playerId) {
      this.page = 1
      this.playerId = playerId
      this.query = '/players/' + this.playerId + '/scores'
      let songsTable: any = this.$refs.songTable
      songsTable.loadSongsByQuery(this.query)
      this.enableLoading()
    },
    async getMore() {
      this.page = this.page + 1
      this.query = '/players/' + this.playerId + '/scores?page=' + this.page
      let songsTable: any = this.$refs.songTable
      let numberOfSongsAdded: number = await songsTable.loadMore(this.query)
      console.log(numberOfSongsAdded)
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
