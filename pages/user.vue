<template>
  <div v-if="profile">
    <h1>ユーザー情報</h1>
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img :src="profile.picture" />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">
              {{ profile.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <article v-if="this.$store.state.auth.loginUserId">
      <h3>統計情報</h3>
      <user-stats />
    </article>
    <hr />
    <article v-if="!this.$store.state.auth.loginUserId">
      <h2>プレイヤーの選択</h2>
      <player-linkage />
    </article>
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
      profile: this.$auth.user,
    }
  },
  methods: {},
})
</script>
