<template>
  <div>
    <div v-if="!tops.empty" class="tooltip-content">
      <div v-for="first in tops.top" :key="first.userId">
        <font-awesome-icon
          :icon="['fa', 'crown']"
          class="color-gold"
        ></font-awesome-icon>
        {{ first.score }} {{ first.userName }}
      </div>
      <div v-for="second in tops.second" :key="second.userId">
        <font-awesome-icon
          :icon="['fa', 'crown']"
          class="color-silver"
        ></font-awesome-icon>
        {{ second.score }} {{ second.userName }}
      </div>
      <div v-for="third in tops.third" :key="third.userId">
        <font-awesome-icon
          :icon="['fa', 'crown']"
          class="color-copper"
        ></font-awesome-icon>
        {{ third.score }} {{ third.userName }}
      </div>
    </div>
    <span v-else class="loading-text">Loading...</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Tops from '../types/Tops'
import PlayerScore from '../types/PlayerScore'

library.add(faCrown)

export default Vue.extend({
  name: 'Tops',
  components: { FontAwesomeIcon },
  props: {
    isTooltipShow: {
      type: Boolean,
      default: false,
    },
    songId: {
      type: String,
      default: '',
    },
  },
  data: function () {
    return {
      tops: new Tops([], [], []),
    }
  },
  watch: {
    isTooltipShow(val) {
      if (val) {
        this.loadInfo(this.songId)
      }
    },
  },
  methods: {
    async loadInfo(id) {
      try {
        let topsResponse = await axios
          .get(process.env.apiBaseUrl + '/v2' + '/songs/' + id + '/top')
          .then((response) => {
            const topData: Tops = response.data
            this.$data.tops = topData
            return
          })
      } catch (error) {
        const errMsg = 'サーバーとの通信に失敗しました'
        this.$nuxt.error({ statusCode: 500, message: errMsg })
      }
    },
  },
})
</script>
<style scoped>
.loading-text {
  color: white;
}
</style>
