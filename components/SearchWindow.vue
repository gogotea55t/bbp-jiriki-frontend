<template>
  <section class="section columns">
    <div class="column is-one-quarter">
      <div class="control select">
        <select
          id="search-attr"
          name="search-attr">
          <option
            value="songName"
            selected>楽曲名</option>
          <option
            value="contributor">投稿者名</option>
          <option
            value="instrument">楽器</option>
        </select>
      </div>
    </div>
    <div class="column is-half">
      <div class="control">
        <input
          v-model="query"
          class="input"
          type="text">
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SearchWindow',
  data: function() {
    return {
      query: null
    }
  }
})
</script>
