<script setup>
defineProps({
  direction: {
    type: String,
    default: 'Mon'
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="direction">
      <p>{{ direction }}</p>
    </div>
  </div>
</template>

<style scoped>
div.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 8px;
  border: 1px solid white;
  border-radius: 8px;
  background-color: none;
}

div.wrapper div.direction {
  width: 100%;
}

p.day-word {
  font-weight: 600;
}
</style>
