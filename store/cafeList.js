//現在地
export const state = () => ({
	cafeList: []
})

export const getters = {
	cafeList: state => state.cafeList
}

export const mutations = {
	updateCafeList (state, res) {
    //近隣のカフェ一覧の配列取得
    state.cafeList = res.rest
	}
}

export const actions = {
	//最寄カフェ取得
  async updateCafeList (context, storeOption) {
    const baseUrl = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
    const setKey = `?keyid=${ process.env.GURUNAVI_API_KEY }`
		const setLongitude = `&longitude=${ storeOption.location.longitude }`
    const setLatitude = `&latitude=${ storeOption.location.latitude }`
    const setRange = `&range=${ storeOption.range }`

    const setHit = `&hit_per_page=100`
    const setFreeword = `&freeword=${ process.env.SEARCH_CAFE_LIST }`
    const setCondition = `&reeword_condition=2`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setHit + setFreeword + setCondition) 
    const res = await this.$axios.$get(getUrl)
    context.commit("updateCafeList", res)
  }
}
