# contributor向けガイド
## Branchの運用

Branchは以下のルールで回しています。
* master：　最新のソースコードを管理する
* release：　本番環境で動いているコードを管理する
* #IssueNo-xxxx：　Issueを解決するためのコードを管理する

したがって、運用としては以下のような感じです。
* Issueを解決しようと思ったら、masterからbranchを切ってmasterにマージする
* 本番環境にリリースするときは、タグをつけて、masterブランチからreleaseブランチにマージ
* 開発途中に本番環境でヤバめの不具合が見つかったときはreleaseブランチから切って修正し、その後masterにもマージ
  （あんまり何度もやってないです）

## Commitに当たってのお願い

[こちらのサイト](https://qiita.com/numanomanu/items/45dd285b286a1f7280ed)と、
[この規約](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)に基づき、
各Commitにはプレフィックスを付けています。以下のルールです。
* feat: 機能の追加
* fix: バグの修正
* docs: ドキュメントだけの変更
* style: コードのスタイルだけの変更 (空白やセミコロンを消す……etc)
* refactor: 機能は変えないけれども今後を見越してリファクタリングしたとき
* perf: 機能は変えないけれども性能を高めた時
* test: テストコードの修正をしたとき
* chore: ライブラリに何か追加した時

このルールに沿っていただきたく考えております。重ね掛けはOKです。
(e.g.)
* feat: 楽曲追加機能を実装
* test: feat: 楽曲追加機能のテストを実装
* test: fix: バリデーションがうまくいかない不具合のテストを修正

## 継続的インテグレーション
[Travis-ci](https://travis-ci.com/)を使っています。
* テストの実行(Travis-ci)
* テストカバレッジの測定(Coveralls)、下がると「失敗」になります
* APIキーなどヤバいファイルをコミットしてないかチェック(GitGuardian)

masterブランチはビルド成功の状態にキープしておきたいので、ご協力をお願いします。

## frontendのディレクトリ構成

基本的にはnuxt.jsのディレクトリ構成そのままです。
```
├─assets
├─components
│  ├─atoms
│  │  └─__test__
│  ├─molecules
│  │  └─__test__
│  ├─organisms
│  │  └─__test__
│  └─types
├─docs
├─layouts
├─middleware
├─pages
│  ├─songs
│  │  └─__test__
│  ├─__stubs__
│  └─__test__
├─plugins
├─static
└─store
```

componentsの配下のみ、atoms, molecules, organisms, typesに分けています。[Atomic Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B/)の考えに沿って振り分けたつもりですが、そうでもなくなってきています。

## APIドキュメント
[こちら](https://documenter.getpostman.com/view/11301522/Szmb8LTh?version=latest#fa5d028d-8e9a-4248-ab06-a8c472812c64)です。
