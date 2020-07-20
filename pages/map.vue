<template>
    <div id="map">
      <l-map
        style="min-height: 78vh"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: true}"
        v-if="getLocation && stations.length !=0"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="center">
          <l-popup :content="'現在地'"></l-popup>
        </l-marker>
        <l-marker v-for="station of stations" :lat-lng="[station.location.latitude, station.location.longitude]" 
          :key="station.name" 
        >
          <!-- <l-popup :content="station.name + '駅'"></l-popup> -->
          <l-popup :content="station.name + '駅'" ></l-popup>
        </l-marker>
        <l-marker v-for="cafe of cafeList" :lat-lng="[cafe.latitude, cafe.longitude]" 
          :key="cafe.name" 
        >
          <l-popup :content="cafe.name + '<br/>' + cafe.opentime + '<br/><a target=\'_blank\' href=\'' + cafe.url + '\'>ぐるなびで開く</a>'" ></l-popup>
        </l-marker>
      </l-map>
      <vue-loading type="spin" color="#333" :size="{ width: '100px', height: '100px' }" v-else></vue-loading>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 17,
      center: [this.$store.state.location.latitude, this.$store.state.location.longitude],
      stations: this.$store.state.trainInfo.stationInfo,
      marker: {},
      cafeList: this.$store.state.cafeList.cafeList
    }
  },
  computed: {
    getLocation() {
      return this.$store.getters['getLocation']
    },
    getStation() {
      return this.$store.getters['trainInfo/stations']
    },
    getCafeList() {
      return this.$store.getters['cafeList/cafeList']
    }
  },
  watch: {
    getLocation(newStatus) {
      this.center = [this.$store.state.location.latitude, this.$store.state.location.longitude]
      this.marker.center = [this.$store.state.location.latitude, this.$store.state.location.longitude]
    },
    getStation(newStatus) {
      let stations = []
      //駅名の重複排除
      const names = newStatus.map(item => item.name).filter((value, index, self) => self.indexOf(value) == index)
      //同じ駅名の路線を集約してハッシュを作成
      names.forEach(staName => {
        let tmpStation = newStatus.find(({name}) => name === staName)
        var stationInfo = {
          name: staName,
          train: newStatus.filter(({name}) => name === staName),
          location: {
            latitude: tmpStation.y,
            longitude: tmpStation.x
          }
        }
        stations.push(stationInfo)
      })
      this.stations = stations
      this.$store.commit('trainInfo/updateStationInfo', stations)
    },
    getcafe(newStatus) {
      this.cafe = newStatus
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
#map {
  // height: 50%;
  width: 100%;
  overflow: hidden;
}
</style>
