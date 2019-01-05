<template>
  <section class="section">
    <div class="field has-addons">
      <div class="select control">
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
      <div class="control is-full-width">
        <input
          v-model="query"
          class="input"
          type="text"
          placeholder="みてみて☆こっちっち">
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
