<template>
  <img
    v-if="hasNextPageToLoad"
    id="songlist-loader"
    src="~/static/loading.gif"
    alt="now loading..."
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SongLoader',
  props: {
    /**
     * 読み込むべき次のページがあるときtrue
     * 最後にしたリクエストの応答が20件以下になるとfalseになる
     */
    hasNextPageToLoad: {
      type: Boolean,
      default: true
    },
    /**
     * 読み込み中なときtrue(二重通信を防ぐ目的で導入)
     */
    isFetchOnProgress: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * スクロールイベントに応じて曲の読み込みをしてほしいときtrue
     * 読み込むべきページがあって、かつ読み込み中ではないとき
     */
    scrollEventIsWorking: function(): boolean {
      return this.hasNextPageToLoad && !this.isFetchOnProgress
    }
  },
  mounted: function() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: function() {
      if (this.scrollEventIsWorking) {
        /**
         * ローディング画像
         * DOMのIDで要素が見つからなかったときはローディングしないようにする
         */
        const loaderImage = document.getElementById('songlist-loader') || {
          offsetTop: Number.MAX_VALUE
        }

        /**
         * ローディング画像の画面内での位置
         */
        const loaderImagePosition = loaderImage.offsetTop

        /**
         * 現在スクロールされている画面の上端の位置
         */
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop

        /**
         * 画面自体の高さ
         */
        const clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight

        /**
         * 現在スクロールされている画面の下端の位置
         */
        const scrollBottom = clientHeight + scrollTop
        if (scrollBottom > loaderImagePosition) {
          this.$emit('load-more', true)
        }
      }
    }
  }
})
</script>
