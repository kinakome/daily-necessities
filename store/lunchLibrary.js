//現在地
export const state = () => ({
	stores: [{
    name: ''
  }]
})

export const getters = {
	stores: state => state.stores
}

export const mutations = {
	updateStore (state, res) {
    //近隣の駅一覧の配列取得
    state.stores = res.response.stores
	}
}

export const actions = {
	//最寄駅取得
  async updateStoreAction (context, location, range) {
    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    const setKey = `?key=${ process.env.HOTPEPPER_API_KEY }`
		const setLongitude = `&lng=${ location.longitude }`
    const setLatitude = `&lat=${ location.latitude }`
    const setRange = `&range=${ range }`
    const setLunch = `&lunch=1`
    const setFormat = `&format=jsonp`
    const setOrder = `&order=4`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setLunch + setFormat + setOrder) 
    const res = await this.$axios.$get(getUrl)
    console.log(res)
    context.commit("updateStation", res)
  }
}
