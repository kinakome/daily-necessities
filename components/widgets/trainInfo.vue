<template>
	<div class="train-info">
		<div class="train-info-header">
		</div>
		<div class="train-info-contents">
			<div class="train-info-contents-left">
				<div class="train-info-contents-left-title">現在地から近い駅</div>
				<div class="train-info-contents-left-stations">
					<div class="arrow-up" @click="selectUp"></div>
					<div class="arrow-down" @click="selectDown"></div>
					<div class="station-box">
						<div class="station-box-item"></div>
						<div class="station-box-item selected-box"></div>
						<div class="station-box-item"></div>
					</div>
					<transition-group name="station-list" tag="ul">
						<!-- <li v-for="(station, index) in updateStaions" :key=station :class="{'selected-station': index==1}">{{station.name}}</li> -->
						<li v-for="(station, index) in updateStaions" :key=station :class="{'selected-station': index==1}">{{station}}</li>
					</transition-group>
				</div>
			</div>
			<div class="train-info-contents-right">
					<transition name="station-list">
						<ul v-if="!load">
							<li v-for="(train, index) in selectedStation.train" :key=train.line :class="{'selected-station': index==1}">{{train.line}} {{train.distance}} </li>
						</ul>
						<no-ssr>
							<vue-loading type="spin" color="#333" :size="{ width: '50px', height: '50px' }" v-show="load"></vue-loading>
						</no-ssr>
						<!-- <span v-if="load">近くに駅がありません</span> -->
					</transition>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted(){
			//近隣駅情報取得
			this.getStation()
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
					// //geolocation取得設定
					// const options = {
					// 	enableHighAccuracy: false,
					// 	timeout: 5000,
					// 	maximumAge: 0
					// }

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
				console.log(this.selectedStation)
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
.train-info{
	width: 100%;
	height: 100%;
	&-header{
		width: 100%;
		height: 50px;
		background-color: $black;
	}
	&-contents{
		width: 100%;
		height: calc(100% - 50px);
		font-family: 'Noto Sans JP', sans-serif;
		font-weight: 500;
		&-left{
			width: 40%;
			height: 100%;
			float: left;
			position: relative;
			&-title{
				position: absolute;
				height: 20px;
				width: 100%;
				text-align: left;
				padding:10px 0 0 10px;
				font-size: 12px;
				color: $gray;
			}
			&-stations{
				height: 100%;
				padding: 20px  0px;
				position: relative;
				.station-box{
					height: 100%;
					width: 100%;
					&-item{
						height: 30%;
						width: 100%;
					}
					.selected-box{
						height: 40%;
						background-color: $gray;
						font-weight: 700;
						color: $white;
						font-size: 20px;
					}
				}
				ul{
					list-style: none;
					float: left;
					position: absolute;
					top: 30px;
					left: 90px;
					z-index: 30;
					height: calc(100% - 40px );
					li{
						display: block;
						color: $lightGray;
						height: 30%;
						padding-top: 13px;
					}
					.selected-station{
						font-weight: 700;
						color: $white;
						font-size: 20px;
						height: 40%;
						padding-top: 20px;
					}
				}
				.arrow-up{
					position: absolute;
					top: 90px;
					left: 15px;
					display: inline-block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0 10px 12px 10px;
					border-color: transparent transparent $white transparent;
					&:hover{
					border-color: transparent transparent $lightGray transparent;
					}

				}
				.arrow-down{
					position: absolute;
					bottom: 90px;
					left: 15px;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 12px 10px 0 10px;
					border-color: $white transparent transparent transparent;
					&:hover{
						border-color: $lightGray transparent transparent transparent;
					}
				}
				.station-list-move {
					transition: transform 1s;
				}
			}
		}
		&-right{
			border: solid 1px $gray;
			width: calc(60% - 10px);
			height: calc(100% - 20px);
			float: right;
			margin: 10px 10px 10px 0px;
		}
	}
}

</style>