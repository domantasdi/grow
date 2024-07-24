<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  },
  habit: {
    type: String,
    required: true
  },
  trigger: {
    type: String,
    required: true
  },
  trackingSince: {
    type: Date,
    required: true
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="icon">Icon</div>
    <div class="details">
      <p class="habit">{{ habit }}</p>
      <p class="trigger">Whenever I {{ trigger }}</p>
    </div>
    <div class="buttons">
      <div class="done-button">
        <p>Done</p>
      </div>
      <div class="stop-button">
        <p>Stop</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.wrapper {
  display: flex;
  flex-direction: row;
  color: #1a1a1a;
  background-color: white;
  border-radius: 8px;
  font-weight: 600;
}

div.icon {
  display: flex;
  align-items: center;
  min-width: 96px;
  width: 96px;
  justify-content: center;
  border-right: 1px solid #c3c3c3;
}

div.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  padding: 24px;
}

div.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  min-width: 96px;
  width: 96px;
  border-left: 1px solid #c3c3c3;
}

div.buttons .done-button {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #c3c3c3;
  user-select: none;
}

div.buttons .done-button:hover {
  background-color: #e9f5ec;
  border-top-right-radius: 8px;
  cursor: pointer;
}

div.buttons .done-button:active {
  background-color: #c9e4d0;
  border-top-right-radius: 8px;
  cursor: pointer;
}

div.buttons .stop-button {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
}

div.buttons .stop-button:hover {
  background-color: #f5e9f2;
  border-bottom-right-radius: 8px;
  cursor: pointer;
}

div.buttons .stop-button:active {
  background-color: #e4c9dd;
  border-bottom-right-radius: 8px;
  cursor: pointer;
}

p.habit {
  font-weight: 700;
}

p.trigger {
  color: #666;
}

@media (width <= 768px) {
  div.icon {
    display: none;
  }
}
</style>
