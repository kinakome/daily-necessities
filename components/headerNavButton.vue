<template>
  <div @mouseover="mouseOverAction" @mouseleave="mouseLemoveAction" @click="updatePath" :class="{selected: url==$store.state.currentPath, 'header-nav-button': true}">
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
      show: true,
    }
  },
  methods: {
    mouseOverAction: function(){
      this.show = false
    },
    mouseLemoveAction: function(){
      this.show = true
    },
    //クリック時storeのパスを上書き
    updatePath: function(){
      this.$store.commit('updatePath', this.url)
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
  overflow: hidden;
  position: relative;
  z-index: 2;
  a {
    padding-top: 15px;
    display: block;
    height: 100%;
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
}

.header-nav-button:hover:before {
  bottom: 0;
}

</style>