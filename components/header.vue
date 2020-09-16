<template>
  <header>
    <div class="header">
      <div class="header__left">
        <img src="@/assets/img/site-icon.png">
      </div>
      <div class="header-center">
        <span>Daily Necessities !</span>
      </div>
      <div class="header__right">
        <img :src="require('@/assets/img/location.svg')" @click="locationReload">
        <div class="header__right--update">更新</div>
      </div>
    </div>
    <HeaderNav />
  </header>
</template>

<script>
import HeaderNav from "@/components/headerNav.vue";
import { auth, authProviders } from '~/plugins/firebase'

export default {
  created(){
    this.$store.commit('updatePath', this.$route.path)
  },
  mounted() {
    this.getStation()
    this.$store.dispatch('authenticated/nuxtClientInit')
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
    updatePath() {
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
    },
    locationReload(){
      var res = confirm("位置情報を更新しますか？");
      if( res == true ) {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
      }
    },
    async getStation() {
      if (process.client) {
        if (!navigator.geolocation) {
          alert('現在地情報を取得できませんでした。')
          return
        }
        const location = await this.getLocation()
        this.$store.dispatch('trainInfo/updateStationAction', location)
        const grunaviOption = {
          location: location,
          range: 3
        }
        this.$store.dispatch('lunchLibrary/updateRestaurantAction', grunaviOption)
        this.$store.dispatch('cafeList/updateCafeList', grunaviOption)
      }
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            this.$store.commit('updateLocation', location)
            resolve(location);
          },
          (error) => {
            switch (error.code) {
              case 1: 
                alert("位置情報の利用が許可されていません");
                break;
              case 2: 
                alert("現在位置が取得できませんでした");
                break;
              case 3: 
                alert("タイムアウトになりました");
                break;
              default:
                alert("その他のエラー(エラーコード:" + error.code + ")");
                break;
            }
            reject(error.code);
          }
        );
      });
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
    &__left{
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
    &__right{
      float: right;
      padding: 13px 46px 0px 0px;
      @include mobile {
      padding: 15px 16px 0px 0px;
      // position: relative;
      }
      img{
        width: 40px;
        height: 44px;
        transition: .3s;
        &:hover{
          opacity: 0.7;
        }
        @include mobile {
          width: 25px;
          height: 25px;
        }
      }
      &--update{
        font-size: 10px;
        right: 35px;
        margin: 3px 10px 10px 10px;
        @include mobile {
          display: none;
        }
      }
    }
  }
}
</style>