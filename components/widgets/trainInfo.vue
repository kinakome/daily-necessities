<template>
	<div class="train-info">
		<div class="train-info-header">
			Nearby Station
		</div>
		<div class="train-info-contents">
			<div class="train-info-contents-left">
				<div class="train-info-contents-left-title">現在地から近い駅</div>
				<!-- <div class="train-info-contents-left-title">駅名をスワイプして切替</div> -->
				<div class="train-info-contents-left-stations">
					<div class="arrow-up" @click="selectUp"></div>
					<div class="arrow-down" @click="selectDown"></div>
					<div class="station-box">
						<div class="station-box-item"></div>
						<div class="station-box-item selected-box"></div>
						<div class="station-box-item"></div>
					</div>
					<v-touch v-on:swipeup="selectUp" v-on:swipedown="selectDown">
						<transition-group name="station-list" tag="ul">
							<li v-for="(station, index) in updateStaions" :key=station :class="{'selected-station': index==1}">{{station}}</li>
						</transition-group>
					</v-touch>
				</div>
			</div>
			<div class="train-info-contents-right">
				<ul v-if="!load">
					<li v-for="(train, index) in selectedStation.train" :key=train.line :class="{'selected-station': index==1}">
						<div class="line-name">{{train.line}}</div> 
						<div class="line-distance">{{train.distance}} </div>
					</li>
				</ul>
				<no-ssr>
						<vue-loading type="spin" color="#333" :size="{ width: '100px', height: '100px' }" v-show="load"></vue-loading>
				</no-ssr>
				<div class="credit-area">©︎ HeartRails Express</div>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data(){
			return {
				stations: [],
				stationNames: [],
				selectedStation: {},
				selectedIndex: 1,
				load: true
			}
		},
		methods: {
			selectUp(){
				const head = this.stationNames.shift()
				this.stationNames.push(head)
				this.selectedIndex = (this.selectedIndex +1) % 3
				this.selectedStation = this.stations[this.selectedIndex]
			},
			selectDown(){
				const tail = this.stationNames.pop()
				this.stationNames.unshift(tail)
				this.selectedIndex = this.selectedIndex >= 1 ? (this.selectedIndex - 1) % 3 : 3 + ((this.selectedIndex - 1) % 3)
				this.selectedStation = this.stations[this.selectedIndex]
			}
		},
		computed: {
			//storeの駅情報が変更される度に発火
			updateStaions() {
				let stations = this.$store.getters['trainInfo/station']
				if(this.load){
					let stations = []
					let stationNames = []
					const result = this.$store.state.trainInfo.stations
					//駅名の重複排除
					const names = result.map(item => item.name).filter((value, index, self) => self.indexOf(value) == index)
					//同じ駅名の路線を集約してハッシュを作成
					for (let i in names) {
						var stationInfo = {
							name: names[i],
							train: result.filter(({name}) => name === names[i])
						}
						stations.push(stationInfo)
						stationNames.push(names[i])
					}
					this.selectedStation = stations[1]
					//駅名が3個ならロード完了
					this.load = stationNames.length == 3 ? false : true 

					this.stations = stations
					this.stationNames = stationNames
				}
				return this.stationNames
			}
		}
	};
</script>
<style lang="scss" scoped>
@import "~assets/style/app.scss";
.train-info{
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
		&-left{
			width: 40%;
			height: 100%;
			float: left;
			position: relative;
			&-title{
				position: absolute;
				height: 20px;
				width: 100%;
				text-align: left;
				padding:10px 0 0 10px;
				font-size: 12px;
				color: $gray;
			}
			&-stations{
				height: 100%;
				padding: 20px  0px;
				position: relative;
				.station-box{
					height: 100%;
					width: 100%;
					&-item{
						height: 30%;
						width: 100%;
					}
					.selected-box{
						height: 40%;
						background-color: $gray;
						font-weight: 700;
						color: $white;
						font-size: 20px;
					}
				}
				ul{
					list-style: none;
					float: left;
					position: absolute;
					top: 30px;
					left: 90px;
					z-index: 30;
					height: calc(100% - 40px);
					font-size: 20px;
					@include mobile{
						width: 100%;
						left: 0px;
						font-size: 16px;
					}
					li{
						text-align: center;
						display: block;
						color: $lightGray;
						width: 100%;
						height: 30%;
						padding-top: 13px;
						@include mobile {
							padding-left: 30px;
						}
					}
					.selected-station{
						font-weight: 700;
						color: $white;
						height: 40%;
						padding-top: 20px;
					}
				}
				.arrow-up{
					position: absolute;
					top: 90px;
					left: 15px;
					display: inline-block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 0 10px 12px 10px;
					border-color: transparent transparent $white transparent;
					transition: .3s;
					@include mobile{
						left: 10px;
						&:active{
							border-color: transparent transparent $lightGray transparent;
						}
					}
					@include pc{
						&:hover{
							border-color: transparent transparent $lightGray transparent;
						}
					}
				}
				.arrow-down{
					position: absolute;
					bottom: 90px;
					left: 15px;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 12px 10px 0 10px;
					border-color: $white transparent transparent transparent;
					@include mobile{
						left: 10px;
						&:active{
							border-color: $lightGray transparent transparent transparent;
						}
					}
					@include pc{
						&:hover{
							border-color: $lightGray transparent transparent transparent;
						}
					}
				}
				.station-list-move {
					transition: transform 1s;
				}
			}
		}
		&-right{
			border: solid 1px $gray;
			width: calc(60% - 10px);
			height: calc(100% - 20px);
			float: right;
			margin: 10px 10px 10px 0px;
			position: relative;
			overflow: scroll;
			ul{
				list-style: none;
				padding:10px;
				li {
					display: block;
					box-shadow: 0 0 5px $lightGray;
					padding: 7px;
					width: 90%;
					margin: 0 auto;
					margin-bottom: 10px;
					color: $baseBlack;
					.line{
						&-name{
							display: inline;
							@include mobile {
								display: block;
							}
						}
						&-distance{
							display: inline;
							@include mobile {
								display: block;
							}
						}
					}
				}
			}
		}
		.credit-area{
			position: absolute;
			color: $lightGray;
			font-size: 10px;
			bottom: 5px;
			right: 26px;
		}
	}
}

</style>