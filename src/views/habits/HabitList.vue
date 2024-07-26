<script setup>
import { ref } from 'vue';
import HabitCard from '../../components/habits/HabitCard.vue';
import getStoredHabits from './habits';

import DayOfWeek from '../../components/date-picker/DayOfWeek.vue';
import DateNavigation from '../../components/date-picker/DateNavigation.vue';
import { getLastWeek } from '../../components/date-picker/dates';

// const currentDate = getCurrentDate();
const lastWeek = getLastWeek().reverse();

const habits = ref(getStoredHabits());
</script>

<template>
  <main>
    <div class="week-navigation">
      <DateNavigation direction="–" />
      <DayOfWeek
        v-for="day in lastWeek"
        :key="day.weekday"
        :weekday="day.weekday"
        :monthAndDay="day.monthAndDay"
      />
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

<style scoped>
/* stylelint-disable-next-line selector-type-case */
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

  /* height: 48px; */
}

p {
  color: white;
}
</style>
