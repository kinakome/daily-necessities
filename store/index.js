//現在地
export const state = () => ({
	currentPath: '/',
  location: {
		latitude: 35.681236,
		longitude: 139.767125
	},
	widgetList: ["TrainInfo", "LunchLibrary"]
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
	}
}

export const actions = {
	updatePathAction(context, path) {
		context.commit('updatePath', path)
	}
}
