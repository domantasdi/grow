<script setup>
// import { computed } from 'vue';

const props = defineProps({
  monthAndDay: {
    type: String,
    default: '1'
  },
  weekday: {
    type: String,
    default: 'Mon'
  },
  isoDate: {
    type: String,
    default: '2024-07-28'
  },
  currentDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div
    :class="[
      'wrapper',
      {
        completed: props.status === 'all',
        some: props.status === 'some',
        none: props.status === 'none',
        active: $route.params.date === isoDate
      }
    ]"
  >
    <div class="day">
      <p class="day-word">{{ weekday }}</p>
      <p class="day-number">{{ monthAndDay }}</p>
    </div>
  </div>
</template>

<style scoped>
div.wrapper.none,
div.wrapper.some,
div.wrapper.completed {
  transition:
    outline 0.2s ease-in,
    outline-offset 0.2s ease-in;
}

div.wrapper.none {
  border: 1px solid #f1f1f1;
}

div.wrapper.none.active {
  outline: 1px solid #f1f1f1;
  outline-offset: 2px;
}

div.wrapper.none.active:hover {
  outline: 2px solid #f1f1f1;
  outline-offset: 2px;
}

div.wrapper.none:hover {
  border: 1px solid white;
  outline: 1px solid white;
  background-color: #363636;
}

div.wrapper.none:active {
  border: 1px solid #e0e0e0;
  background-color: #252525;
}

div.wrapper.some {
  border: 1px solid #ffbc42;
}

div.wrapper.some.active {
  outline: 1px solid #ffbc42;
  outline-offset: 2px;
}

div.wrapper.some.active:hover {
  outline: 2px solid #ffbc42;
  outline-offset: 2px;
}

div.wrapper.some:hover {
  border: 1px solid #ffdc42;
  outline: 1px solid #ffdc42;
  background-color: #2f280b;
}

div.wrapper.some:active {
  border: 1px solid #ff9d42;
  background-color: #3c240e;
}

div.wrapper.completed {
  border: 1px solid #218838;
}

div.wrapper.completed.active {
  outline: 1px solid #218838;
  outline-offset: 2px;
}

div.wrapper.completed.active:hover {
  outline: 2px solid #218838;
  outline-offset: 2px;
}

div.wrapper.completed:hover {
  border: 1px solid #28a745;
  outline: 1px solid #28a745;
  background-color: #0a2911;
}

div.wrapper.completed:active {
  border: 1px solid #1e7e34;
  background-color: #061a0b;
}

div.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 8px;
  border: 1px solid white;
  border-radius: 8px;
  background-color: none;
}

div.day {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p.day-word {
  font-weight: 600;
}

@media (width <= 447px) {
  div.wrapper {
    padding: 4px;
    gap: 8px;
  }

  div.day {
    align-items: center;
    font-size: 12px;
  }
}
</style>
