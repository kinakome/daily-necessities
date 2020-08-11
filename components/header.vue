<template>
  <header>
    <div class="header">
      <div class="header-left">
        <img src="@/assets/img/site-icon.png">
      </div>
      <div class="header-center">
        <span>Daily Necessities !</span>
      </div>
      <div class="header-right">
        <!-- <nuxt-link :to="loginUrl" tag="img" :src="require('@/assets/img/logout.svg')" @click.native="signOut" v-if="isLoggedIn"></nuxt-link>
        <nuxt-link :to="loginUrl" tag="img" :src="require('@/assets/img/login.svg')" @click.native="updatePath" v-else></nuxt-link> -->
        <nuxt-link :to="loginUrl" tag="img" :src="require('@/assets/img/position.svg')" @click.native="updatePath"></nuxt-link>
      </div>
    </div>
    <HeaderNav />
  </header>
</template>

<script>
import HeaderNav from "@/components/headerNav.vue";
import { auth, authProviders } from '~/plugins/firebase'

export default {
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("authenticated/gotUser", user)
      } else {
        // if(route.name !== "login") redirect("/login")
      }
    })
  },
  components: {
    HeaderNav
  },
  data() {
    return {
      loginUrl: '/signIn',
    }
  },
  methods: {
    //クリック時storeのパスを上書き
    updatePath() {
      //クリック時にスクロールを元に戻す
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      this.$store.commit('updatePath', this.loginUrl)
    },
    async signOut() {
      await this.$store.dispatch('authenticated/logout')

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      this.$store.commit('updatePath', this.loginUrl)
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['authenticated/isLoggedIn']
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
    @include mobile {
      height: 60px;
    }
    &-left{
      float: left;
      padding: 13px 0px 0px 46px ;
      img{
        width: 45.17px;
        height: 49.09px;
      }
      @include mobile {
        display: none;
      }
    }
    &-center{
      float: left;
      width: calc(100% - 190px);
      padding-top: 15px;
      text-align: center;
      font-size: 40px ;
      font-weight: 700;
      @include mobile {
        width: calc(100% - 47px);
        font-size: 30px ;
        padding-left: 30px;
      }
      @include iphoneSE {
        font-size: 28px ;
      }
    }
    &-right{
      float: right;
      padding: 13px 46px 0px 0px;
      @include mobile {
      padding: 15px 16px 0px 0px;
      }
      img{
        width: 45.17px;
        height: 49px;
        transition: .3s;
        &:hover{
          opacity: 0.7;
        }
        @include mobile {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>