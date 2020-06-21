<template>
	<div class="lunch-library">
		<div class="lunch-library-header">
			Lunch Library
		</div>
		<div class="lunch-library-contents">
			<div class="lunch-library-contents-top">
				<div class="lunch-library-contents-top-title">現在地から近いランチ営業店</div>
        <div class="lunch-library-contents-top-distance">
          <button @click="selectRight">aa</button>
          <ul>
            <li v-for='(range, index) in rangeList' :key=range.distance :class="{'selected': index==(selectedRange - 1)}" @click="selectRange(range)">{{range.distance}}</li>
          </ul>
        </div>
			</div>
      <div class="lunch-library-contents-main">
        <!-- <no-ssr>
          <vue-loading type="spin" color="#333" :size="{ width: '100px', height: '100px' }" v-show="load"></vue-loading>
				</no-ssr> -->
        <!-- {{getRestaurant}} -->
      <transition-group name="station-list" tag="ul">
        <li v-for="(restaurant, index) in getRestaurant" :key=restaurant.name :class="{'selected-restaurant': index==1}">{{restaurant.name}}</li>
      </transition-group>
      </div>
      <div class="lunch-library-contents-footer">
        Supported by <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">ぐるなびWebService</a>
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
      },
      selectRight(){
        const removeRest = this.showRestaurant.shift()
        const showRest = this.hiddenRestaurant.shift()
        this.hiddenRestaurant.push(removeRest)
        this.showRestaurant.push(showRest)

      }
    },
    computed: {
      getRestaurant() {
        const restaurant = this.$store.getters['lunchLibrary/restaurant']
        if(this.load){
          console.log(restaurant)
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
            margin-left: 5px;
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
        .restaurant-list-move {
					transition: transform 1s;
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
        li{
          display: inline-block;
          clear: both;
          width: calc(30% - 20px);
          height: 100px;
          box-shadow: 0 0 5px #D2D2D2;
          overflow: hidden;
          margin: 10px;
        }
        .selected-restaurant{
          height: 140px;
          width: calc(40% - 20px);
          border: solid 1px $gray;
          box-shadow: 0 0 5px #D2D2D2;
        }
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