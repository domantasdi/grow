<script setup>
// import { ref } from 'vue';

import { RouterLink, RouterView } from 'vue-router';

const isoDate = new Date().toISOString().slice(0, 10);
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink :to="{ name: 'day', params: { date: isoDate } }"
        >Today</RouterLink
      >
      <RouterLink :to="{ name: 'habits' }">Manage habits</RouterLink>
    </nav>

    <RouterView />

    <div class="disclaimer">
      <p><strong>Remember:</strong></p>
      <p>
        All big things come from small beginnings. The seed of every habit is a
        single, tiny decision. But as that decision is repeated, a habit sprouts
        and grows stronger. Roots entrench themselves and branches grow. The
        task of breaking a bad habit is like uprooting a powerful oak within us.
        And the task of building a good habit is like cultivating a delicate
        flower one day at a time.
      </p>
      <p>– James Clear, Atomic Habits</p>
    </div>
  </div>
</template>

<style scoped>
.disclaimer {
  margin-top: 24px;
  font-size: 0.75rem;
  line-height: 150%;
  color: #7b7e79;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 16px;
  text-align: center;
}

p:first-child {
  padding-bottom: 8px;
}

p:last-child {
  padding-top: 8px;
  font-style: italic;
}

@media (width <= 768px) {
  .wrapper {
    flex-direction: column;
  }

  nav {
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }
}

@media (width >= 1024px) {
  .wrapper {
    flex-direction: column;
  }

  nav {
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }

  header {
    display: flex;
    place-items: center;
  }
}
</style>
