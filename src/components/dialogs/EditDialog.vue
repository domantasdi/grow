<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['initialTitle', 'initialTrigger']);
const emit = defineEmits(['close', 'commit']);

const newHabitTitle = ref(props.initialTitle);
const newHabitTrigger = ref(props.initialTrigger);
const errorMessage = ref('');

watch(
  () => props.initialTitle,
  (newVal) => {
    newHabitTitle.value = newVal;
  }
);

watch(
  () => props.initialTrigger,
  (newVal) => {
    newHabitTrigger.value = newVal;
  }
);

const commitChanges = () => {
  if (!newHabitTitle.value.trim() || !newHabitTrigger.value.trim()) {
    errorMessage.value = 'Both fields are required.';
  } else {
    errorMessage.value = '';
    emit('commit', newHabitTitle.value, newHabitTrigger.value);
  }
};
</script>

<template>
  <div class="backdrop">
    <div class="wrapper">
      <div class="header">
        <slot name="header">Default header</slot>
      </div>
      <div class="details">
        <p class="body-text">
          <slot name="bodyText">Default body text</slot>
        </p>
        <div class="inputs">
          <div class="title">
            <label for="habit-title">I will: </label>
            <input
              name="habit-title"
              v-model="newHabitTitle"
              :placeholder="initialTitle"
            />
          </div>
          <div class="trigger">
            <label for="habit-trigger">Whenever I: </label>
            <input
              name="habit-trigger"
              v-model="newHabitTrigger"
              :placeholder="initialTrigger"
            />
          </div>
        </div>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      <div class="buttons">
        <div @keydown="Tab" @click="$emit('close')" class="negative-button">
          <slot name="negative-action">No</slot>
        </div>
        <div @keydown="Tab" @click="commitChanges" class="positive-button">
          <slot name="positive-action">Yes</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

div.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 480px;
  color: #1a1a1a;
  background-color: white;
  border-radius: 8px;
}

div.header,
div.details {
  padding: 24px;
  border-bottom: 1px solid #c3c3c3;
}

div.header {
  font-size: 20px;
  font-weight: 500;
}

div.details {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 14px;
}

div.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

div.inputs div.title,
div.inputs div.trigger {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

div.inputs input {
  border: 1px solid #c3c3c3;
  border-radius: 8px;
  padding: 0;
  padding-left: 16px;
  font-size: 14px;
  min-height: 40px;
}

div.inputs label {
  font-weight: 600;
}

div.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

div.buttons .positive-button {
  color: #006e0c;
  display: flex;
  align-items: center;
  user-select: none;
  height: 48px;
  padding-right: 24px;
  padding-left: 24px;
  border-left: 1px solid #c3c3c3;
}

div.buttons .positive-button:hover {
  background-color: #e9f5ec;
  cursor: pointer;
  border-bottom-right-radius: 8px;
}

div.buttons .positive-button:active {
  background-color: #c9e4d0;
  cursor: pointer;
  border-bottom-right-radius: 8px;
}

div.buttons .negative-button {
  color: #b30000;
  display: flex;
  align-items: center;
  user-select: none;
  padding-left: 24px;
  padding-right: 24px;
  height: 48px;
  border-left: 1px solid #c3c3c3;
}

div.buttons .negative-button:hover {
  background-color: #ffedf2;
  cursor: pointer;
}

div.buttons .negative-button:active {
  background-color: #ffd6dd;
  cursor: pointer;
}

p.error-message {
  color: #b30000;
}

@media (width <= 768px) {
  div.backdrop {
    padding: 24px;
  }
}
</style>
