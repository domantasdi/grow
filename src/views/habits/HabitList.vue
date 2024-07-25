<script setup>
import { ref } from 'vue';
import HabitCard from '../../components/habits/HabitCard.vue';
import getStoredHabits, { HABITS_KEY } from './habits';
import AddHabit from './AddHabit.vue';

const habits = ref(getStoredHabits());

const handleAddHabit = (newHabit) => {
  habits.value.push(newHabit);
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits.value));
};
</script>

<template>
  <main>
    <!-- <p>{{ habits }}</p> -->
    <AddHabit @add-habit="handleAddHabit"></AddHabit>
    <HabitCard
      v-for="habit in habits.slice().reverse()"
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
