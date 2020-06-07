<template>
	<div>
		<Header />
		<main>
			<nuxt />
		</main>
	</div>
</template>

<script>
	import Header from "@/components/header.vue"; // headerをインポート
	export default {
		components: {
      Header
    }
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";

	main {
		min-height: 600px;
		background-color: $white;
		text-align: center;
		padding: 30px;
	}
	.page-enter-active,
	.page-leave-active {
		transition: 0.5s cubic-bezier(1, 0.25, 0.25, 1);
	}
	.page-enter,
	.page-leave-active {
		opacity: 0;
		transform: translate(0, 30px);
	}
</style>