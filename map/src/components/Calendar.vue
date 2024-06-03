<template>
  <div>
    <!-- Calendario per visualizzare gli eventi mock -->
    <vue-cal
      class="vuecal--green-theme"
      :disable-views="['years']"
      style="height: 600px"
      :events="calendarEvents"
      default-view="month"
      locale="en"
    ></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css'; // Importa gli stili di vue-cal

export default {
  components: {
    VueCal, // Dichiarazione del componente VueCal
  },
  data() {
    return {
      events: [], // Aggiungi un array per memorizzare gli eventi
    };
  },
  computed: {
    calendarEvents() {
      // Mappa gli eventi mock nel formato richiesto da vue-cal
      return this.events.map(event => {
        // Estrai l'ora di inizio e fine dall'orario dell'evento
        const [startHour, startMinute] = event.orarioevento.split(' - ')[0].split(':');
        const [endHour, endMinute] = event.orarioevento.split(' - ')[1].split(':');

        // Crea un oggetto Date per l'orario di inizio
        const startDateTime = new Date(event.dataevento);
        startDateTime.setHours(startHour);
        startDateTime.setMinutes(startMinute);

        // Crea un oggetto Date per l'orario di fine
        const endDateTime = new Date(event.dataevento);
        endDateTime.setHours(endHour);
        endDateTime.setMinutes(endMinute);

        // Restituisce un oggetto evento nel formato richiesto da vue-cal
        return {
          start: startDateTime,
          end: endDateTime,
          title: event.nomevento,
          content: event.descrizionevento,
        };
      });
    },
  },
  mounted() {
    this.fetchMockEvents(); // Chiamare l'API mock quando il componente è montato
  },
  methods: {
    async fetchMockEvents() {
      try {
        const response = await fetch('/api/callRESTcalendario'); // Chiamata all'API mock per ottenere gli eventi
        const data = await response.json(); // Parsing della risposta JSON
        this.events = data; // Assegna i dati degli eventi all'array events
        console.log('Mock events:', data); // Log degli eventi mock
      } catch (error) {
        console.error('Error fetching mock events:', error); // Log degli errori in caso di problemi
      }
    },
  },
};
</script>