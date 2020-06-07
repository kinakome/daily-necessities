<template>
	<div class="header-nav">
		<div class="header-nav-button selected" @mouseover="mouseOverAction" @mouseleave="mouseLemoveAction">
			<transition name="component-fade" mode="out-in">
				<nuxt-link to="/" v-if="show">Daily Info</nuxt-link>
			</transition>
		</div>
		<div class="header-nav-button">
			<nuxt-link to="/" >Edit Widget</nuxt-link>
		</div>
		<div class="header-nav-button">
			<nuxt-link to="/" >My Page</nuxt-link>
		</div>
	</div>
</template>
<script>
	export default {
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

.header-nav {
	height: 80px;
	background-color: $white;
	padding: 0px 46px;
	display: flex;
	justify-content: space-between;
	align-items: center;

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

 	>:first-child {
  border-radius: 5px 0px 0px 5px;
	}

	>:last-child {
  border-radius: 0px 5px 5px 0px;
	}

	.selected{
		background-color: $gray;
	}

}

//transition
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>