<template>
    <l-map
      style="min-height: 100vh"
      :zoom="zoom"
      :center="center"
      :options="{zoomControl: false}"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
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
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 10,
      center: [47.31322, -1.319482]
    }
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
