//現在地
export const state = () => ({
	stations: [{
    name: ''
  }]
})

export const mutations = {
	updateStation (state, res) {
    //近隣の駅一覧の配列取得
    state.stations = res.response.station
	}
}

export const actions = {
	//最寄駅取得
  async updateStationAction (context, location) {
		const baseUrl = "https://express.heartrails.com/api/json?method=getStations"
		const setLongitude = `&x=${ location.longitude }`
		const setLatitude = `&y=${ location.latitude }`
    const getUrl = encodeURI(baseUrl + setLatitude + setLongitude)
    const res = await this.$axios.$get(getUrl)
    context.commit("updateStation", res)
  }
}
