<template>
	<div class="cafe-list">
		<div class="cafe-list__header">
			大手カフェチェーン
		</div>
		<div class="cafe-list__contents">
			<div class="cafe-list__contents--top">
				<div class="cafe-list__contents--top title">上下にスクロール
        </div>
			</div>
      <div class="cafe-list__contents--main" v-if="!load">
        <div v-for="cafe in cafeList" :key="cafe.name" class="cafe-box">
          <a :href=cafe.url target="_blank" class="cafe-box__link">
            <div class="cafe-box__title">
              {{ cafe.name }}
            </div>
            <div class="cafe-box__content">
              営業時間：{{ cafe.opentime }}
              <br>
              <!-- <a :href=cafe.url target="_blank">ぐるなびで開く</a> -->
            </div>
          </a>
        </div>
      </div>
      <div class="cafe-list__contents--footer">
        Supported by <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">ぐるなびWebService</a>
      </div>
		</div>
	</div>
</template>

<script>
	export default {
    mounted(){
      if(this.cafeList.length !=0){
        this.load = false
      }
    },
		data(){
			return {
        rangeList: [{distance: "300m", type: 1},{distance: "500m", type: 2},{distance: "1km", type: 3}],
        selectedRange: 2,
        load: true,
        cafeGroupList: this.$store.state.cafeList.cafeGroupList,
        cafeList: this.$store.state.cafeList.cafeList
			}
		},
		methods: {
    },
    computed: {
      getCafeGroupList() {
        return this.$store.getters['cafeList/cafeGroupList']
      }
    },watch: {
      getCafeGroupList(newStatus){
        const cafeList = this.$store.getters['cafeList/cafeList']
        if(this.load){
          this.cafeGroupList = newStatus
          this.cafeList = cafeList
          console.log(this.cafeList)
        }
        if(cafeList.length !=0){
          this.load = false
        }
      }
    }
	};
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
.cafe-list{
	width: 100%;
	height: 100%;
	&__header{
		width: 100%;
		height: 50px;
		background-color: $black;
		color: $white;
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 25px;
		padding-top: 12px;
	}
	&__contents{
		width: 100%;
		height: calc(100% - 50px);
		font-family: 'Noto Sans JP', sans-serif;
    font-weight: 500;
    padding:10px;
    position: relative;
		&--top{
			width: 100%;
			height: 10%;
			float: left;
			position: relative;
      @include clearfix;
			.title{
				width: 30%;
				text-align: left;
				font-size: 12px;
        color: $gray;
        float: left;
        @include mobile {
          display: none;
        }
      }
    }
    &--main{
      height: 80%;
      width: 100%;
      overflow: scroll;
      display: flex;
      justify-content: space-around;
      // flex-direction: column;
      // flex-wrap: column wrap;
      flex-wrap: wrap;
      padding: 3px;
      .cafe-box{
        padding: 5px;
        height: 75px; 
        width: 180px;
        box-shadow: 0 0 5px $lightGray;
        margin:0px 5px 10px 0px ;
        transition: .3s;
        &__title{
          font-size: 14px;
          height: 33px;
          overflow: hidden;
        }
        &__content{
          font-size: 11px;
          height: 33px;
          overflow: hidden;
        }
        &__link{
          display: block;
          height: 100%;
          width: 100%;
          color: $black;
        }
        @include pc {
          &:hover{
            background-color: $lightGray;
          }
        }
        @include mobile {
          &:active{
            background-color: $lightGray;
          }
        }
      }
    }
    &--footer{
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