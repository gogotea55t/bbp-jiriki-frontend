<template>
  <div :class="modal">
    <div class="modal-background" @click="untoggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          このアカウントでのログインは初めてですか？
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="untoggleModal"
        ></button>
      </header>
      <section class="modal-card-body">
        <player-linkage
          :enable-cancel-button="true"
          @cancel="cancel"
          @settings-changed="untoggleModal"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerLinkage from '../molecules/PlayerLinkage.vue'
import ModalClassObj from '../atoms/ModalClassObj'

export default Vue.extend({
  components: { PlayerLinkage },
  data: function () {
    return {
      modal: new ModalClassObj(),
    }
  },
  methods: {
    cancel() {
      this.untoggleModal()
      alert(
        'ユーザーの連携は後でも行えます。アイコンをクリックしてください。確認画面が何度も出て腹が立つ場合はログアウトしてください。'
      )
    },
    toggleModal() {
      this.modal['is-active'] = true
    },
    untoggleModal() {
      this.modal['is-active'] = false
    },
  },
})
</script>
