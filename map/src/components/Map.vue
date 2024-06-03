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

const mapContainer = shallowRef(null);
const map = shallowRef(null);
const markers = shallowRef([]);

onMounted(async () => {
  config.apiKey = 'I4M3OisYlYJWkLCFDwoa';

  // Effettua la chiamata API per ottenere le coordinate
  const response = await axios.get("/api/callRESTevento");
  const coordinates = response.data;

  const responseUtente = await axios.get("/api/callRESTutente");
  const coordinateUtente = responseUtente.data;

  const initialState = { lng: 11.2892, lat: 44.7269, zoom: 4 };

  map.value = markRaw(new Map({
    container: mapContainer.value,
    style: MapStyle.STREETS,
    center: [initialState.lng, initialState.lat],
    zoom: initialState.zoom
  }));
  

  // Aggiungi i marker con le coordinate ricevute
  coordinates.forEach(coord => {
    const eventName = coord.nomevento.replace(/\s+/g, ''); // Rimuove gli spazi dal nome dell'evento
    const popupContent = `
      <div class="popup-content">
        <h3 class="popup-title">${coord.nomevento}</h3>
        <a class="popup-link" href="https://www.google.com/maps/dir/${coordinateUtente.latitudine},${coordinateUtente.longitudine}/${coord.latitudine},${coord.longitudine}" target="_blank">Come arrivarci</a>
        <div class="social-links">
          <a href="https://x.com/${coord.nomevento}" target="_blank"><img src="/x-icon.png" alt="X" class="social-icon" /></a>
          <a href="https://instagram.com/${coord.nomevento}" target="_blank"><img src="/instagram-icon.png" alt="Instagram" class="social-icon" /></a>
          <a href="https://facebook.com/${coord.nomevento}" target="_blank"><img src="/facebook-icon.png" alt="Facebook" class="social-icon" /></a>
        </div>
      </div>`;

    const popup = new Popup({ className: 'custom-popup' }).setHTML(popupContent);
    
    // Imposta il colore del marker in base all'accessibilità dell'evento
    const markerColor = coord.accessibilità === "privato" ? "#e6e6fa" : "#ff0000";

    const marker = new Marker({ color: markerColor })
      .setLngLat([coord.longitudine, coord.latitudine])
      .setPopup(popup) // Aggiungi il popup al marker
      .addTo(map.value);
    markers.value.push(marker);
  });

  // Marker e Popup utente
  const popupUtente = new Popup({ className: 'custom-popup' }).setHTML("<h3 class='popup-title'>Ti trovi qui!</h3>");
  const markerUtente = new Marker({ color: "#4169e1" }) // Colore diverso per il marker dell'utente
    .setLngLat([coordinateUtente.longitudine, coordinateUtente.latitudine])
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
  position: absolute;
  top: 60px; /* Height of the navbar */
  width: 100%;
  bottom: 0; /* Ensure it stretches to the bottom */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-title {
  margin-bottom: 10px;
}

.popup-link {
  margin-bottom: 10px;
  color: #007bff;
  text-decoration: none;
}

.social-links {
  display: flex;
  gap: 1px;
}

.social-icon {
  width: 1%;
  height: 1%;
}
</style>
