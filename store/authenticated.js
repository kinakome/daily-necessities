import { auth } from '~/plugins/firebase'

export const state = () => ({
  status: "",
  token: "",
  username: ""
})

export const getters = {
  isLoggedIn: state =>  state.status === "loggedIn"
}

export const actions = {
  gotUser({ commit }, user) {
    commit("setUser", user)
  },
  logout({ commit }) {
    auth.signOut().then(() => {
      commit("logout")
    })
  },
  nuxtClientInit ( commit, state, dispatch ){
    if (localStorage.accessToken && token == "") {
      commit('setToken', localStorage.token)
    }
  }
}

export const mutations = {
  setUser(state, user) {
    state.status = "loggedIn"
    state.username = user.displayName
  },
  logout(state) {
    state.status = "loggedOut"
    state.username = ""
  },
  setToken(state, token) {
    state.status = "loggedIn"
    state.token = token
  }
}