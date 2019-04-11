<template>
  <div>
    <search-window @search-emit="search" />
    <table class="table is-stripe is-hoverable">
      <thead>
        <tr>
          <th>地力</th>
          <th>楽曲名</th>
          <th>投稿者名</th>
          <th>楽器名</th>
        </tr>
      </thead>
      <tbody>
        <SongCol v-for="song in songs" :key="song.songId" :song="song" />
      </tbody>
    </table>
    <img id="songlist-loader" src="~/static/loading.gif" alt="now loading..." />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../components/SongCol.vue'
import SearchWindow from '../components/SearchWindow.vue'
import Songs from '../components/Songs'
import axios from 'axios'

export default Vue.extend({
  components: { SongCol, SearchWindow },
  data: function() {
    return {
      songs: new Array<Songs>(),
      page: 0,
      query: '/songs?'
    }
  },
  async asyncData(context) {
    let url = process.env.apiBaseUrl + '/songs'
    let songsResponse: Array<Songs> = await axios
      .get<Array<Songs>>(url)
      .then(response => {
        return response.data.map(s => {
          return new Songs(
            s.songId,
            s.jirikiRank,
            s.songName,
            s.contributor,
            s.instrument
          )
        })
      })
      .catch(error => {
        console.log(error)
        return []
      })

    return {
      songs: songsResponse
    }
  },
  mounted: function() {
    this.page += 1
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getMore: async function() {
      let more = await axios
        .get(process.env.apiBaseUrl + this.query + '&page=' + this.page)
        .then(response => {
          if (response.data.length > 0) {
            response.data.forEach(element => {
              this.songs.push(
                new Songs(
                  element.songId,
                  element.jirikiRank,
                  element.songName,
                  element.contributor,
                  element.instrument
                )
              )
            })
            // 諸々済んだら再びスクロールを検知するイベントリスナーを追加
            window.addEventListener('scroll', this.handleScroll)

            this.page += 1
          } else {
            // 空のデータしか返ってこなかった場合、ローディング画像を消す
            let loaderImage = document.getElementById('songlist-loader')
            if (loaderImage !== null) {
              loaderImage.style.display = 'none'
            }
          }
        })
        .catch(error => {
          console.log(error)
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
    async search(searchQuery) {
      this.enableLoading()
      this.query = '/songs?' + searchQuery
      this.songs = []
      console.log(this.query)
      let searchResult = await axios
        .get(process.env.apiBaseUrl + this.query)
        .then(response => {
          console.log(response)
          this.page = 1
          this.songs = response.data.map(s => {
            return new Songs(
              s.songId,
              s.jirikiRank,
              s.songName,
              s.contributor,
              s.instrument
            )
          })
          if (response.data.length < 20) {
            this.disableLoading()
          }
        })
    }
  }
})
</script>
