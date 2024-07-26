<script setup>
import HabitManagement from './habits/HabitManagement.vue';
</script>

<template>
  <section>
    <HabitManagement />
  </section>
</template>

<style scoped>
.favorite {
  display: block;
  font-size: 16px;
  opacity: 0.6;
}

.favorite.active {
  opacity: 1;
}

.date-picker {
  display: flex;
  flex-direction: column;
}

.date-picker label {
  color: #fff;
  margin-bottom: 8px;
  font-size: 16px;
}

.date-picker input {
  min-height: 40px;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  border: 1px solid #fff;
  background-color: #1a1a1a;
}
</style>
