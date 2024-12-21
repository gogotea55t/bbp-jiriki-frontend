<template>
  <button class="button is-info is-small">
    <font-awesome-icon icon="user"></font-awesome-icon>
    ログイン
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser as IconDefinition)
export default Vue.extend({
  name: 'LoginButton',
  components: { FontAwesomeIcon },
})
</script>
