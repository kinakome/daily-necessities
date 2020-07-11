//現在地
export const state = () => ({
	currentPath: '/',
  location: {
		latitude: 35.681236,
		longitude: 139.767125
	},
	widgetList: ["TrainInfo", "LunchLibrary"],
	buttonStatus: true,
	getLocation: false
})

export const getters = {
	currentPath: state => state.currentPath,
	location: state => state.location,
	buttonStatus: state => state.buttonStatus,
	getLocation: state => state.getLocation
}

//現在地書き換え
export const mutations = {
	//緯度経度取得
  updateLocation (state, location) {
		state.location.latitude = location.latitude
		state.location.longitude = location.longitude
		state.getLocation = true
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
