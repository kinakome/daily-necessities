<template>
	<div>
		{{location.latitude}}
		{{location.longitude}}
	</div>
</template>
<script>

	export default {
		created(){
			//位置情報取得
      this.getLocation()
    },
		components: {
		},
		data(){
			return {
				location: {
					latitude: this.$store.state.location.latitude,
					longitude: this.$store.state.location.longitude
				}
			}
		},
		methods: {
			//位置情報取得メソッド
			getLocation () {
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

					navigator.geolocation.getCurrentPosition(this.success, this.error, options)
				}
			},

			success (position) {
				this.location = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
				this.$store.commit('updateLocation', location)
				this.$store.dispatch('updateStationAction', this.location)			
			},
			error (error) {
				switch (error.code) {
					case 1: //PERMISSION_DENIED
						alert('位置情報の利用が許可されていません')
						break
					case 2: //POSITION_UNAVAILABLE
						alert('現在位置が取得できませんでした')
						break
					case 3: //TIMEOUT
						alert('タイムアウトになりました')
						break
					default:
						alert('現在位置が取得できませんでした')
						break
				}
			}
		}
	};

</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";

</style>