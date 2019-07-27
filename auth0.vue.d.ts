import Vue from 'vue'
import { AuthService } from 'plugins/AuthService'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthService
  }
}
