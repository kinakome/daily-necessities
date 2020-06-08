<template>
  <div class="header-nav-button" @mouseover="mouseOverAction" @mouseleave="mouseLemoveAction">
    <transition name="fade" mode="out-in">
      <nuxt-link to="/" v-if="show" key="title">{{ title }}</nuxt-link>
      <nuxt-link to="/" v-else key="explanation">{{ explanation }}</nuxt-link>
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
    a:link, a:visited, a:hover, a:active {
      color: $white;
    }
  }


//transition
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>