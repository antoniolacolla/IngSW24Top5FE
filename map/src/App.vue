<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-brand">QUI PUOI CONSULTARE GLI EVENTI DISPONIBILI SULLA MAPPA</div>
      <button class="calendar-button" @click="openCalendarPopup">Apri Calendario</button>
    </nav>

    <!-- Popup del Calendario -->
    <div v-if="showCalendarPopup" class="popup-overlay" @click="closeCalendarPopup">
      <div class="popup-content" @click.stop>
        <Calendar />
      </div>
    </div>

    <!-- Mappa -->
    <div class="main-content">
      <Map />
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'; // Importa il componente del calendario
import Map from './components/Map.vue'; // Importa il componente della mappa

export default {
  components: {
    Calendar,
    Map
  },
  data() {
    return {
      showCalendarPopup: false, // Stato per gestire la visualizzazione del popup del calendario
    };
  },
  methods: {
    openCalendarPopup() {
      this.showCalendarPopup = true; // Mostra il popup del calendario
    },
    closeCalendarPopup() {
      this.showCalendarPopup = false; // Nasconde il popup del calendario
    },
  },
};
</script>

<style scoped>

/* Stili della Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #035d14; /* Colore di sfondo della navbar */
  padding: 10px 20px;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Assicura che la navbar sia sopra gli altri contenuti */
}

.navbar-brand {
  font-size: 1.5em;
  font-weight: bold;
  flex-grow: 1; /* Per centrare il testo */
  font-family: 'Century Gothic', serif; /* Font della navbar */
}

.calendar-button {
  padding: 10px 20px;
  background-color: #013b0d; /* Colore di sfondo del pulsante del calendario */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 2%; /* Aggiunto margine alla destra */
}

.calendar-button:hover {
  background-color: #004085; /* Colore di sfondo del pulsante al passaggio del mouse */
}

/* Stili del Popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Sfondo semi-trasparente per il popup */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Assicura che il popup sia sopra gli altri contenuti */
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto; /* Permette lo scorrimento verticale se il contenuto è troppo alto */
}

/* Stili del Contenuto Principale */
.main-content {
  padding-top: 60px; /* Regola per posizionare il contenuto sotto la navbar */
  height: calc(100vh - 60px); /* Altezza piena del viewport meno l'altezza della navbar */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-content h1 {
  margin-top: 20px;
  font-size: 2em;
}

/* Stili della Mappa */
.map-wrap {
  position: absolute;
  top: 5.5%; /* Altezza della navbar */
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 0; /* Margine negativo per sovrapporre la mappa con la navbar */
}
</style>