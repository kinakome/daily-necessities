<template>
	<div class="train-info">
		<div class="train-info-header">
		</div>
			<ul v-for="station in updateStaions" :key=station.name>
				<li>{{station.name}}</li>
			</ul>
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
			}
		},
		methods: {
			//位置情報取得メソッド
			async getStation() {
				if (process.client) {
					if (!navigator.geolocation) {
						alert('現在地情報を取得できませんでした。')
						return
					}

					const options = {
						enableHighAccuracy: false,
						timeout: 5000,
						maximumAge: 0
					}

					this.location = await this.getPosition()
					this.$store.dispatch('trainInfo/updateStationAction', this.location)
				}
			},
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
			}
		},computed: {
			updateStaions() {
				this.stations = []
				const result = this.$store.state.trainInfo.stations
				for (let i in result) {
					this.stations.push(result[i])
				}
				//同じ駅名の重複排除
				return this.stations
			}
		}
	};

</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
.train-info{
	width: 100%;
	&-header{
		width: 100%;
		height: 50px;
		background-color: $black;
	}
}

</style>