<template>
	<div  ontouchstart="">
		<Header />
		<main>
      <transition mode="out-in" name="page-transition">
        <nuxt />
      </transition>
		</main>
	</div>
</template>

<script>
	import Header from "@/components/header.vue"; // headerをインポート
	export default {
		components: {
      Header
    },		
	};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";

main {
  width: calc(100% - 100px);
  min-height: 600px;
  background-color: $white;
  text-align: center;
	padding: 180px 46px 30px 46px;
  z-index: 10;
	position: relative;
	@include mobile {
		width: calc(100% - 40px);
		padding: 140px 20px 30px 20px;
	}
}

.page-transition-enter {
  // transform: translate(-100px, 0);
  transform: translate(0,200px);
  opacity: 0;
}
.page-transition-enter-to {
  opacity: 1;
}
.page-transition-enter-active {
  transition: all 1s 0s ease;
}
.page-transition-leave {
  transform: translate(0, 0);
  opacity: 1;
}
.page-transition-leave-to {
  // transform: translate(100px, 0);
  transform: translate(0,-100px);
  opacity: 0;
}
.page-transition-leave-active {
  transition: all .5s 0s ease;
}
</style>