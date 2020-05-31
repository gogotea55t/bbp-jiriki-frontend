<template>
  <section>
    <h1>大合奏！バンドブラザーズＰ☆10地力表</h1>
    <article class="post">
      <div class="content">
        <h2>地力表とは</h2>
        <ul>
          <li>
            大合奏！バンドブラザーズPというゲームの難易度☆10の楽曲には、<br />簡単なものから並みの人間には攻略が困難なものまで幅広く存在します。
          </li>
          <li>
            地力表では、☆10において90点を取る難易度を評価し、各プレイヤーの得点を管理します。
          </li>
          <li>
            誰かが90点を取った曲をのせていますが、一部そうでないものもあります。（求90）
          </li>
          <li>ドラムとギターコードは含まれません。</li>
        </ul>
      </div>
    </article>
    <article class="post">
      <div class="content">
        <h2>このページについて</h2>
        <ul>
          <li>
            スプレッドシートから1日に1回データを取得し、取得した内容を表示します。
          </li>
          <li>
            このページからデータの更新は一部できません。得点以外の情報は
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
      <h2>更新履歴</h2>
      <table class="table">
        <thead>
          <tr>
            <th>バージョン</th>
            <th>日付</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>v0.2.1</td>
            <td>2020/5/17</td>
            <td>
              最高得点と平均点を常に表示するようにしました。<br />
              マウスカーソルを当てると上位3名のスコアが出るようになりました。
            </td>
          </tr>
          <tr>
            <td>v0.2.0</td>
            <td>2020/5/6</td>
            <td>
              スコアの登録ができるようになりました。<br />
              得点計算機の追加もしました。
            </td>
          </tr>
          <tr>
            <td>v0.1.3</td>
            <td>2020/2/16</td>
            <td>プライバシーポリシーを追加しました。</td>
          </tr>
          <tr>
            <td>v0.1.1</td>
            <td>2020/2/9</td>
            <td>平均点の表示ができるようになりました。</td>
          </tr>
          <tr>
            <td>v0.1.0</td>
            <td>2019/2/2</td>
            <td>ログインに対応しました。</td>
          </tr>
          <tr>
            <td>v0.0.3</td>
            <td>2019/7/7</td>
            <td>
              楽曲をモーダルで表示できるようにしました。
              <br />Twitterシェア機能を追加しました。
            </td>
          </tr>
          <tr>
            <td>v0.0.2</td>
            <td>2019/6/23</td>
            <td>URLの調整をしました</td>
          </tr>
          <tr>
            <td>v0.0.1</td>
            <td>2019/6/16</td>
            <td>公開しました</td>
          </tr>
        </tbody>
      </table>
    </article>
    <article class="post">
      <div class="content">
        <h2>関連リンク</h2>
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
