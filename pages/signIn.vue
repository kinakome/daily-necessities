<template>
  <div class="auth-box">
    <div class="auth-box-header">サインイン方法を選択</div>
    <firebase-auth />
  </div>
</template>

<script>
import FirebaseAuth from "@/components/FirebaseAuth"
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  name: "Login",
  components: {
    FirebaseAuth,
  },
}
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";

.auth-box {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  border: 1px solid $black;
  border-radius: 3px;
  &-header {
    height: 40px;
    width: 100%;
    font-size: 16px;
    font-family: "Noto Sans JP", sans-serif;
    font-weight: 500;
    background-color: $black;
    color: $white;
    padding-top: 10px;
  }
}
</style>
