<template>
    <div id="map">
      <l-map
        style="min-height: 100vh"
        :zoom="zoom"
        :center="center"
        :options="{zoomControl: false}"
      >
        <l-tile-layer :url="url"></l-tile-layer>
      </l-map>
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
      zoom: 20,
      center: [this.$store.state.location.latitude, this.$store.state.location.longitude]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/app.scss";
#map {
  height: 50%;
  width: 100%;
}
</style>
