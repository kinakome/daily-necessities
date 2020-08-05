<template>
	<div class="lunch-library">
		<div class="lunch-library-header">
			ランチ営業店
		</div>
		<div class="lunch-library-contents">
			<div class="lunch-library-contents-top">
        <!-- スマホとPCで切替したい -->
				<div class="lunch-library-contents-top-title">スワイプして切替</div>
        <div class="arrow-left" @click="selectLeft"></div>
        <div class="arrow-right" @click="selectRight"></div>
        <div class="lunch-library-contents-top-distance">        
          <ul>
            <li v-for='(range, index) in rangeList' :key=range.distance :class="{'selected': index==(selectedRange - 1)}" @click="selectRange(range)">{{range.distance}}</li>
          </ul>
        </div>
			</div>
      <div class="lunch-library-contents-main">
        <vue-loading type="spin" color="#333" :size="{ width: '100px', height: '100px' }" v-show="load"></vue-loading>
        <v-touch v-on:swipeleft="selectLeft" v-on:swiperight="selectRight">
          <transition-group name="restaurant-list" tag="ul">
            <li v-for="(restaurant, index) in getRestaurant" :key=restaurant.id :class="{'selected-restaurant': index==1}">
              <div class="restaurant-box">
                <img src="@/assets/img/no-image.svg" :class="{'selected-image': index==1}" v-if='restaurant.image_url.shop_image1 == ""'>
                <img :src=restaurant.image_url.shop_image1 :class="{'selected-image': index==1}" v-else>
                <div class="restaurant-box-info restaurant-box-info__selected" v-if='index == 1'>
                  <span id="restaurant-name">{{restaurant.name}}</span>
                  <span id="opentime">営業時間：{{restaurant.opentime}}</span>
                  <span id="lunch-price" v-if='restaurant.lunch!=""'>ランチ価格：{{restaurant.lunch}}円程度</span>
                  <a :href=restaurant.url target="_blank">ぐるなびで開く</a>
                </div>
                <div class="restaurant-box-info" v-else>{{restaurant.name}}</div>
              </div>
            </li>
          </transition-group>
        </v-touch>
      </div>
      <div class="lunch-library-contents-footer">
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
      selectRange(range){
        this.selectedRange = range.type

        const restaurantOption = {
          location: this.$store.state.location,
          range: this.selectedRange
        }
        this.$store.dispatch('lunchLibrary/updateRestaurantAction', restaurantOption)
        this.load = true
      },
      selectLeft(){
        const showRest = this.hiddenRestaurant.shift()
        const removeRest = this.showRestaurant.shift()
        this.showRestaurant.push(showRest)
        this.hiddenRestaurant.push(removeRest)
      },
      selectRight(){
        const showRest = this.hiddenRestaurant.pop()
        this.showRestaurant.unshift(showRest)
        const removeRest = this.showRestaurant.pop()
        this.hiddenRestaurant.unshift(removeRest)
      }
    },
    computed: {
      getRestaurant() {
        const restaurant = this.$store.getters['lunchLibrary/restaurant']
        if(this.load){
          if(restaurant.length >= 3){
            this.showRestaurant = restaurant.slice(0, 3)
            this.hiddenRestaurant = restaurant.slice(3)
          }else{
            //あとで考える
          }
        }

        if(restaurant.length !=0){
          this.load = false
        }
        // this.load = false
        return this.showRestaurant
      }
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
      ul{
        list-style: none;
        float: left;
        width: 100%;
        height: 100%;
        position: relative;
        li{
          display: block;
          top: 0px;
          clear: both;
          width: calc(30% - 20px);
          height: 100px;
          box-shadow: 0 0 5px $lightGray;
          overflow: hidden;
          margin: 10px;
          position: absolute;
          color: $baseBlack;
          padding-top: 5px;
          background-color: $white;
          @include mobile {
            height: 130px;
          }
          &:first-child{
            top: 0px;
            left: 0px;
          }
          &:last-child{
            top: 0px;
            right: 0px;        
          }
        }
        .restaurant-box{
          height: 100%;
          width: 100%;
          position: relative;
          color: $white;
          img{
            margin-left: 38px;
            display: block;
            height: 80px;
            width: 80px;
            box-shadow: 0 0 5px $lightGray;
          }
          .selected-image{
            height: 120px;
            width: 120px;
            margin-left: 46px;
            @include mobile {
              margin-left: calc(50% - 60px);
            }
          }
          &-info{
            padding: 3px;
            height: 50px;
            background-color: $baseBlack;
            opacity: 0.8;
            position: absolute;
            bottom: 0;
            width: 100%;
            font-size: 12px;
            @include mobile {
              height: 70px;
            }
            &__selected{
              height: 100px;
              #restaurant-name{
                display: block;
                height: 18%;
                overflow: hidden;
                border-bottom: solid $white 1px;
                padding-bottom: 2px;
                margin-bottom: 4px;
                white-space: nowrap;
              }
              #opentime{
                display: block;
                max-height: 34%;
                overflow: hidden;
                font-size: 11px;
                margin-bottom: 5px;
                text-align: left;
              } 
              a{
                display: inline-block;
                max-height: 20%;
                font-size: 11px;
                overflow: hidden;
                color: $white;
                padding: 3px;
                border: solid $white 1px;
                border-radius: 2px;
                position: absolute;
                bottom: 5px;
                left: 63px;
                transition: .2s;
                @include pc {
                  &:hover{
                    background-color: $gray;
                  }
                }
                @include mobile {
                  left: calc(50% - 40px);
                  &:active{
                    background-color: $gray;
                  }
                }
              }
              #lunch-price{
                display: block;
                max-height: 20%;
                overflow: hidden;
                font-size: 11px;
                margin-bottom: 3px;
                text-align: left;
              }   
            }
          }
        }
        .selected-restaurant{
          height: 150px;
          width: calc(40% - 20px);
          // border: solid 1px $gray;
          box-shadow: 0 0 5px $lightGray;
          top: 0px;
          right: 174px; 
          @include mobile {
            width: calc(70% - 20px);
            right: 15%; 
            z-index: 20;
          }
        }
        .restaurant-list{
          &-enter{
            &-active{
              opacity: 0;
              // transition: opacity 0.7s, transform 0.7s;
              transition: opacity 0.7s;
              position: absolute;
              animation: showAnime 0.8s;
            }
            &-to{
              opacity: 1;
              // transform: translate3d(0, -30px, 0);
            }
          }
          &-leave{
            &-active{
              // position: absolute;
              transition: opacity 0.4s, transform 0.4s;
            }
            &-to{
              opacity: 0;
              transform: translate3d(0, -20px, 0);
            }
          }
          &-move{
            transition: transform 0.7s;
            // animation: moveAnime 0.9s;
          }
        }
        @keyframes showAnime {
          0% {transform: scale(0);}
          40% {transform: scale(0);}
          80% {transform: scale(1.07);}
          100% {transform: scale(1);}
        }
        // @keyframes moveAnime {
        //   0% {transform: scale(1);}
        //   50% {transform: scale(1.05);}
        //   100% {transform: scale(1.1);}
        // }
      }
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