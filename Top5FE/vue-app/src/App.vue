<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const mapOptions = {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 0
      };
      const mapElement = document.getElementById('map');
      new google.maps.Map(mapElement, mapOptions);
    }
  }
}
</script>

<style>
#map {

  width: 100%; /* Assicurati che la mappa occupi tutta la larghezza possibile */
}
</style>
