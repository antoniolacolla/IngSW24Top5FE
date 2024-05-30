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
          <td v-for="day in week" :key="day.fullDate" @click="selectDay(day.date)">
            <div :class="{ 'current-month': day.currentMonth, 'other-month': !day.currentMonth }">
              {{ day.date }}
              <div v-if="events[day.fullDate]" class="event">
                {{ events[day.fullDate].nomevento }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
      events: {
        '2024-6-5': { nomevento: 'Paparazzi' }
      },
      selectedDay: null,
      eventText: '',
    };
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
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      let day = 1 - (firstDay === 0 ? 6 : firstDay - 1);
      while (day <= this.daysInMonth.length) {
        weeks.push(Array.from({ length: 7 }, () => {
          const currentDay = day > 0 && day <= this.daysInMonth.length ? day : null;
          const date = new Date(this.currentYear, this.currentMonth, currentDay);
          const fullDate = date.toISOString().split('T')[0];
          day++;
          return { date: currentDay, fullDate, currentMonth: currentDay !== null };
        }));
      }
      return weeks;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentMonth - 1);
      this.currentDate = new Date(this.currentDate);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentMonth + 1);
      this.currentDate = new Date(this.currentDate);
    },
    selectDay(day) {
      this.selectedDay = { date: day, month: this.currentMonth, year: this.currentYear };
    },
    clearSelection() {
      this.selectedDay = null;
      this.eventText = '';
    },
    addEvent() {
      if (this.eventText.trim()) {
        const fullDate = new Date(this.selectedDay.year, this.selectedDay.month, this.selectedDay.date).toISOString().split('T')[0];
        this.$set(this.events, fullDate, { nomevento: this.eventText });
        this.clearSelection();
      }
    },
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

.event {
  background-color: #007bff;
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.9em;
  text-align: center;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.event-input {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.event-input input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.event-input button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.event-input button:hover {
  background-color: #0056b3;
}
</style>