<script setup>
import { ref } from 'vue';

// import { ref } from 'vue';

const newHabitTitle = ref('');
const newHabitTrigger = ref('');

defineProps(['habit', 'trigger']);

defineEmits(['close', 'commit']);
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
        <input v-model="newHabitTitle" placeholder="New title" />
        <input v-model="newHabitTrigger" placeholder="New trigger" />
      </div>
      <div class="buttons">
        <div @keydown="Tab" @click="$emit('close')" class="negative-button">
          <slot name="negative-action">No</slot>
        </div>
        <div @keydown="Tab" @click="$emit('commit')" class="positive-button">
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
  font-size: 14px;
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

@media (width <= 768px) {
  div.backdrop {
    padding: 24px;
  }

  div.icon {
    display: none;
  }
}
</style>
