<template>
  <header>
    <div class="header">
      <div class="header-left">
        <img src="@/assets/img/site-icon.png">
      </div>
      <div class="header-center">
        <span>Daily necessities !</span>
      </div>
      <div class="header-right">
        <nuxt-link :to="loginUrl" tag="img" :src="require('@/assets/img/login.svg')" @click="updatePath" v-if="getLoginStatus"></nuxt-link>
        <nuxt-link :to="loginUrl" tag="img" :src="require('@/assets/img/logout.svg')" @click="updatePath" v-else></nuxt-link>
      </div>
    </div>
    <HeaderNav />
  </header>
</template>

<script>
import HeaderNav from "@/components/headerNav.vue";
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      loginUrl: '/signIn',
    }
  },    //クリック時storeのパスを上書き
  methods: {
    //クリック時storeのパスを上書き
    updatePath() {
      //クリック時にスクロールを元に戻す
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      this.$store.commit('updatePath', this.loginUrl)
    }
  },
  computed: {
    getLoginStatus() {
      return this.$store.getters['authenticated/isLoggedIn'] == ""
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
header{
  width: 100%;
  position: fixed;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  box-shadow: 1px 1px 1px 1px #D2D2D2;
  z-index: 20;

  .header {
    color: $white;
    height: 80px;
    background-color: $baseBlack;
    &-left{
      float: left;
      padding: 13px 0px 0px 46px ;
      img{
        width: 45.17px;
        height: 49.09px;
      }
    }
    &-center{
      float: left;
      width: calc(100% - 190px);
      padding-top: 18px;
      text-align: center;
      font-size: 40px ;
      font-weight: 700;
    }
    &-right{
      float: right;
      padding: 13px 46px 0px 0px;
      img{
        width: 45.17px;
        height: 49px;
        transition: .3s;
        &:hover{
          opacity: 0.7;
        }
      }
    }
  }
}
</style>