<script setup>
import { ref } from 'vue';
import getStoredHabits, { HABITS_KEY } from './habits';

const habitTitle = ref('');
const habitTrigger = ref('');
const errorMessage = ref('');
const id = ref(0);

const addHabit = () => {
  errorMessage.value = '';

  if (!habitTitle.value.trim() || !habitTrigger.value.trim()) {
    errorMessage.value = 'Both fields are required.';
    return;
  }

  const habits = getStoredHabits();
  const newHabit = {
    id: id.value + 1,
    habit: habitTitle.value.trim(),
    trigger: habitTrigger.value.trim(),
    trackingSince: new Date(Date.now()).toISOString().split('T')[0]
  };

  habits.push(newHabit);

  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));

  habitTitle.value = '';
  habitTrigger.value = '';
};
</script>

<template>
  <div class="wrapper">
    <div class="details">
      <input
        name="habit-title"
        id="habit-title"
        type="text"
        v-model="habitTitle"
        placeholder="I will..."
      />
      <input
        name="habit-trigger"
        id="habit-trigger"
        type="text"
        v-model="habitTrigger"
        placeholder="Whenever I..."
      />
    </div>
    <div class="button">
      <button type="submit" @click="addHabit">Add</button>
    </div>
  </div>
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style scoped>
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
  color: #1a1a1a;
  font-size: 15px;
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

div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

div.button p {
  color: green;
}

p.error-message {
  color: #ff7070;
}

@media (width <= 768px) {
  div.details {
    flex-direction: column;
  }

  div.details input {
    width: 100%;
  }
}
</style>
