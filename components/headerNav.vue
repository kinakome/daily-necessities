<template>
	<div class="header-nav">
		<div class="header-nav-button selected">
			<nuxt-link to="/">Daily Info</nuxt-link>
		</div>
		<div class="header-nav-button">
			<nuxt-link to="/">Edit Widget</nuxt-link>
		</div>
		<div class="header-nav-button">
			<nuxt-link to="/">My Page</nuxt-link>
		</div>
	</div>
</template>
<script>
	export default {
		components: {}
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
</style>