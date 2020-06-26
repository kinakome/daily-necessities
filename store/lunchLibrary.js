//現在地
export const state = () => ({
	restaurant: []
})

export const getters = {
	restaurant: state => state.restaurant
}

export const mutations = {
	updateRestaurant (state, res) {
    //近隣のランチ店一覧の配列取得
    state.restaurant = res.rest
	}
}

export const actions = {
	//最寄ランチ取得
  async updateRestaurantAction (context, storeOption) {
    const baseUrl = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
    const setKey = `?keyid=${ process.env.GURUNAVI_API_KEY }`
		const setLongitude = `&longitude=${ storeOption.location.longitude }`
    const setLatitude = `&latitude=${ storeOption.location.latitude }`
    const setRange = `&range=${ storeOption.range }`
    const setLunch = `&lunch=1`
    const setHit = `&hit_per_page=100`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setLunch + setHit) 
    const res = await this.$axios.$get(getUrl)
    context.commit("updateRestaurant", res)
  }
}
