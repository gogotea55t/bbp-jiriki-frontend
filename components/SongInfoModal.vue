<template>
  <div :class="modal">
    <div class="modal-background" @click="untoggleModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          スコア情報
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="untoggleModal"
        ></button>
      </header>
      <section class="modal-card-body">
        <SongInfo :song-id="modalSongId"></SongInfo>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">
          シェア
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongInfo from '../components/SongInfo.vue'

export class ModalClassObj {
  'is-active': boolean
  modal: boolean
  constructor() {
    this['is-active'] = false
    this.modal = true
  }
}

export default Vue.extend({
  components: { SongInfo },
  data: function() {
    return {
      modalSongId: '',
      modal: new ModalClassObj()
    }
  },
  methods: {
    toggleModal(emittedSongId) {
      this.modalSongId = emittedSongId
      this.modal['is-active'] = true
    },
    untoggleModal() {
      this.modal['is-active'] = false
    }
  }
})
</script>
