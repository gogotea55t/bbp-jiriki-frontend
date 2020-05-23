<template>
  <div v-if="profile">
    <div>
      <div>
        <img :src="profile.picture" />
      </div>
      <div>
        <h2>{{ profile.name }}</h2>
      </div>
    </div>
    <div>
      <h3>統計情報</h3>
      <user-stats />
    </div>
    <div>
      <h2>プレイヤーの選択</h2>
      <player-linkage />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayerLinkage from '../components/molecules/PlayerLinkage.vue'
import UserStats from '../components/organisms/UserStats.vue'

export default Vue.extend({
  name: 'UserInfo',
  components: { PlayerLinkage, UserStats },
  data() {
    return {
      profile: this.$auth.user
    }
  },
  methods: {}
})
</script>
