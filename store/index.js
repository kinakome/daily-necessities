//現在地
export const state = () => ({
	currentPath: '/',
  location: {
		latitude: 35.681236,
		longitude: 139.767125
	},
	widgetList: ["TrainInfo", "LunchLibrary"],
	buttonStatus: true
})

export const getters = {
	location: state => state.location,
	buttonStatus: state => state.buttonStatus
}

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
	updateButtonStatus (state, status) {
		state.buttonStatus = status
	}
}

export const actions = {
	updatePathAction(context, path) {
		context.commit('updatePath', path)
	}
}
