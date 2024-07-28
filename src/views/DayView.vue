<script setup>
import { ref } from 'vue';
import HabitCard from '../components/habits/HabitCard.vue';
import DateNavigation from '../components/date-picker/DateNavigation.vue';
import DayOfWeek from '../components/date-picker/DayOfWeek.vue';
import getStoredHabits from './habits/habits';
import { getLastWeek } from '../components/date-picker/dates';

const lastWeek = getLastWeek().reverse();
const habits = ref(getStoredHabits());
</script>

<template>
  <main>
    <div class="week-navigation">
      <DateNavigation direction="–" />
      <div v-for="selectedDay in lastWeek" :key="selectedDay.isoDate">
        <RouterLink
          :to="{ name: 'day', params: { date: selectedDay.isoDate } }"
        >
          <DayOfWeek
            :weekday="selectedDay.weekday"
            :monthAndDay="selectedDay.monthAndDay"
          />
        </RouterLink>
      </div>
      <DateNavigation direction="+" />
    </div>

    <HabitCard
      v-for="habit in habits.slice().reverse()"
      :key="habit.id"
      :habit="habit.habit"
      :trigger="habit.trigger"
      :trackingSince="habit.trackingSince"
      positiveAction="Done"
      negativeAction="Stop"
    />
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

div.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
}

@media (width >= 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
