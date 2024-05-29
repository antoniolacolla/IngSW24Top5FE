<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import axios from 'axios';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { popup } from 'leaflet';

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const markers = shallowRef([]);

onMounted(async () => {
  config.apiKey = 'I4M3OisYlYJWkLCFDwoa';

  // Effettua la chiamata API per ottenere le coordinate
  const response = await axios.get("/api/callRESTevento");
  const coordinates = response.data;

  const responseutente = await axios.get("/api/callRESTutente");
  const coordinateutente = responseutente.data;

  const initialState = { lng: 11.2892, lat: 44.7269, zoom: 4 };

  map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));

  // Aggiungi i marker con le coordinate ricevute
  coordinates.forEach(coord => {
    const popupContent = `
      <div class="popup-content">
        <h3 class="popup-title">${coord.nomevento}</h3>
        <a class="popup-link" href="https://www.google.com/maps/dir/${coordinateutente.latitudine},${coordinateutente.longitudine}/${coord.latitudine},${coord.longitudine}" target="_blank">Come arrivarci</a>
      </div>`;
    const popup = new Popup({ className: 'custom-popup' }).setHTML(popupContent);
    
    const marker = new Marker({ color: "#FF0000" })
      .setLngLat([coord.longitudine, coord.latitudine])
      .setPopup(popup) // Aggiungi il popup al marker
      .addTo(map.value);
    markers.value.push(marker);
});

// Marker e Popup utente
const popupUtente = new Popup({ className: 'custom-popup' }).setHTML("<h3 class='popup-title'>Ti trovi qui!</h3>");
const markerUtente = new Marker({ color: "#0000FF" }) // Colore diverso per il marker dell'utente
  .setLngLat([coordinateutente.longitudine, coordinateutente.latitudine])
  .setPopup(popupUtente)
  .addTo(map.value);
markers.value.push(markerUtente);
});

onUnmounted(() => {
  map.value?.remove();
  markers.value.forEach(marker => marker.remove());
});
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>