<template>
  <div v-if="profile">
    <div>
      <div>
        <img :src="profile.picture" />
      </div>
      <div>
        <h2>{{ profile.name }}</h2>
        <p>{{ profile.userId }}</p>
      </div>
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

export default Vue.extend({
  name: 'UserInfo',
  components: { PlayerLinkage },
  data() {
    return {
      profile: this.$auth.user
    }
  },
  methods: {}
})
</script>
