import Vuex from 'vuex'

export default () => (new Vuex.Store({
		// ステートの定義
	state: function() {
		return {
			currentPath: "/"
		}
	},
	//引数ありのミューテーション
	mutations: {
		updatePath: function(state, path) {
			state.currentPath = path
		}
	},
	//アクションの定義(第二引数を付けると値を渡せる)
	actions: {
		updatePathAction(context, path) {
			context.commit('updatePath', path)
		}
	}
}))

