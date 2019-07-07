<template>
  <div id="song-info-modal" :class="modal">
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
        <SongInfo :song-id="modalSongId" @song-loaded="songLoaded"></SongInfo>
      </section>
      <footer class="modal-card-foot">
        <song-share-button
          :song-id="modalSongId"
          :song-identifier="modalSongIdentifier"
        />
        <button class="button is-pulled-right" @click="untoggleModal">
          閉じる
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongInfo from '../components/SongInfo.vue'
import SongShareButton from '../components/SongShareButton.vue'

export class ModalClassObj {
  'is-active': boolean
  modal: boolean
  constructor() {
    this['is-active'] = false
    this.modal = true
  }
}

export default Vue.extend({
  components: { SongInfo, SongShareButton },
  data: function() {
    return {
      modalSongId: '',
      modalSongIdentifier: '',
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
      this.modalSongId = ''
      this.modalSongIdentifier = ''
    },
    songLoaded(songIdentifierEmitted) {
      this.modalSongIdentifier = songIdentifierEmitted
    }
  }
})
</script>
