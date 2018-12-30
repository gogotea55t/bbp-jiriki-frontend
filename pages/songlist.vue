<template>
  <table class="table">
    <tr>
      <th>地力</th>
      <th>楽曲名</th>
      <th>投稿者名</th>
      <th>楽器名</th>
    </tr>
    <tr
      v-for="song in songs"
      :key="song.id">
      <td>{{ song.jirikiRank }}</td>
      <td>{{ song.songName }}</td>
      <td>{{ song.contributor }}</td>
      <td>{{ song.instrument }}</td>
    </tr>
    <SongCol
      v-for="song in songs"
      v-bind="song"
      :key="song.id"/>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../components/SongCol.vue'

export default Vue.extend({
  components: { SongCol },
  data: function() {
    return {
      songs: [
        {
          id: '001',
          jirikiRank: '地力S+',
          songName: 'カミサマネジマキ',
          contributor: 'ミラ',
          instrument: 'ロックオルガン'
        },
        {
          id: '002',
          jirikiRank: '地力S+',
          songName: 'インフェルノ',
          contributor: 'コメの',
          instrument: 'Ｄ・ギター①'
        }
      ]
    }
  }
})
</script>
