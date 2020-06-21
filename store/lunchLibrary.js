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
  async updateStoreAction (context, storeOption) {
    const baseUrl = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
    const setKey = `?keyid=${ process.env.GURUNAVI_API_KEY }`
		const setLongitude = `&longitude=${ storeOption.location.longitude }`
    const setLatitude = `&latitude=${ storeOption.location.latitude }`
    const setRange = `&range=${ storeOption.range }`
    const setLunch = `&lunch=1`
    const setSort = `&sort=1`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setLunch + setSort) 
    const res = await this.$axios.$get(getUrl)
    console.log(res)
    context.commit("updateStation", res)
  }
}
