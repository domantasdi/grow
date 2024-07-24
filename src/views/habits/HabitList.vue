<script setup>
import { ref, watch } from 'vue';
import HabitCard from '../../components/habits/HabitCard.vue';
import getStoredHabits, { HABITS_KEY } from './habits';
import HabitDetails from './HabitDetails.vue';

const habits = ref(getStoredHabits());

watch(habits, (updatedHabits) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(updatedHabits));
});
</script>

<template>
  <main>
    <HabitDetails></HabitDetails>
    <HabitCard
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit.habit"
      :trigger="habit.trigger"
      :trackingSince="habit.trackingSince"
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

p {
  color: white;
}
</style>
