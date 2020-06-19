<template>
	<div class="lunch-library">
		<div class="lunch-library-header">
			Lunch Library
		</div>
		<div class="lunch-library-contents">
			<div class="lunch-library-contents-top">
				<div class="lunch-library-contents-top-title">現在地から近いランチ営業店</div>
        <div class="lunch-library-contents-top-distance">
          <ul>
            <li>300m</li>
            <li class="selected">500m</li>
            <li>1km</li>
          </ul>
        </div>
			</div>
      <div class="lunch-library-contents-main"></div>
      <div class="lunch-library-contents-footer">
        Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパー Webサービス</a>
      </div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted(){
			//近隣駅情報取得
			// this.getStation()
		},
		components: {
		},
		data(){
			return {
				location: {
					latitude: this.$store.state.location.latitude,
					longitude: this.$store.state.location.longitude
				},
				stations: [],
				stationNames: [],
				selectedStation: {},
				selectedIndex: 1,
				load: true
			}
		},
		methods: {
			//近隣駅取得メソッド
			async getStation() {
				if (process.client) {
					if (!navigator.geolocation) {
						alert('現在地情報を取得できませんでした。')
						return
					}

					this.location = await this.getPosition()
					this.$store.dispatch('trainInfo/updateStationAction', this.location)
				}
			},
			//geolocation
			getPosition() {
				return new Promise((resolve, reject) => {
					// 現在地を取得
					navigator.geolocation.getCurrentPosition(
						// 取得成功した場合
						(position) => {
							const location = {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							}
							resolve(location);
						},
						// 取得失敗した場合
						(error) => {
							switch (error.code) {
								case 1: //PERMISSION_DENIED
									alert("位置情報の利用が許可されていません");
									break;
								case 2: //POSITION_UNAVAILABLE
									alert("現在位置が取得できませんでした");
									break;
								case 3: //TIMEOUT
									alert("タイムアウトになりました");
									break;
								default:
									alert("その他のエラー(エラーコード:" + error.code + ")");
									break;
							}
							reject(error.code);
						}
					);
				});
			}, 
			selectUp(){
				const head = this.stationNames.shift()
				this.stationNames.push(head)
				this.selectedIndex = (this.selectedIndex +1) % 3
				this.selectedStation = this.stations[this.selectedIndex]
			},
			selectDown(){
				const tail = this.stationNames.pop()
				this.stationNames.unshift(tail)
				this.selectedIndex = this.selectedIndex >= 1 ? (this.selectedIndex - 1) % 3 : 3 + ((this.selectedIndex - 1) % 3)
				this.selectedStation = this.stations[this.selectedIndex]
			}
		},
		computed: {
			//storeの駅情報が変更される度に発火
			updateStaions() {
				if(this.load){
					let stations = []
					let stationNames = []
					const result = this.$store.state.trainInfo.stations
					//駅名の重複排除
					const names = result.map(item => item.name).filter((value, index, self) => self.indexOf(value) == index)
					//同じ駅名の路線を集約してハッシュを作成
					for (let i in names) {
						var stationInfo = {
							name: names[i],
							train: result.filter(({name}) => name === names[i])
						}
						stations.push(stationInfo)
						stationNames.push(names[i])
					}
					this.selectedStation = stations[1]
					//駅名が3個ならロード完了
					this.load = stationNames.length == 3 ? false : true 

					this.stations = stations
					this.stationNames = stationNames
				}
				return this.stationNames
			}
		}
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
.lunch-library{
	width: 100%;
	height: 100%;
	&-header{
		width: 100%;
		height: 50px;
		background-color: $black;
		color: $white;
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
		font-size: 25px;
		padding-top: 12px;
	}
	&-contents{
		width: 100%;
		height: calc(100% - 50px);
		font-family: 'Noto Sans JP', sans-serif;
    font-weight: 500;
    padding:10px;
    position: relative;
		&-top{
			width: 100%;
			height: 10%;
			float: left;
			position: relative;
      @include clearfix;
      // float: left;
			&-title{
				// height: 20px;
				width: calc(30%);
				text-align: left;
				font-size: 12px;
        color: $gray;
        float: left;
			}
      &-distance{
        width: 60%;
        float: right;
        ul{
          list-style: none;
          float: right;
          @include clearfix;
          li{
            font-size: 13px;
            display: inline-block;
            width: 70px;
            padding: 3px;
            box-shadow: 0 0 5px #D2D2D2;
            color: $gray;
            transition: .3s;
            &:hover{
              background-color: $lightGray;
            }
          }
          .selected{
            color: $white;
            background-color: $gray;
            &:hover{
              background-color: $gray;
            }
          }
        }
      }
		}
    &-main{
      height: 80%;
      
    }
    &-footer{
      height: 10%;
      color: $lightGray;
      font-size: 10px;
      position: absolute;
      bottom: 0px;
      right: 10px;
      a{
        color: $gray;
      }
    }
	}
}

</style>