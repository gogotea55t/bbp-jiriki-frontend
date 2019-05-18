<template>
  <div>
    <div class="field has-addons">
      <div class="control has-icons-left">
        <div class="select">
          <select
            id="search-attr"
            v-model="queryKey"
            name="search-attr"
            @change="queryKeySelectChanged"
          >
            <option value="jiriki">
              地力
            </option>
            <option value="name" selected>
              楽曲名
            </option>
            <option value="contributor">
              投稿者名
            </option>
            <option value="instrument">
              楽器
            </option>
          </select>
        </div>
        <span class="icon is-left">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </span>
      </div>
      <div v-if="!isJirikiRankSelected" class="control is-expanded">
        <input
          id="query-word"
          v-model="query"
          class="input"
          type="text"
          placeholder="みてみて☆こっちっち"
          @keyup.enter="search"
        />
      </div>
      <JirikiSelector
        v-if="isJirikiRankSelected"
        ref="jirikiSelector"
      ></JirikiSelector>
      <div class="control">
        <button id="search-btn" class="button" @click="search">
          検索
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import JirikiSelector from './JirikiSelector.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSearch)
export default Vue.extend({
  name: 'SearchWindow',
  components: { JirikiSelector, FontAwesomeIcon },
  data: function() {
    return {
      isJirikiRankSelected: false,
      queryKey: 'name',
      query: ''
    }
  },
  methods: {
    search: function() {
      let searchQuery = this.queryKey + '=' + this.query
      if (this.isJirikiRankSelected) {
        let jirikiSel: any = this.$refs.jirikiSelector
        searchQuery = this.queryKey + '=' + jirikiSel.$data.jirikiRankSelected
      }
      this.$emit('search-emit', searchQuery)
    },
    queryKeySelectChanged: function() {
      this.isJirikiRankSelected = this.queryKey === 'jiriki'
    }
  }
})
</script>
