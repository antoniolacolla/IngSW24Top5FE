<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth" class="prev-next-button">Prev</button>
      <div class="header-title">{{ currentMonthName }} {{ currentYear }}</div>
      <button @click="nextMonth" class="prev-next-button">Next</button>
    </div>
    <table class="calendar-table">
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeksInMonth" :key="week[0].fullDate">
          <td v-for="day in week" :key="day.fullDate" @click="day.date && showPopup(day.fullDate)" :class="{ 'clickable': day.event }">
            <div :class="{ 'current-month': day.currentMonth, 'other-month': !day.currentMonth }">
              {{ day.date }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Popup for displaying the event details -->
    <div v-if="showEventPopup" class="popup-overlay" @click="hidePopup">
      <div class="popup-content" @click.stop>
        <h3>{{ selectedEvent.nomevento }}</h3>
        <p>{{ selectedEvent.descrizionevento }}</p>
        <p>{{ selectedEvent.dataevento }}</p>
        <button @click="hidePopup" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

function normalizeDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
      showEventPopup: false,
      selectedEvent: null,
      events: []
    };
  },
  async created() {
    await this.fetchEvents();
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentMonth() {
      return this.currentDate.getMonth();
    },
    currentMonthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' });
    },
    daysInMonth() {
      const days = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    weeksInMonth() {
      const weeks = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = this.daysInMonth.length;
      let dayCounter = 1 - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

      while (dayCounter <= daysInMonth) {
        const week = Array.from({ length: 7 }, () => {
          const currentDay = dayCounter > 0 && dayCounter <= daysInMonth ? dayCounter : null;
          const date = new Date(this.currentYear, this.currentMonth, currentDay || 1);
          const fullDate = currentDay ? date.toISOString().split('T')[0] : '';
          dayCounter++;
          return { date: currentDay, fullDate, currentMonth: currentDay !== null, event: this.events.find(event => event.dataevento.startsWith(fullDate)) };
        });
        weeks.push(week);
      }
      return weeks;
    },
  },
  methods: {
    async fetchEvents() {
      const response = await axios.get('/api/callRESTcalendario');
      this.events = response.data;
    },
    prevMonth() {
      this.currentDate.setMonth(this.currentMonth - 1);
      this.currentDate = new Date(this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentMonth + 1);
      this.currentDate = new Date(this.currentDate);
    },
    showPopup(date) {
      const normalizedDate = normalizeDate(date);
      const event = this.events.find(event => {
        const eventDate = normalizeDate(event.dataevento);
        return eventDate === normalizedDate;
      });
      if (event) {
        this.selectedEvent = event;
        this.showEventPopup = true;
      } else {
        // Chiudi il popup se non ci sono eventi per la data cliccata
        this.hidePopup();
      }
    },
    hidePopup() {
      this.showEventPopup = false;
      this.selectedEvent = null;
    }
  },
};
</script>

<style scoped>
.calendar {
  width: 100%;
  text-align: center;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header-title {
  flex-grow: 1;
}

.prev-next-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table th, .calendar-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  vertical-align: top;
}

.calendar-table th {
  background-color: #f4f4f4;
}

.current-month {
  background-color: #fff;
}

.other-month {
  background-color: #f9f9f9;
}

.clickable {
  cursor: pointer;
}

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
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.close-button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>

//antonino