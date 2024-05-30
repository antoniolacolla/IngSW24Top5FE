<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-brand"><center>Visualizza gli eventi</center></div>
      <button class="calendar-button" @click="openCalendarPopup">Apri Calendario</button>
    </nav>

    <!-- Popup Calendar -->
    <div v-if="showCalendarPopup" class="popup-overlay" @click="closeCalendarPopup">
      <div class="popup-content" @click.stop>
        <Calendar />
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <Map />
      <!-- Add your map component or other content here -->
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue';
import Map from './components/Map.vue';

export default {
  components: {
    Calendar,
    Map
  },
  data() {
    return {
      showCalendarPopup: false,
    };
  },
  methods: {
    openCalendarPopup() {
      this.showCalendarPopup = true;
    },
    closeCalendarPopup() {
      this.showCalendarPopup = false;
    },
  },
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
  flex-grow: 1; /* Per centrare il testo */
}

.calendar-button {
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 2%; /* Aggiunto margine alla destra */
}

.calendar-button:hover {
  background-color: #004085;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

/* Main Content Styles */
.main-content {
  padding-top: 60px; /* Adjust to fit below the navbar */
  height: calc(100vh - 60px); /* Full viewport height minus navbar height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-content h1 {
  margin-top: 20px;
  font-size: 2em;
}

/* Map Styles */
.map-wrap {
  position: absolute;
  top: 7%; /* Height of the navbar */
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 0; /* Negative margin to overlap with the navbar */
}
</style>


//antonino