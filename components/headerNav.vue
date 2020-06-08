<template>
	<div class="header-nav">
		<HeaderNavButton title="Daily Info" explanation="日々の情報一覧" />
		<HeaderNavButton title="Edit Widget" explanation="表示ガジェット編集" />
		<HeaderNavButton title="My Page" explanation="マイページ" />
	</div>
</template>
<script>
	import HeaderNavButton from "@/components/headerNavButton.vue";

	export default {
		components: {
			HeaderNavButton
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