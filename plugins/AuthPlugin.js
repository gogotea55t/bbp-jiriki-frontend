import { domain, clientId } from '../auth_config.json'
import { Auth0Plugin } from './AuthService'
import Vue from 'vue'

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    console.log(appState)
  }
})
