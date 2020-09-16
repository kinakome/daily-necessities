import { auth } from "~/plugins/firebase"

export default function ({ route, store, redirect }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.dispatch("authenticated/gotUser", user)
    } else {
      // if(route.name !== "login") redirect("/login")
    }
  })
}
