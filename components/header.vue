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
        <img :src="require('@/assets/img/position.svg')" @click="locationReload">
        <div class="header-right__char">位置情報更新</div>
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
    },
    locationReload(){
      console.log("aaaaa")
      var res = confirm("位置情報を更新しますか？");
      if( res == true ) {
        this.getStation()
      }
    },
    //近隣駅取得メソッド
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
    //geolocation
    getLocation() {
      return new Promise((resolve, reject) => {
        // 現在地を取得
        navigator.geolocation.getCurrentPosition(
          // 取得成功した場合
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            this.$store.commit('updateLocation', location)
            resolve(location);
          },
          // 取得失敗した場合
          (error) => {
            switch (error.code) {
              case 1: //PERMISSION_DENIED
                alert("位置情報の利用が許可されていません");
                break;
              case 2: //POSITION_UNAVAILABLE
                alert("現在位置が取得できませんでした");
                break;
              case 3: //TIMEOUT
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
      position: relative;
      }
      img{
        width: 40px;
        height: 44px;
        transition: .3s;
        &:hover{
          opacity: 0.7;
        }
        @include mobile {
          width: 30px;
          height: 30px;
        }
      }
      &__char{
        position: absolute;
        font-size: 10px;
        right: 35px;
      }
    }
  }
}
</style>