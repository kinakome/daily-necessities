<template>
	<div class="train-info">
		<div class="train-info-header">
		</div>
		<!-- <ul v-for="station in stations" :key=station.name> -->
			<!-- <li>{{station.name}}</li> -->
    <!-- </ul> -->
	</div>
</template>
<script>

	export default {
		mounted(){
			//位置情報取得
			this.getLocation()
		},
		components: {
		},
		props: {
			// result: Array
		},
		data(){
			return {
				location: {
					latitude: this.$store.state.location.latitude,
					longitude: this.$store.state.location.longitude
				},
				stations: [],
				// reset: false
			}
		},
		methods: {
			//位置情報取得メソッド
			async getLocation () {
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
					// navigator.geolocation.getCurrentPosition(this.success, this.error, options)
					await this.getStation()
					console.log(this.stations)
				}
			},
			getPosition(){
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
			getStation() {
				return new Promise((resolve, reject) => {
					// 駅一覧を取得
					console.log(this.location)
					// this.$store.commit('updateLocation', location)
					this.$store.dispatch('trainInfo/updateStationAction', this.location)
					// this.stations.push(this.$store.state.stations)
					console.log(this.$store.state.stations)
					resolve(location);
				});
			}
			// attachments(){
      //       if(!this.result){
      //           this.files = [];
      //           return this.files;
      //       }

      //       if(this.reset){
      //           this.files = [];
      //       }

      //       const filenames = this.result;
      //       this.reset = (this.files.length === filenames.length) ? true : false;

      //       if(this.files.length === 0){
      //           filenames.map((filename)=>{
      //               fetch(`https://download.link/files/${filename}`, {method: "GET"})
      //               .then((res)=>{
      //                   if(res.ok){
      //                       this.files.push(new File([res.blob()], filename));
      //                   }
      //               })
      //               .catch(error => console.log(error));
      //           });
      //       }

      //       return this.files;
      //   }
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