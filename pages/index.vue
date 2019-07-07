<template>
  <section>
    <article class="post">
      <div class="content">
        <h2>大合奏！バンドブラザーズＰ☆10地力表</h2>
        <ul>
          <li>☆10において90点を取る難易度を評価します。</li>
          <li>
            誰かが90点を取った曲をのせていますが、一部そうでないものもあります。（求90）
          </li>
          <li>ドラムとギターコードは含まれません。</li>
        </ul>
      </div>
    </article>
    <article class="post">
      <div class="content">
        <h4>このページについて</h4>
        <ul>
          <li>
            スプレッドシートから1日に1回データを取得し、取得した内容を表示します。
          </li>
          <li>
            このページからデータの更新は(まだ)できません。得点などの更新は
            <a
              href="https://docs.google.com/spreadsheets/d/1YBCP7kBrhCha5v8RRklTwXs0rbS437EG1yLNdwFm634/edit#gid=0"
            >
              スプレッドシート
            </a>
            から編集してください。
          </li>
          <li>得点欄に数字以外が書いてあるものは反映されません。</li>
        </ul>
      </div>
    </article>
    <article class="post">
      <div class="content">
        <h4>関連リンク</h4>
        <ul>
          <li>
            <a
              href="https://docs.google.com/spreadsheets/d/1YBCP7kBrhCha5v8RRklTwXs0rbS437EG1yLNdwFm634/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              大合奏！バンドブラザーズＰ☆10地力表スプレッドシート
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/spreadsheets/d/1ytTkiJmK6mlhgGrp3C8eGBDdC3zTemsOL3tCDle5CP4/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              大合奏！バンドブラザーズＰ☆10ドラム難易度表
            </a>
          </li>
          <li>
            <a
              href="https://docs.google.com/spreadsheets/d/1mGRtvWVigp9HKqv5II504fdoze5pMT08JnOKaj8-1eM/edit#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              大合奏！バンドブラザーズＰギターコード難易度表
            </a>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Index',
  head() {
    const BASE_URL: String = process.env.baseUrl || ''
    return {
      title: '大合奏！バンドブラザーズP☆10地力表',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '大合奏！バンドブラザーズPにおける☆10の難易度とスコアを管理するページです。'
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@bbp10_jiriki' },
        {
          hid: 'og:url',
          property: 'og:url',
          content: BASE_URL + '/'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '大合奏！バンドブラザーズP☆10地力表'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            '大合奏！バンドブラザーズPにおける☆10の難易度とスコアを管理するページです。'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: BASE_URL + '/favicon.ico'
        }
      ]
    }
  }
})
</script>
