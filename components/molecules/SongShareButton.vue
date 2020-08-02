<template>
  <div v-if="buttonIsVisible">
    <a
      :href="
        'https://twitter.com/intent/tweet?text=' +
          songIdentifier +
          '%20-%20大合奏！バンドブラザーズP☆10地力表' +
          '&url=https://bbp10-jiriki.cf/songs/' +
          songId +
          '&via=bbp10_jiriki'
      "
      target="_blank"
    >
      <button class="button twitter-btn">
        <font-awesome-icon :icon="['fab', 'twitter']"> </font-awesome-icon>
        Twitterでシェア
      </button>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
library.add(faTwitter)
export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    songId: {
      type: String,
      default: '',
    },
    songIdentifier: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonIsVisible: function () {
      // 楽曲情報の読み込みが終わってからボタンを表示したい
      return this.songIdentifier !== ''
    },
  },
})
</script>

<style scoped>
.twitter-btn {
  background-color: #55acee;
  background: #55acee;
  color: white;
}
</style>
