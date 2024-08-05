<script setup>
// import { ref } from 'vue';

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
      </div>
      <div class="buttons">
        <div
          @keyup.enter="$emit('close')"
          @click="$emit('close')"
          class="positive-button"
          tabindex="0"
        >
          <slot name="positive-action">Yes</slot>
        </div>
        <div
          @keyup.enter="$emit('commit')"
          @click="$emit('commit')"
          class="negative-button"
          tabindex="0"
        >
          <slot name="negative-action">No</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p.body-text {
  overflow-wrap: anywhere;
  hyphens: auto;
}

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
}

div.buttons .positive-button:active {
  background-color: #c9e4d0;
  cursor: pointer;
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
  border-bottom-right-radius: 8px;
  cursor: pointer;
}

div.buttons .negative-button:active {
  background-color: #ffd6dd;
  border-bottom-right-radius: 8px;
  cursor: pointer;
}

@media (width <= 768px) {
  div.backdrop {
    padding: 16px;
  }
}
</style>
