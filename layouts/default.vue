<template>
  <div>
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <nuxt-link to="/">
              大合奏！バンドブラザーズ☆10 地力表
            </nuxt-link>
          </a>
          <div class="navbar-burger burger" data-target="topNav">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="topNav" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              <nuxt-link to="/songlist">
                <font-awesome-icon icon="music"></font-awesome-icon>
                楽曲から探す
              </nuxt-link>
            </a>
            <a class="navbar-item">
              <nuxt-link to="/player">
                <font-awesome-icon icon="users"></font-awesome-icon>
                プレイヤーから探す
              </nuxt-link>
            </a>
            <a
              class="navbar-item"
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.google.com/spreadsheets/d/1YBCP7kBrhCha5v8RRklTwXs0rbS437EG1yLNdwFm634/edit#gid=0"
            >
              <font-awesome-icon icon="table"></font-awesome-icon>
              スプレッドシートへ
            </a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped" v-if="!$auth.loading">
                <p class="control" @click="login" v-if="!$auth.isAuthenticated">
                  <Login-Button />
                </p>
                <p class="control" v-if="$auth.isAuthenticated">
                  <nuxt-link to="/user">
                    <img :src="$auth.user.picture" />
                  </nuxt-link>
                </p>
                <p class="control" @click="logout" v-if="$auth.isAuthenticated">
                  <button class="button is-small">ログアウト</button>
                </p>
              </div>
              <div v-if="$auth.loading">ロード中。。。</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <aside class="menu"></aside>
        </div>
        <div class="column is-9">
          <div class="box content">
            <nuxt />
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <div class="columns is-mobile is-centered">
            <div class="field is-grouped is-grouped-multiline">
              <div class="control">
                <div class="tags has-addons">
                  <a
                    class="tag is-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/dansup/bulma-templates"
                  >
                    Bulma Templates
                  </a>
                  <span class="tag is-light">Daniel Supernault</span>
                </div>
              </div>
              <div class="control">
                <a
                  class="tag is-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/gogotea55t/bbp-jiriki-frontend"
                >
                  <font-awesome-icon
                    :icon="['fab', 'github']"
                  ></font-awesome-icon>
                  Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Auth0Plugin } from '~/plugins/AuthService'
import {
  faHome,
  faMusic,
  faUsers,
  faTable
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LoginButton from '../components/atoms/LoginButton.vue'

library.add(faHome)
library.add(faMusic)
library.add(faUsers)
library.add(faTable)
library.add(faGithub)

Vue.config.productionTip = false

export default Vue.extend({
  components: { FontAwesomeIcon, LoginButton },
  mounted() {
    let burger: any = document.querySelector('.burger')
    let menu: any = document.querySelector('#' + burger.dataset.target)
    burger.addEventListener('click', function() {
      burger.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    })
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    }
  }
})
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: calc(10px + 0.25vw);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
html,
body {
  background: #f2f6fa;
}
footer {
  background-color: #f2f6fa !important;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}
section.section {
  padding: 1.5rem 0.5rem;
}
</style>
