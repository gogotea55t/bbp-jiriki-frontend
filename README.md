# bbp-jiriki-frontend
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![](https://travis-ci.com/gogotea55t/bbp-jiriki-frontend.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/gogotea55t/bbp-jiriki-frontend/badge.svg?branch=master)](https://coveralls.io/github/gogotea55t/bbp-jiriki-frontend?branch=master)

> Frontend project for jiriki API.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate

# up json-server
$ yarn json-server
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## 解決したい課題

- 地力表スプレッドシートが重い
  - 表示にもスクロールにも時間がかかる
  - スマホでの表示が特に厳しい
  - 人数が増えてくると比較も難しくなる
- 機能が増やしづらい
  - シートを増やすことで機能を増やすこともできるが、シートの切り替えがめんどうで、結局見なかったりする
- 検索性が低い
  - 曲が追加されてもわかりづらい
- 手作業でやらねばならないことが多い
  - 忘れるし、ついサボってしまう
- 性善説への依存
  - 誰もそんなことしないが、人のデータを勝手にいじることもできる

## システムの構成

![システム構成図](/docs/system02.png)

- Google Sheets API からバックエンドのサーバーが 1 日に 1 回データを取りに行って DB(PostgreSQL か MySQL にする)に反映
- バックエンドのサーバは REST API っぽい返答をする
- フロントエンドが描画
- 更新系の処理が入ってもこの構図は変えないが、スプレッドシートは状況次第では廃止する。
  - スプレッドシートにはスプレッドシートのいいところもあるのでできれば残したい
- スコアを更新すると RabbitMQ を通してスプレッドシートに更新をかけに行く

## 今後の展望

### Phase1 検索に不自由しないものを作る

【終了条件】

- [x] 地力ランク・楽曲名・投稿者名で検索できる
- [x] 楽曲画面が表示できる
  - 楽曲画面にはプレイヤーの得点が表示できる
- [x] ユーザー画面が表示できる
  - [x] ユーザー画面にはそのプレイヤーが取得したスコアの一覧が出る
  - ~~未プレイのものについては表示しない（要検討）~~
- [x] データは 1 日に 1 回スプレッドシートへ取りに行く
- [x] リリース

### Phase2 ログインができる

【終了条件】

- [x] Twitter のアカウントでログインできる
- [x] 認証の基盤については[Auth0](https://auth0.com/jp/)がいいんじゃないかなーと目論見中
- [x] ログインすると自分のユーザー画面に飛ぶようにする
- [x] 地力表でのプレイヤーと Twitter のアカウントの紐づけができるようにする
- [x] 権限管理はこの段階では特にしない

### Phase3 難易度投票ができる

【終了条件】

- どのくらいの地力帯なのかユーザーが投票できる
- 投票結果に応じて手動でシートに反映させる
  - 満場一致であれば自動でもよさそうですが……
- 投票自体はすでに決まっているものに対しても受け付ける
  - 人類は間違えるし、人類は進化する

### Phase4 得点・楽曲の書き込みができる

Phase3 よりも優先させるかも

【終了条件】

- 得点を登録できる
- 新規楽曲を登録できる
- (できれば)パートごとのコメントとかも残せるようにしたい
- 登録が終わると、スプレッドシートにも反映させる
  - Sheets API の権限を「書き込み可能」までにする
  - もしくは、この段階までくると、スプレッドシート自体の廃止もちょっと検討
- 得点については書き込み権限を制限する

### Phase5 譜面傾向データベースを作る

【終了条件】

- 譜面傾向を好き勝手に追加できるデータベースを作る
  - おジャベ、連打……など
- 譜面傾向で検索できるようにする
- (できれば)「この譜面で遊んでいる人はこの譜面もプレイしています」を作る（できるのか？）

## 期限

大合奏!バンドブラザーズの次回作の発売日までに Phase5 に到達させる。

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/gogotea55t"><img src="https://avatars1.githubusercontent.com/u/38799008?v=4" width="100px;" alt=""/><br /><sub><b>gogotea55t</b></sub></a><br /><a href="#design-gogotea55t" title="Design">🎨</a> <a href="#projectManagement-gogotea55t" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/ashcolor"><img src="https://avatars0.githubusercontent.com/u/38287738?v=4" width="100px;" alt=""/><br /><sub><b>あっしゅからー</b></sub></a><br /><a href="#design-ashcolor" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!