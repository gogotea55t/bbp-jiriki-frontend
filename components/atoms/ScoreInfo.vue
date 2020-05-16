<template>
  <div>
    <v-popover
      trigger="hover"
      popover-class="tooltip"
      @show="changeTooltip(true)"
      @hide="changeTooltip(false)"
    >
      <div style="white-space: nowrap;">
        <span class="tag">BEST:&nbsp;{{ max }}</span>
        <font-awesome-icon
          v-if="score >= max"
          :icon="['fa', 'medal']"
          class="color-gold"
        ></font-awesome-icon>
      </div>
      <div style="white-space: nowrap;">
        <span class="tag color-silver">AVG&nbsp;:&nbsp;{{ average }}</span>
        <font-awesome-icon
          v-if="score >= average"
          :song-id="songId"
          :icon="['fa', 'medal']"
          class="color-silver"
        ></font-awesome-icon>
      </div>
      <template slot="popover">
        <tops :is-tooltip-show="isTooltipShow" :song-id="songId" />
      </template>
    </v-popover>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import VTooltip from 'v-tooltip'
import Tops from '../atoms/Tops.vue'
import { VPopover } from 'v-tooltip'

library.add(faMedal)

export default Vue.extend({
  name: 'ScoreInfo',
  components: { FontAwesomeIcon, Tops, VPopover },
  props: {
    songId: {
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    average: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isTooltipShow: false
    }
  },
  methods: {
    changeTooltip: function(bool) {
      this.isTooltipShow = bool
    }
  }
})
</script>

<style>
.color-gold {
  color: #dbb400;
}
.color-silver {
  color: #9fa0a0;
}
.color-copper {
  color: #c47022;
}
.tooltip {
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 10000;
}
.tooltip[x-placement^='top'] {
  margin-bottom: 5px;
}
.tooltip[x-placement^='top'] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^='bottom'] {
  margin-top: 5px;
}
.tooltip[x-placement^='bottom'] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip.popover .popover-inner {
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
</style>
