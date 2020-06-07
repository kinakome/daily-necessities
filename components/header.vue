<template>
  <header>
    <div class="header">
      <div class="header-left">
        <img src="@/assets/img/site-icon.png">
      </div>
      <div class="header-center">
        <span>Daily necessities !</span>
      </div>
      <div class="header-right">
        <img src="@/assets/img/login.svg">
      </div>
    </div>
    <HeaderNav />
  </header>
</template>
<script>
	import HeaderNav from "@/components/headerNav.vue";
	export default {
		components: {
			HeaderNav
		}
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
header{
  width: 100%;
  position: fixed;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  .header {
    color: $white;
    height: 80px;
    background-color: $baseBlack;
    &-left{
      float: left;
      padding: 13px 0px 0px 46px ;
      img{
        width: 45.17px;
        height: 49.09px;
      }
    }
    &-center{
      float: left;
      width: calc(100% - 190px);
      padding-top: 18px;
      text-align: center;
      font-size: 40px ;
      font-weight: 700;
    }
    &-right{
      float: right;
      padding: 13px 46px 0px 0px;
      img{
        width: 45.17px;
        height: 49px;
      }
    }
  }
}

</style>