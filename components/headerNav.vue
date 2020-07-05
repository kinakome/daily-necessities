<template>
	<div class="header-nav" ref="headerButton" :style='pStyle' >
		<HeaderNavButton title="Today's Info" explanation="今日の情報一覧" />
		<HeaderNavButton title="Edit Widget" explanation="ウィジェット編集" url="/widgets/list"/>
		<HeaderNavButton title="My Page" explanation="マイページ" url="/signIn"/>
	</div>
</template>
<script>
	import HeaderNavButton from "@/components/headerNavButton.vue";

	export default {
		created() {
			if (window.innerWidth <= 720) {
				this.pStyle.height = '60px'
			}else{
				this.pStyle.height = '80px'
			}
		},
		mounted: function () {
			window.addEventListener('resize', this.handleResize)
		},
		beforeDestroy: function () {
			window.removeEventListener('resize', this.handleResize)
		},
		data() {
			return {
				pStyle: {
					'height': '80px'
				},
				whindow: window.innerWidth,

			}
		},
		components: {
			HeaderNavButton
		},
		methods: {
			handleResize: function() {
				// windowsサイズ変更を検知
				this.window = window.innerWidth;
				if(this.window <= 720){
					this.pStyle.height = '60px'
				}else{
					this.pStyle.height = '80px'
				}
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
	transition: .3s;
	@include mobile {
		height: 80px;
	}
 	>:first-child {
	border-radius: 5px 0px 0px 5px;
		@include mobile {
			border-radius: 5px;
		}
	}

	>:last-child {
	border-radius: 0px 5px 5px 0px;
		@include mobile {
			border-radius: 5px;
		}
	}

	@include mobile {
		padding: 10px 20px;
		height: 60px;
		flex-direction: column;
	}
	.selected{
		background-color: $gray;
		@include mobile {
			display: block;
		}
	}

}
</style>