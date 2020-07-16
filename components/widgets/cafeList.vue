<template>
	<div class="cafe-list">
		<div class="cafe-list-header">
			大手カフェチェーン
		</div>
		<div class="cafe-list-contents">
			<div class="cafe-list-contents-top">
				<div class="cafe-list-contents-top-title">近くのランチ営業店</div>
			</div>
      <div class="lunch-library-contents-main">
      </div>
      <div class="cafe-list-contents-footer">
        Supported by <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">ぐるなびWebService</a>
      </div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
        rangeList: [{distance: "300m", type: 1},{distance: "500m", type: 2},{distance: "1km", type: 3}],
        selectedRange: 2,
        load: true,
        showRestaurant: [],
        hiddenRestaurant: []
			}
		},
		methods: {
    },
    computed: {
    }
	};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
.cafe-list{
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
			&-title{
				width: 30%;
				text-align: left;
				font-size: 12px;
        color: $gray;
        float: left;
        @include mobile {
          display: none;
        }
      }
      .arrow{
        &-left{
          position: absolute;
          top: 2px;
          left: 260px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7px 20px 7px 0;
          border-color: transparent $gray transparent transparent;
          transition: .3s;
          @include pc {
            &:hover{
            border-color: transparent $lightGray transparent transparent;
            }
          }
          @include mobile {
            &:active{
              border-color: transparent $lightGray transparent transparent;
            }
            left: 10%;
          }
        }
        &-right{
          position: absolute;
          top: 2px;
          left: 290px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7px 0 7px 20px;
          border-color: transparent transparent transparent $gray;
          transition: .3s;
          @include pc {
            &:hover{
              border-color: transparent transparent transparent $lightGray;
            }
          }
          @include mobile {
            &:active{
              border-color: transparent transparent transparent $lightGray;
            }
            left: calc(10% + 30px);
          }

        }
      }
      &-distance{
        width: 50%;
        float: right;
        @include mobile {
          width: 70%;
        }
        ul{
          list-style: none;
          float: right;
          @include clearfix;
          li{
            font-size: 13px;
            display: inline-block;
            width: 70px;
            padding: 3px;
            margin-left: 5px;
            box-shadow: 0 0 5px $lightGray;
            color: $gray;
            transition: .3s;
            &:hover{
              background-color: $lightGray;
            }
            @include mobile {
              font-size: 12px;
              width: 50px;
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
      width: 100%;
      overflow: scroll;
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