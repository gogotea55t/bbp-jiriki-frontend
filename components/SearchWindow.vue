<template>
  <section class="section">
    <div class="field has-addons">
      <div class="select control">
        <select
          id="search-attr"
          v-model="queryKey"
          name="search-attr">
          <option
            value="name"
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
          placeholder="みてみて☆こっちっち"
          @keyup.enter="search">
      </div>
      <div class="control">
        <button
          class="button"
          @click="search">
          検索</button>
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
      queryKey: 'name',
      query: null
    }
  },
  methods: {
    search: function() {
      let searchQuery = this.queryKey + '=' + this.query
      this.$emit('search-emit', searchQuery)
    }
  }
})
</script>
