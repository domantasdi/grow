<!-- eslint-disable vue/require-default-prop -->
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps({
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
  addedOn: {
    type: String,
    required: true
  },
  checkedDates: {
    type: Object,
    required: true
  },
  currentDate: {
    type: String,
    required: true
  },
  positiveAction: {
    type: String
  },
  negativeAction: {
    type: String
  }
});

defineEmits(['positiveAction', 'negativeAction']);

const isCompleted = computed(() => {
  return props.checkedDates[props.currentDate] === true;
});
</script>

<template>
  <div :class="['wrapper', { completed: isCompleted }]">
    <div :class="['details', { completed: isCompleted }]">
      <p class="habit">I will {{ habit }}</p>
      <p class="trigger">Whenever I {{ trigger }}</p>
    </div>
    <div :class="['buttons', { completed: isCompleted }]">
      <div
        role="button"
        tabindex="0"
        @keydown="Tab"
        @click="$emit('positiveAction', route.params.date)"
        :class="['positive-button', { completed: isCompleted }]"
      >
        <p>{{ positiveAction }}</p>
      </div>
      <div
        role="button"
        tabindex="0"
        @keydown="Tab"
        @click="$emit('negativeAction')"
        class="negative-button"
      >
        <p>{{ negativeAction }}</p>
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

div.wrapper.completed {
  outline: 1px solid white;
  outline-offset: 2px;
}

div.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  padding: 24px;
}

div.details.completed {
  text-decoration: line-through;
  text-decoration-color: #666;
  opacity: 0.5;
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

div.buttons .positive-button.completed {
  color: gray;
}

div.buttons .positive-button.completed:hover {
  background-color: #f6f6f6;
  cursor: not-allowed;
}

div.buttons .positive-button.completed:active {
  background-color: #f6f6f6;
  cursor: not-allowed;
}

div.buttons .positive-button,
div.buttons .negative-button {
  font-weight: 400;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

div.buttons .positive-button {
  border-bottom: 1px solid #c3c3c3;
  user-select: none;
}

div.buttons .positive-button p {
  color: #006e0c;
}

div.buttons .negative-button p {
  color: #b30000;
}

div.buttons .positive-button.completed p {
  color: #666;
  cursor: not-allowed;
}

div.buttons .positive-button:hover {
  background-color: #e9f5ec;
  border-top-right-radius: 8px;
  cursor: pointer;
}

div.buttons .positive-button:active {
  background-color: #c9e4d0;
  border-top-right-radius: 8px;
  cursor: pointer;
}

div.buttons .negative-button {
  width: 100%;
  user-select: none;
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

p.habit {
  font-weight: 600;
}

p.trigger {
  color: #666;
  font-weight: 400;
}

@media (width <= 768px) {
  div.icon {
    display: none;
  }
}
</style>
