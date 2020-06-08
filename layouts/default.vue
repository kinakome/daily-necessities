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
</style>