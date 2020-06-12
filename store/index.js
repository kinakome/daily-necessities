import Vuex from 'vuex'
import axios from 'axios'

//現在地
export const state = () => ({
	currentPath: "/",
  location: {
		latitude: 35.681236,
		longitude: 139.767125
	}
})
//現在地書き換え
export const mutations = {
  updateLocation (state, location) {
		state.location.latitude = location.latitude
		state.location.longitude = location.longitude
	},
	updatePath: function(state, path) {
		state.currentPath = path
	}
}

export const actions = {
	updatePathAction(context, path) {
		context.commit('updatePath', path)
	}
  // async getList ({commit}) {
  //   const res = await this.$axios.$get('/api/todos')
  //   commit("setList", res)
  // }
}
