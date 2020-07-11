<template>
    <div id="map">
      <l-map
        style="min-height: 78vh"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: true}"
        v-if="getLocation"
      >
        <l-tile-layer :url="url"></l-tile-layer>
      </l-map>
      <vue-loading type="spin" color="#333" :size="{ width: '100px', height: '100px' }" v-else></vue-loading>
    </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 17,
      center: [this.$store.state.location.latitude, this.$store.state.location.longitude]
    }
  },
  computed: {
    getLocation() {
      return this.$store.getters['getLocation']
    }
  },
  watch: {
    getLocation(newStatus) {
      this.center = [this.$store.state.location.latitude, this.$store.state.location.longitude]
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
