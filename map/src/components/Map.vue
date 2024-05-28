
<template>
    <div class="map-wrap">
      <div class="map" ref="mapContainer"></div>
    </div>
  </template>
  
  <script setup>
  import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
  import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
  import axios from 'axios'; // Importa Axios
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  
  const mapContainer = shallowRef(null);
  const map = shallowRef(null);
  const marker = shallowRef(null);
  
  onMounted(async () => {
    config.apiKey = 'I4M3OisYlYJWkLCFDwoa';
  
    // Effettua la chiamata API per ottenere le coordinate
    const response = await axios.get("/api/callRESTevento");
    const data = response.data;
    const latitudine = data.latitudine;
    const longitudine = data.longitudine;
  
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 0 };
  
    map.value = markRaw(new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    }));
  
    // Aggiungi il marker con le coordinate ricevute
    marker.value = new Marker({ color: "#FF0000" })
      .setLngLat([longitudine, latitudine])
      .addTo(map.value);
  });
  
  onUnmounted(() => {
    map.value?.remove();
    marker.value?.remove();
  });
  </script>
  
  <style scoped>
  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>
  