<template>
  <div>
    <p>CALENDARIO DEGLI EVENTI</p>

    <!-- Calendario per visualizzare gli eventi mock -->
    <vue-cal
      style="height: 600px"
      :events="calendarEvents"
      default-view="month"
      locale="it"
    ></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css'; // Importa gli stili di vue-cal

export default {
  components: {
    VueCal,
  },
  data() {
    return {
      events: [], // Aggiungi un array per memorizzare gli eventi
    };
  },
  computed: {
    calendarEvents() {
      // Mappa gli eventi mock nel formato richiesto da vue-cal
      return this.events.map(event => ({
        start: event.dataevento,
        end: event.dataevento,
        title: event.nomevento,
        content: event.descrizionevento,
      }));
    },
  },
  mounted() {
    this.fetchMockEvents(); // Chiamare l'API mock quando il componente è montato
  },
  methods: {
    async fetchMockEvents() {
      try {
        const response = await fetch('/api/callRESTcalendario');
        const data = await response.json();
        this.events = data;
        console.log('Mock events:', data); // Log degli eventi mock
      } catch (error) {
        console.error('Error fetching mock events:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Stili personalizzati per il calendario */
.vue-cal {
  font-family: Arial, sans-serif;
}

/* Stile per gli eventi nel calendario */
.vue-cal-event {
  background-color: #2196F3;
  color: #fff;
  border: 1px solid #1976D2;
  border-radius: 3px;
  padding: 5px;
  margin-bottom: 5px;
}

/* Stile per il titolo degli eventi */
.vue-cal-event-title {
  font-weight: bold;
}

/* Stile per la data degli eventi */
.vue-cal-event-date {
  font-style: italic;
}

/* Stile per la descrizione degli eventi */
.vue-cal-event-content {
  font-size: 14px;
}

/* Stile per il giorno della settimana nel header del calendario */
.vue-cal-header-weekday {
  background-color: #f2f2f2;
}

/* Stile per il nome del mese nel header del calendario */
.vue-cal-header-monthname {
  color: #2196F3;
  font-size: 20px;
}

/* Stile per i pulsanti di navigazione nel header del calendario */
.vue-cal-header-nav-button {
  background-color: #2196F3;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

/* Stile per il testo nei pulsanti di navigazione */
.vue-cal-header-nav-button-text {
  font-weight: bold;
}

/* Stile per il giorno della settimana nel corpo del calendario */
.vue-cal-body-dayname {
  font-weight: bold;
}

/* Stile per il numero del giorno nel corpo del calendario */
.vue-cal-body-daynum {
  color: #333;
}

/* Stile per il giorno corrente nel corpo del calendario */
.vue-cal-body-day.current-month.current-day {
  background-color: #e1f5fe;
}

/* Stile per i giorni fuori mese nel corpo del calendario */
.vue-cal-body-day.other-month {
  color: #ccc;
}
</style>