<template>
  <div class="container">
    <table class="table">
      <tr>
        <th>地力</th>
        <th>楽曲名</th>
        <th>投稿者名</th>
        <th>楽器名</th>
      </tr>
      <SongCol v-bind="song"/>
    </table>
    <table class="table">
      <tr>
        <th>プレイヤー</th>
        <th>得点</th>
      </tr>
      <tr
        v-for="score in scores"
        :key="score.id">
        <td>{{ score.userName }}</td>
        <td>{{ score.score }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../../components/SongCol.vue'
export default Vue.extend({
  components: { SongCol },
  data: function() {
    return {
      id: this.$route.params.id,
      song: null,
      scores: null
    }
  },
  mounted() {
    this.song = {
      id: this.id,
      jirikiRank: '地力Ｓ＋',
      songName: 'カミサマネジマキ',
      contributor: 'ミラ',
      instrument: 'ロックオルガン'
    }
    this.scores = [
      {
        id: '001',
        userName: '妖怪Ａ',
        score: 99
      },
      {
        id: '002',
        userName: '妖怪Ｂ',
        score: 98
      }
    ]
  }
})
</script>
