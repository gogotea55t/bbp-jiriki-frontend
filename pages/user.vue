<template>
  <div v-if="profile">
    <div>
      <div>
        <img :src="profile.picture" @click="view" />
      </div>
      <div>
        <h2>{{ profile.name }}</h2>
        <p>{{ profile.userId }}</p>
      </div>
    </div>

    <div>
      <pre>{{ JSON.stringify(profile, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'userInfo',
  data() {
    return {
      profile: this.$auth.profile
    }
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile
    },
    view() {
      console.log(this.profile)
    }
  }
})
</script>
