import { ref, watch } from 'vue';

export const HABITS_KEY = 'habits';

function getStoredHabits() {
  try {
    const storedHabits = localStorage.getItem(HABITS_KEY);
    return storedHabits ? JSON.parse(storedHabits) : [];
  } catch (err) {
    return [];
  }
}

const habits = ref(getStoredHabits());

watch(habits, (updatedHabits) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(updatedHabits));
});

export default getStoredHabits;
