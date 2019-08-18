<template>
  <div>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    handleLoginEvent(data) {
      this.$router.push(data.state.target || '/')
    }
  },
  created() {
    this.$auth.handleAuthentication()
  }
})
</script>
