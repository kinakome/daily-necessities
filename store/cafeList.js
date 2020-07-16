//現在地
export const state = () => ({
  cafeList: [],
  cafeGroupList: []
})

export const getters = {
  cafeList: state => state.cafeList,
	cafeGroupList: state => state.cafeGroupList,
}

export const mutations = {
	updateCafeList (state, res) {
    let cafeGroupList = {
      saintMarc: [],
      starBacks: [],
      doutor: [],
      excel: [],
      tullys: []
    }
    res.rest.forEach(cafe => {
      if(cafe.name_kana.match(/サンマルクカフェ/)){
        cafeGroupList.saintMarc.push(cafe)
      }else if(cafe.name_kana.match(/スターバックスコーヒ/)){
        cafeGroupList.starBacks.push(cafe)
      }else if(cafe.name_kana.match(/ドトールコーヒーショップ/)){
        cafeGroupList.doutor.push(cafe)
      }else if(cafe.name_kana.match(/エクセルシオールカフェ/)){
        cafeGroupList.excel.push(cafe)
      }else if(cafe.name_kana.match(/タリーズコーヒー/)){
        cafeGroupList.tullys.push(cafe)
      }
    });
    state.cafeGroupList = cafeGroupList
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
    const setCondition = `&freeword_condition=2`
    const getUrl = encodeURI(baseUrl + setKey + setLatitude + setLongitude + setRange + setHit + setFreeword + setCondition) 
    const res = await this.$axios.$get(getUrl)
    context.commit("updateCafeList", res)
  }
}
