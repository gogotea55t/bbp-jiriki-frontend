<template>
  <table class="table">
    <tr>
      <th>地力</th>
      <th>楽曲名</th>
      <th>投稿者名</th>
      <th>楽器名</th>
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
          jirikiRank: '地力Ｓ＋',
          songName: 'カミサマネジマキ',
          contributor: 'ミラ',
          instrument: 'ロックオルガン'
        },
        {
          id: '002',
          jirikiRank: '地力Ｓ＋',
          songName: 'インフェルノ',
          contributor: 'コメの',
          instrument: 'Ｄ・ギター①'
        },
        {
          id: '003',
          jirikiRank: '地力Ｄ',
          songName: 'あいうえおんがく',
          contributor: 'ぼぶ',
          instrument: 'ロックオルガン'
        },
        {
          id: '004',
          jirikiRank: '個人差Ａ＋',
          songName: 'おジャ魔女カーニバル!!',
          contributor: 'ほし',
          instrument: 'Ｅ・ベース'
        },
        {
          id: '005',
          jirikiRank: '地力Ｂ',
          songName: 'Ｖ',
          contributor: 'エメラル',
          instrument: 'Ｅ・ベース'
        },
        {
          id: '006',
          jirikiRank: '地力Ｆ',
          songName: 'マリオ絵描き唄',
          contributor: 'Ｎｉｎｔｅｎｄｏ',
          instrument: '忘れた'
        }
      ]
    }
  }
})
</script>
