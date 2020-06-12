import Vuex from 'vuex'
import axios from 'axios'

//現在地
export const state = () => ({
	currentPath: "/",
  location: {
		latitude: 35.681236,
		longitude: 139.767125
	},
	stations: []
})
//現在地書き換え
export const mutations = {
	//緯度経度取得
  updateLocation (state, location) {
		state.location.latitude = location.latitude
		state.location.longitude = location.longitude
	},
	updatePath (state, path) {
		state.currentPath = path
	},
	updateStation (state, res) {
		//store切り分けて内容変更
		console.log(res)
	}
}

export const actions = {
	updatePathAction(context, path) {
		context.commit('updatePath', path)
	},
	//最寄駅取得
  async updateStationAction (context, location) {
		const baseUrl = "https://express.heartrails.com/api/json?method=getStations"
		console.log(location)
		const setLatitude = `&x=${ location.longitude }`
		const setLongitude = `&y=${ location.latitude }`
		const getUrl = encodeURI(baseUrl + setLatitude + setLongitude)
		const res = await this.$axios.$get(getUrl)
    context.commit("updateStation", res)
  }
}
