<!-- eslint-disable no-param-reassign -->
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import HabitCard from '../components/habits/HabitCard.vue';
import DayOfWeek from '../components/date-picker/DayOfWeek.vue';
import { getLastWeek } from '../components/date-picker/dates';
import StopDialog from '../components/dialogs/StopDialog.vue';
import { useHabitsStore } from '../store/useHabitsStore';

const route = useRoute();
const lastWeek = getLastWeek().reverse();
const habits = useHabitsStore();
const showStopDialog = ref(false);
const selectedHabit = ref('');

const activeHabits = computed(() => {
  const currentDate = route.params.date;
  return habits.value.filter(
    (habit) => !habit.stoppedOn || habit.stoppedOn > currentDate
  );
});

const stoppedHabits = computed(() => {
  const currentDate = route.params.date;
  return habits.value.filter(
    (habit) => habit.stoppedOn && habit.stoppedOn <= currentDate
  );
});

const calculateDayStatus = (isoDate) => {
  const activeHabitsForDate = habits.value.filter((habit) => {
    return !habit.stoppedOn || habit.stoppedOn > isoDate;
  });

  const completedCount = activeHabitsForDate.filter(
    (habit) => habit.checkedDates[isoDate]
  ).length;
  const habitCount = activeHabitsForDate.length;

  if (habitCount === 0) {
    return 'none';
  }
  if (completedCount === habitCount) {
    return 'all';
  }
  if (completedCount > 0) {
    return 'some';
  }
  return 'none';
};

const weekStatus = computed(() => {
  return lastWeek.map((day) => {
    return {
      ...day,
      status: calculateDayStatus(day.isoDate)
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

const completeHabit = (habit, date) => {
  if (!habit.checkedDates) {
    habit.checkedDates = {};
  }
  habit.checkedDates[date] = true;
};

const stopHabit = (habit) => {
  const stopDate = route.params.date;
  habit.stoppedOn = stopDate;
  closeStopDialog();
};
</script>

<template>
  <main>
    <h1>List of habits for {{ $route.params.date }}</h1>
    <div class="week-navigation">
      <div v-for="selectedDay in weekStatus" :key="selectedDay.isoDate">
        <RouterLink
          :to="{ name: 'day', params: { date: selectedDay.isoDate } }"
        >
          <DayOfWeek
            :monthAndDay="selectedDay.monthAndDay"
            :weekday="selectedDay.weekday"
            :isoDate="selectedDay.isoDate"
            :currentDate="$route.params.date"
            :status="selectedDay.status"
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
    <div v-if="stoppedHabits.length !== 0">
      <p>Note: some habits are stopped and hidden from tracking.</p>
    </div>
  </main>

  <StopDialog
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
  </StopDialog>
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
