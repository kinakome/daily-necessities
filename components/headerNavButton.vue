<template>
  <div @mouseover="mouseOverAction" @mouseleave="mouseLemoveAction" @click="clickAction" 
  :class="{selected: url==$store.state.currentPath, 'header-nav-button': true}" v-show='showButton'>
    <transition name="toggle" mode="out-in">
      <nuxt-link :to="url" v-if="showTitle" key="title">{{ title }}</nuxt-link>
      <nuxt-link :to="url" v-else key="explanation" class="explanation">{{ explanation }}</nuxt-link>
    </transition>	
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    window.addEventListener('resize', this.handleResize)
    if(window.innerWidth <= 720 && this.url != this.$store.state.currentPath){
      this.showButton = false
      this.$store.commit('updateButtonStatus', false)
    }else{
      this.showButton = true
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    explanation: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: '/'
    }
  },
  data(){
    return {
      showTitle: true,
      open: false,
      showButton: true,
      whindow: window.innerWidth
    }
  },
  methods: {
    mouseOverAction() {
      if(window.innerWidth > 720){
        this.showTitle = false
      }
    },
    mouseLemoveAction() {
      if(window.innerWidth > 720){
        this.showTitle = true
      }
    },
    //クリック時storeのパスを上書き
    clickAction() {
      if(window.innerWidth <= 720){
        if(this.url == this.$store.state.currentPath && this.open == false){
          this.$parent.$data.pStyle.height = '160px'
          this.open = true
          this.$store.commit('updateButtonStatus', true)
        }else if(this.url == this.$store.state.currentPath && this.open == true){
          this.$parent.$data.pStyle.height = '60px'
          this.open = false
          this.$store.commit('updateButtonStatus', false)
        }else{
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          this.$store.commit('updatePath', this.url)
          this.$store.commit('updateButtonStatus', false)
          this.$parent.$data.pStyle.height = '60px'
          this.open = false
        }
      }else{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        this.$store.commit('updatePath', this.url)
      }
    },
    handleResize() {
      // windowsサイズ変更を検知
      this.window = window.innerWidth;
      if(window.innerWidth <= 720 && this.url != this.$store.state.currentPath){
        this.showButton = false
      }else{
        this.showButton = true
      }
    },
  },
  computed: {
    ...mapGetters(['buttonStatus'])
  },
  watch: {
    buttonStatus: function (newStatus, oldStatus) {
      if(window.innerWidth <= 720 && this.url != this.$store.state.currentPath){
        this.showButton = newStatus
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
.header-nav-button{
  text-align: center;
  height: 60px;
  width: 32.7%;
  background-color: $lightGray;
  font-size: 30px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 5px rgb(151, 151, 151);
  @include mobile {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    font-size: 25px;
  }

  a {
    padding-top: 15px;
    display: block;
    height: 100%;
    @include mobile {
      padding-top: 8px;
    }
  }

  a:link, a:visited, a:hover, a:active {
    color: $white;
  }

  .explanation{
    padding-top: 17px;
    font-size: 23px;
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: 700;
  }
}

.selected{
  background-color: $gray;
}

//transition
.toggle-enter-active, .toggle-leave-active {
  transition: opacity 0.2s;
  z-index: 2;
}

.toggle-enter, .toggle-leave-to {
  opacity: 0;
  z-index: 2;
}

//button animation
.header-nav-button:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: -100%;
  left: 0;
  background-color: $black;
  transition: .3s;
  z-index: -1;
  @include mobile {
    display: none;
  }
}

.header-nav-button:hover:before {
  bottom: 0;
}

</style>