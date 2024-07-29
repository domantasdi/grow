<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import HabitCard from '../components/habits/HabitCard.vue';
import DayOfWeek from '../components/date-picker/DayOfWeek.vue';
import { getLastWeek } from '../components/date-picker/dates';
import getStoredHabits, { HABITS_KEY } from './habits/habits';

const route = useRoute();
const lastWeek = getLastWeek().reverse();
const habits = ref(getStoredHabits());

const weekStatus = computed(() => {
  return lastWeek.map((day) => {
    let completedCount = 0;
    let habitCount = 0;

    habits.value.forEach((habit) => {
      if (!habit.isStopped) {
        habitCount += 1;
        if (habit.checkedDates && habit.checkedDates[day.isoDate]) {
          completedCount += 1;
        }
      }
    });

    return {
      ...day,
      noHabitsCompleted: habitCount > 0 && completedCount === 0,
      atLeastOneCompleted: completedCount > 0 && completedCount < habitCount,
      allCompleted: habitCount > 0 && completedCount === habitCount
    };
  });
});

// Habit-related functions

const saveHabits = () => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits.value));
};

const completeHabit = (habit, date) => {
  if (!habit.checkedDates) {
    habit.checkedDates = {};
  }
  habit.checkedDates[date] = true;
  saveHabits();
};

const isHabitPaused = (habit, date) => {
  return habit.pausedPeriods.some(
    (period) => period.start <= date && (!period.end || period.end >= date)
  );
};

const filteredHabits = computed(() => {
  const currentDate = route.params.date;
  return habits.value.filter(
    (habit) => !isHabitPaused(habit, currentDate) && !habit.isStopped
  );
});

// const filteredHabits = computed(() => {
//   return habits.value.filter((habit) => !habit.isStopped);
// });
</script>

<template>
  <main>
    <h1>{{ $route.params.date }}</h1>
    <div class="week-navigation">
      <div v-if="habits.length === 0">
        <p>No habits to display. Try adding one now!</p>
      </div>
      <div v-for="selectedDay in weekStatus" :key="selectedDay.isoDate">
        <RouterLink
          :to="{ name: 'day', params: { date: selectedDay.isoDate } }"
        >
          <DayOfWeek
            :weekday="selectedDay.weekday"
            :monthAndDay="selectedDay.monthAndDay"
            :isoDate="selectedDay.isoDate"
            :currentDate="$route.params.date"
            :noHabitsCompleted="selectedDay.noHabitsCompleted"
            :atLeastOneCompleted="selectedDay.atLeastOneCompleted"
            :allCompleted="selectedDay.allCompleted"
          />
        </RouterLink>
      </div>
    </div>

    <div class="habit-cards">
      <HabitCard
        v-for="habit in filteredHabits.slice().reverse()"
        :id="habit.id"
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
    </div>
  </main>
</template>

<style>
div.habit-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  color: #fff;
  font-size: 18px;
  padding: 0;
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
