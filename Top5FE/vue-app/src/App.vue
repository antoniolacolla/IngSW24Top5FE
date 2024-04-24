<template>
  <div id="map" style="height: 500px;"></div>
</template>




<script>
import * as maptilersdk from '@maptiler/sdk';

maptilersdk.config.apiKey = 'I4M3OisYlYJWkLCFDwoa';
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  style: maptilersdk.MapStyle.STREETS,
  center: [16.62662018, 49.2125578], // starting position [lng, lat]
  zoom: 14, // starting zoom
});
</script>

<style>

</style>
