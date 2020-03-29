<template>
  <div>
    <input
      class="input smallinput"
      type="text"
      v-tooltip="{
        content: tooltipMsg,
        show: showTooltip,
        trigger: 'manual'
      }"
      @keyup.enter="submitScore"
      @focus="triggerTooltip"
      @blur="triggerTooltip"
      v-model="scoreForm"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import axios from 'axios'

Vue.use(VTooltip)
export default Vue.extend({
  props: {
    score: { default: null, type: Number },
    songId: { default: null, type: String },
    userId: { default: null, type: String }
  },
  data() {
    return {
      showTooltip: false,
      /**
       * propsを直接触らないようにするために設定
       */
      scoreForm: this.score,
      submitMsg: ''
    }
  },
  computed: {
    tooltipMsg(): string {
      if (this.submitMsg) {
        return this.submitMsg
      }
      if (this.scoreIsValid) {
        return 'エンターキーで登録します'
      } else {
        return '0~100の半角数字を入力ください'
      }
    },
    /**
     * scoreが登録可能(0～100の半角数字)な時true
     */
    scoreIsValid(): boolean {
      if (
        this.scoreForm &&
        this.scoreForm.toString().match('^((100)|[1-9]?[0-9])$')
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    submitScore(): void {
      if (this.scoreIsValid) {
        const body = {
          userId: this.userId,
          songId: this.songId,
          score: this.scoreForm
        }
        axios
          .put(process.env.apiBaseUrl + '/v1/scores', body)
          .then(response => {
            this.submitMsg = '登録OK！'
            this.$emit('score-submitted', this.scoreForm)
          })
          .catch(error => {
            this.submitMsg = '登録失敗です。。。'
            console.log(error)
          })
      }
    },
    triggerTooltip(): void {
      this.showTooltip = !this.showTooltip
      this.submitMsg = ''
    }
  }
})
</script>

<style>
.smallinput {
  width: 40px;
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
  z-index: 1;
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
.tooltip[x-placement^='right'] {
  margin-left: 5px;
}
.tooltip[x-placement^='right'] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^='left'] {
  margin-right: 5px;
}
.tooltip[x-placement^='left'] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}
.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}
.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>