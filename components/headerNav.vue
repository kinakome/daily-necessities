<template>
  <div ref="headerButton" class="header-nav" :style="pStyle">
    <HeaderNavButton title="Nearby Info" explanation="近隣情報" />
    <HeaderNavButton title="Cafe Map" explanation="マップを表示" url="/map" />
    <!-- <HeaderNavButton title="My Page" explanation="マイページ" url="/signIn" v-if="isLoggedIn"/>
		<HeaderNavButton title="Sign In" explanation="サインイン" url="/signIn" v-else/> -->
  </div>
</template>
<script>
import HeaderNavButton from "@/components/headerNavButton.vue"

export default {
  components: {
    HeaderNavButton,
  },
  data() {
    return {
      pStyle: {
        height: "80px",
      },
      whindow: window.innerWidth,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["authenticated/isLoggedIn"]
    },
  },
  created() {
    if (window.innerWidth <= 720) {
      this.pStyle.height = "60px"
    } else {
      this.pStyle.height = "80px"
    }
  },
  mounted: function () {
    window.addEventListener("resize", this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    handleResize() {
      // windowsサイズ変更を検知
      this.window = window.innerWidth
      if (this.window <= 720) {
        this.pStyle.height = "60px"
      } else {
        this.pStyle.height = "80px"
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";

.header-nav {
  width: 100%;
  height: 80px;
  background-color: $white;
  padding: 0px 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  @include mobile {
    height: 80px;
  }
  > :first-child {
    border-radius: 5px 0px 0px 5px;
    @include mobile {
      border-radius: 5px;
    }
  }

  > :last-child {
    border-radius: 0px 5px 5px 0px;
    @include mobile {
      border-radius: 5px;
    }
  }

  @include mobile {
    padding: 10px 20px;
    height: 60px;
    flex-direction: column;
  }
  .selected {
    background-color: $gray;
  }
}
</style>
