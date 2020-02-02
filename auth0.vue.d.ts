import Vue from 'vue'
import { useAuth0 } from 'plugins/AuthService'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: any
  }
}
