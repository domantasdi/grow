<script setup>
import HabitCard from '../../components/habits/HabitCard.vue';
import { useHabitsStore } from '../../store/useHabitsStore';
import DayOfWeek from '../../components/date-picker/DayOfWeek.vue';
import { getLastWeek } from '../../components/date-picker/dates';

const lastWeek = getLastWeek().reverse();
const habits = useHabitsStore();
</script>

<template>
  <main>
    <div class="week-navigation">
      <!-- <DateNavigation direction="–" /> -->
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
      <!-- <DateNavigation direction="+" /> -->
    </div>
    <HabitCard
      v-for="habit in habits.slice().reverse()"
      :key="habit.id"
      :habit="habit.habit"
      :trigger="habit.trigger"
      :addedOn="habit.addedOn"
      :checkedDates="habit.checkedDates"
      :currentDate="$route.params.date"
      positiveAction="Complete"
      negativeAction="Pause"
      @positiveAction="completeHabit(habit, $route.params.date)"
      @negativeAction="stopHabit(habit)"
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
  margin-bottom: 8px;
}

p {
  color: white;
}
</style>
