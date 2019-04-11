<template>
  <div>
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="../">
            Bulma
          </a>
          <div class="navbar-burger burger" data-target="topNav">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="topNav" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="cover.html">Home</a>
            <a class="navbar-item" href="/songlist">楽曲一覧</a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-small">
                    <span class="icon">
                      <i class="fa fa-user-plus"></i>
                    </span>
                    <span>
                      Register
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-small is-info is-outlined">
                    <span class="icon">
                      <i class="fa fa-user"></i>
                    </span>
                    <span>Login</span>
                  </a>
                </p>
              </div>
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
                    href="https://github.com/dansup/bulma-templates"
                  >
                    Bulma Templates
                  </a>
                  <span class="tag is-light">Daniel Supernault</span>
                </div>
              </div>
              <div class="control">
                <div class="tags has-addons">
                  <a class="tag is-link">The source code is licensed</a>
                  <span class="tag is-light">
                    MIT &nbsp;<i class="fa fa-github"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

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
</style>
