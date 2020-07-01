<template>
	<div class="calendar">
		<div class="calendar-header">
			Google Calendar
		</div>
		<div class="calendar-contents">
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data(){
			return {
			}
		},
		methods: {
		}
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
.calendar{
	width: 100%;
	height: 100%;
	&-header{
		width: 100%;
		height: 50px;
		background-color: $black;
		color: $white;
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 25px;
		padding-top: 12px;
	}
	&-contents{
		width: 100%;
		height: calc(100% - 50px);
		font-family: 'Noto Sans JP', sans-serif;
		font-weight: 500;
	}
}

</style>