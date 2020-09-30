# daily-necessities
## アプリケーション概要
- 近隣の便利な情報を纏めて表示するアプリケーション

## 技術概要
- Nuxt.jsを使用したSPA
- CircleCI + Firebaseによる自動ホスティング設定

## 機能詳細
### 近隣駅表示
- Geolocation APIを利用し現在地の緯度経度を取得
- [HeartRails Express API](http://express.heartrails.com/api.html#nearest)に緯度経度の情報をパラメータとして渡し、近隣の駅（3つまで）を取得
- 駅名および現在地からの距離、路線名を表示
- 遅延情報の表示については今後対応
### ランチ営業店表示
- [ぐるなびAPI](http://express.heartrails.com/api.html#nearest)に緯度経度の情報および各種プロパティを渡し、ランチ営業店を取得。
- スライドリスト形式で表示
- 300m 500m 1km で絞り込み検索可能
- アニメーションはtransitionGroupを使用
### 大手カフェチェーン表示
- [ぐるなびAPI](http://express.heartrails.com/api.html#nearest)に緯度経度の情報および各種プロパティを渡し、カフェのリストを取得。
- wifiとコンセントが高確率である大手チェーン店に一致するものに絞り表示。
### カフェチェーンマップ表示
- nuxt-leafletを用いて地図上に大手カフェチェーン店をプロット

## 今後実装
- Firebase Authを使った認証機能