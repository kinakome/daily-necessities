import Vuex from 'vuex'
import axios from 'axios'

//現在地
export const state = () => ({
	stations: []
})

//現在地書き換え
export const mutations = {
	updateStation (state, res) {
		//store切り分けて内容変更
		console.log(res)
	}
}

export const actions = {
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
