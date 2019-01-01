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
        <ScoreStyle :score="score.score"/>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SongCol from '../../components/SongCol.vue'
import ScoreStyle from '../../components/ScoreStyle.vue'
export default Vue.extend({
  components: { SongCol, ScoreStyle },
  data: function() {
    return {
      id: this.$route.params.id,
      song: {
        songId: this.$route.params.id,
        jirikiRank: '地力Ｓ＋',
        songName: 'カミサマネジマキ',
        contributor: 'ミラ',
        instrument: 'ロックオルガン'
      },
      scores: [
        {
          id: '001',
          userName: '妖怪Ａ',
          score: 100
        },
        {
          id: '002',
          userName: '妖怪Ｂ',
          score: 98
        },
        {
          id: '003',
          userName: 'やや妖怪',
          score: 82
        },
        {
          id: '004',
          userName: 'ふつうの人',
          score: 64
        }
      ]
    }
  }
})
</script>
