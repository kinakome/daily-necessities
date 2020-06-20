//現在地
export const state = () => ({
	stores: [{
    name: ''
  }]
})

export const mutations = {
	updateStore (state, res) {
    //近隣の駅一覧の配列取得
    state.stations = res.response.station
	}
}

export const actions = {
	//最寄駅取得
  async updateStoreAction (context, location, range) {
    const baseUrl = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
    const setKey = `?key=${ process.env.HOTPEPPER_API_KEY }`
		const setLongitude = `&lng=${ location.longitude }`
    const setLatitude = `&lat=${ location.latitude }`
    const setRange = `&range=${ area }`
    const setLunch = `&lunch=1`
    const setFormat = `&format=json`
    const setOrder = `&order=4`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setLunch + setFormat + setOrder) 
    const res = await this.$axios.$get(getUrl)
    context.commit("updateStation", res)
  }
}