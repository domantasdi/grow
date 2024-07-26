<script setup>
import { ref } from 'vue';
import getStoredHabits, { HABITS_KEY } from './habits';

const habitTitle = ref('');
const habitTrigger = ref('');
const errorMessage = ref('');

const emit = defineEmits(['add-habit']);

const addHabit = () => {
  // Emptying the error message
  errorMessage.value = '';

  // Error message for empty inputs
  if (!habitTitle.value.trim() || !habitTrigger.value.trim()) {
    errorMessage.value = 'Both fields are required.';
    return;
  }

  const habits = getStoredHabits();

  // Checking which ID to use
  let lastHabitId;
  if (habits.length === 0) {
    lastHabitId = 0;
  } else {
    lastHabitId = habits[habits.length - 1].id;
  }

  // An object template for a new habit
  const newHabit = {
    id: lastHabitId + 1,
    habit: habitTitle.value.trim(),
    trigger: habitTrigger.value.trim(),
    trackingSince: new Date(Date.now()).toISOString().split('T')[0]
  };

  emit('add-habit', newHabit);

  // Pushing the newly created habit to the local storage
  habits.push(newHabit);
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));

  // Emptying the input fields
  habitTitle.value = '';
  habitTrigger.value = '';
};
</script>

<template>
  <div class="wrapper">
    <div class="details">
      <div>
        <label for="habit-title">I will...</label>
        <input
          name="habit-title"
          id="habit-title"
          type="text"
          v-model="habitTitle"
          placeholder="Enter a habit"
        />
      </div>
      <div>
        <label for="habit-trigger">Whenever I...</label>
        <input
          name="habit-trigger"
          id="habit-trigger"
          type="text"
          v-model="habitTrigger"
          placeholder="Enter a trigger"
        />
      </div>
    </div>
    <div class="button">
      <button type="submit" @click="addHabit">Add</button>
    </div>
  </div>
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style scoped>
label {
  font-weight: 600;
}

div.wrapper {
  display: flex;
  flex-direction: row;
  gap: 0;
  min-height: 96px;
}

div.button,
div.details {
  background-color: white;
}

div.details {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

div.details input {
  flex-grow: 1;
  border: 1px solid #c3c3c3;
  border-radius: 8px;
  padding: 0;
  padding-left: 16px;
  font-size: 14px;
  min-height: 40px;
}

div.details p {
  color: #1a1a1a;
}

div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

div.wrapper div.details div {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #1a1a1a;
  flex-grow: 1;
  width: 100%;
}

div.button {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  width: 96px;
  border-left: 1px solid #c3c3c3;

  /* padding: 24px; */
}

div.button button {
  color: #006e0c;
  font-size: 14px;
  width: 100%;
  height: 100%;
  background-color: white;
  border: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

div.button button:hover {
  background-color: #e9f5ec;
  cursor: pointer;
}

div.button button:active {
  background-color: #c9e4d0;
  cursor: pointer;
}

div.button p {
  color: green;
}

p.error-message {
  color: #e94747;
}

@media (width <= 768px) {
  div.details {
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
  }

  div.details input {
    width: 100%;
  }

  div.wrapper div.details div {
    color: #1a1a1a;
    flex-grow: 1;
  }
}
</style>
