<!-- eslint-disable vue/require-default-prop -->
<script setup>
defineProps({
  monthAndDay: {
    type: Number,
    default: 1
  },
  weekday: {
    type: String,
    default: 'Mon'
  },
  isoDate: {
    type: String
  }
});
</script>

<template>
  <div @keydown="Tab" class="wrapper">
    <div class="day">
      <p class="day-word">{{ weekday }}</p>
      <p class="day-number">{{ monthAndDay }}</p>
    </div>
  </div>
</template>

<style scoped>
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

div.wrapper:hover {
  background-color: #999;
}

div.wrapper:active {
  background-color: #777;
}

div.day {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p.day-word {
  font-weight: 600;
}
</style>
