<template>
	<div class="lunch-library">
		<div class="lunch-library-header">
			Lunch Library
		</div>
		<div class="lunch-library-contents">
			<div class="lunch-library-contents-top">
				<div class="lunch-library-contents-top-title">現在地から近いランチ営業店</div>
        <div class="lunch-library-contents-top-distance">
          <ul>
            <li>300m</li>
            <li class="selected">500m</li>
            <li>1km</li>
          </ul>
        </div>
			</div>
      <div class="lunch-library-contents-main"></div>
      <div class="lunch-library-contents-footer">
        Powered by <a href="http://webservice.recruit.co.jp/">ホットペッパー Webサービス</a>
      </div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted(){

		},
		components: {
		},
		data(){
			return {
				location: {
					latitude: this.$store.state.location.latitude,
					longitude: this.$store.state.location.longitude
				}
			}
		},
		methods: {

		}
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
.lunch-library{
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
    padding:10px;
    position: relative;
		&-top{
			width: 100%;
			height: 10%;
			float: left;
			position: relative;
      @include clearfix;
      // float: left;
			&-title{
				// height: 20px;
				width: calc(30%);
				text-align: left;
				font-size: 12px;
        color: $gray;
        float: left;
			}
      &-distance{
        width: 60%;
        float: right;
        ul{
          list-style: none;
          float: right;
          @include clearfix;
          li{
            font-size: 13px;
            display: inline-block;
            width: 70px;
            padding: 3px;
            box-shadow: 0 0 5px #D2D2D2;
            color: $gray;
            transition: .3s;
            &:hover{
              background-color: $lightGray;
            }
          }
          .selected{
            color: $white;
            background-color: $gray;
            &:hover{
              background-color: $gray;
            }
          }
        }
      }
		}
    &-main{
      height: 80%;
      
    }
    &-footer{
      height: 10%;
      color: $lightGray;
      font-size: 10px;
      position: absolute;
      bottom: 0px;
      right: 10px;
      a{
        color: $gray;
      }
    }
	}
}

</style>