<template>
	<div>
		<nav>
			<ul>
				<li>
					<nuxt-link to="/link01">リンク1</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/link02">リンク2</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/link03">リンク3</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/link04">リンク4</nuxt-link>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
	export default {
		components: {}
	};
</script>
<style lang="scss" scoped>
nav {
	color: #fff;
	ul {
		display: flex;
		justify-content: flex-end;
		li {
			list-style-type: none;
			margin-left: 15px;
			a {
				color: #fff;
			}
		}
	}
}
</style>