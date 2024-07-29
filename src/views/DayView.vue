<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import HabitCard from '../components/habits/HabitCard.vue';
import DayOfWeek from '../components/date-picker/DayOfWeek.vue';
import { getLastWeek } from '../components/date-picker/dates';
import getStoredHabits, { HABITS_KEY } from './habits/habits';
import StopOverlay from '../components/dialogs/StopOverlay.vue';

const route = useRoute();
const lastWeek = getLastWeek().reverse();
const habits = ref(getStoredHabits());
const showStopDialog = ref(false);
const selectedHabit = ref('');

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

const openStopDialog = (habit) => {
  showStopDialog.value = true;
  selectedHabit.value = habit;
};

const closeStopDialog = () => {
  showStopDialog.value = false;
};

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

const stopHabit = (habit) => {
  const stopDate = route.params.date;
  habit.stoppedOn = stopDate;

  const futureDates = lastWeek.filter((day) => day.isoDate >= stopDate);
  futureDates.forEach((day) => {
    if (!habit.checkedDates) {
      habit.checkedDates = {};
    }
    habit.checkedDates[day.isoDate] = true;
  });

  saveHabits();
  closeStopDialog();
};

const activeHabits = computed(() => {
  const currentDate = route.params.date;
  return habits.value.filter(
    (habit) => !habit.stoppedOn || habit.stoppedOn > currentDate
  );
});

// const filteredHabits = computed(() => {
//   return habits.value.filter((habit) => !habit.isStopped);
// });
</script>

<template>
  <main>
    <h1>Active habits for {{ $route.params.date }}</h1>
    <div class="week-navigation">
      <div v-for="selectedDay in weekStatus" :key="selectedDay.isoDate">
        <RouterLink
          :to="{ name: 'day', params: { date: selectedDay.isoDate } }"
        >
          <DayOfWeek
            :weekday="selectedDay.weekday"
            :monthAndDay="selectedDay.monthAndDay"
            :isoDate="selectedDay.isoDate"
            :currentDate="$route.params.date"
            :habits:="habits.value"
            :noHabitsCompleted="selectedDay.noHabitsCompleted"
            :atLeastOneCompleted="selectedDay.atLeastOneCompleted"
            :allCompleted="selectedDay.allCompleted"
          />
        </RouterLink>
      </div>
    </div>
    <div class="information" v-if="habits.length === 0">
      <p>No habits added yet! Try adding one now in Habit management!</p>
    </div>
    <div class="habit-cards">
      <HabitCard
        v-for="habit in activeHabits.slice().reverse()"
        :id="habit.id"
        :key="habit.id"
        :habit="habit.habit"
        :trigger="habit.trigger"
        :addedOn="habit.addedOn"
        :checkedDates="habit.checkedDates"
        :currentDate="route.params.date"
        positiveAction="Complete"
        negativeAction="Stop"
        @positiveAction="completeHabit(habit, route.params.date)"
        @negativeAction="openStopDialog(habit)"
      />
    </div>
  </main>

  <StopOverlay
    v-if="showStopDialog"
    @commit="stopHabit(selectedHabit)"
    @close="closeStopDialog"
  >
    <template #header> Stop habit? </template>
    <template #bodyText>
      Are you sure you want to stop the habit
      <strong>{{ selectedHabit.habit }}</strong
      >? The habit will not appear in further days. This action will not delete
      the habit's records, but it cannot be undone.
    </template>
    <template #positive-action>
      <div @keydown="Tab" role="button" tabindex="0">Cancel</div>
    </template>
    <template #negative-action>
      <div @keydown="Tab" role="button" tabindex="0">Yes, stop</div>
    </template>
  </StopOverlay>
</template>

<style>
div.information {
  color: #fff;
}

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
