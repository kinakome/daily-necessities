<template>
	<div>
		{{latitude}}
		{{longitude}}
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
				//デフォルトは東京駅
				latitude: 35.681236,
				longitude: 139.767125
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
				this.latitude = position.coords.latitude
				this.longitude = position.coords.longitude
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
		},
		async asyncData({ app }){
			const user = await app.$axios.$get(`https://qiita.com/api/v2/users/${route.params.id}`)
			const items = await app.$axios.$get(`https://qiita.com/api/v2/items?query=user:${route.params.id}`)
			return {
				user,
				items
			}
		}
	};

</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";

</style>