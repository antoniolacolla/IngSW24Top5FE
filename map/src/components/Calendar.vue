<template>
  <div>
    <p></p>

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
      return this.events.map(event => {
        const [startHour, startMinute] = event.orarioevento.split(' - ')[0].split(':');
        const [endHour, endMinute] = event.orarioevento.split(' - ')[1].split(':');

        const startDateTime = new Date(event.dataevento);
        startDateTime.setHours(startHour);
        startDateTime.setMinutes(startMinute);

        const endDateTime = new Date(event.dataevento);
        endDateTime.setHours(endHour);
        endDateTime.setMinutes(endMinute);

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


