import Vuex from 'vuex'
import axios from 'axios'

//現在地
export const state = () => ({
	stations: [{
    name: "aaaa"
  }]
})

export const mutations = {
	updateStation (state, res) {
    //近隣の駅一覧の配列取得
    state.stations = res.response.station
    console.log(state.stations)
    return state.stations
	}
}

export const actions = {
	//最寄駅取得
  async updateStationAction (context, location) {
		const baseUrl = "https://express.heartrails.com/api/json?method=getStations"
		const setLatitude = `&x=${ location.longitude }`
		const setLongitude = `&y=${ location.latitude }`
		const getUrl = encodeURI(baseUrl + setLatitude + setLongitude)
		const res = await this.$axios.$get(getUrl)
    context.commit("updateStation", res)
  }
}