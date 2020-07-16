<template>
	<div  ontouchstart="">
		<Header />
		<main>
      <transition mode="out-in" name="page-transition">
        <nuxt />
      </transition>
		</main>
	</div>
</template>

<script>
	import Header from "@/components/header.vue"; // headerをインポート
	export default {
		//初回ロード時storeのパスを更新
		created(){
      this.$store.commit('updatePath', this.$route.path)
		},
    mounted(){
			this.getStation()
			this.$store.dispatch('authenticated/nuxtClientInit')
    },
		components: {
      Header
    },		
    methods: {
			//近隣駅取得メソッド
			async getStation() {
				if (process.client) {
					if (!navigator.geolocation) {
						alert('現在地情報を取得できませんでした。')
						return
					}
          const location = await this.getLocation()
					this.$store.dispatch('trainInfo/updateStationAction', location)
					const grunaviOption = {
						location: location,
						range: 3
					}
					this.$store.dispatch('lunchLibrary/updateRestaurantAction', grunaviOption)
					this.$store.dispatch('cafeList/updateCafeList', grunaviOption)

				}
			},
			//geolocation
			getLocation() {
				return new Promise((resolve, reject) => {
					// 現在地を取得
					navigator.geolocation.getCurrentPosition(
						// 取得成功した場合
						(position) => {
							const location = {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
              }
              this.$store.commit('updateLocation', location)
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
    }
	};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";

main {
  width: calc(100% - 100px);
  min-height: 600px;
  background-color: $white;
  text-align: center;
	padding: 180px 46px 30px 46px;
  z-index: 10;
	position: relative;
	@include mobile {
		width: calc(100% - 40px);
		padding: 140px 20px 30px 20px;
	}
}

.page-transition-enter {
  // transform: translate(-100px, 0);
  transform: translate(0,200px);
  opacity: 0;
}
.page-transition-enter-to {
  opacity: 1;
}
.page-transition-enter-active {
  transition: all 1s 0s ease;
}
.page-transition-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.page-transition-leave-to {
  // transform: translate(100px, 0);
  transform: translate(0,-100px);
  opacity: 0;
}
.page-transition-leave-active {
  transition: all .5s 0s ease;
}
</style>