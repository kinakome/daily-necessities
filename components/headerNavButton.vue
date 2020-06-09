<template>
  <div class="header-nav-button" @mouseover="mouseOverAction" @mouseleave="mouseLemoveAction">
    <transition name="toggle" mode="out-in">
      <nuxt-link :to="url" v-if="show" key="title">{{ title }}</nuxt-link>
      <nuxt-link :to="url" v-else key="explanation" class="explanation">{{ explanation }}</nuxt-link>
    </transition>	
  </div>
</template>

<script>
export default {
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
      show: true
    }
  },
  methods: {
    mouseOverAction: function(){
      this.show = false
    },
    mouseLemoveAction: function(){
      this.show = true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
.header-nav-button{
  text-align: center;
  height: 60px;
  width: 33%;
  background-color: $lightGray;
  font-size: 30px;
  padding-top: 15px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  a {
    display: block;
  }
  a:link, a:visited, a:hover, a:active {
    color: $white;
  }
  .explanation{
    font-size: 23px;
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: 500;
  }
}

//transition
.toggle-enter-active, .toggle-leave-active {
  transition: opacity 0.2s;
  z-index: 1;
}

.toggle-enter, .toggle-leave-to {
  opacity: 0;
  z-index: 1;
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
}

.header-nav-button:hover:before {
  bottom: 0;
}

</style>