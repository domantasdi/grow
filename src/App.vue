<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useOnboardingStore } from './store/useOnboardingStore';
import OnboardingOverlay from './components/onboarding/OnboardingOverlay.vue';

const onboardingOverlay = useOnboardingStore();

const openOnboardingOverlay = () => {
  onboardingOverlay.value = true;
};

const closeOnboardingOverlay = () => {
  onboardingOverlay.value = false;
};

const isoDate = new Date().toISOString().slice(0, 10);
</script>

<template>
  <OnboardingOverlay
    v-if="onboardingOverlay === true"
    @close="closeOnboardingOverlay"
  ></OnboardingOverlay>
  <div class="wrapper">
    <nav>
      <RouterLink :to="{ name: 'day', params: { date: isoDate } }">
        <div class="wrapper-icon">
          <img
            src="./assets/grow.svg"
            alt="Logo of the application. A symbol representing stairs is displayed on a dark background."
          />
          <p>Grow</p>
        </div>
      </RouterLink>

      <div>
        <p
          @keydown.enter="openOnboardingOverlay"
          id="onboarding"
          @click="openOnboardingOverlay"
          tabindex="0"
        >
          Learn
        </p>
        <RouterLink :to="{ name: 'day', params: { date: isoDate } }"
          >Track</RouterLink
        >
        <RouterLink :to="{ name: 'habits' }">Manage</RouterLink>
      </div>
    </nav>

    <RouterView />

    <div class="disclaimer">
      <p id="highlight"><strong>Remember:</strong></p>
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
p#onboarding {
  color: #919191;
}

p#onboarding:hover {
  color: #80ed99;
  cursor: help;
}

.wrapper-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.wrapper-icon img {
  height: 16px;
  width: 16px;
}

nav .wrapper-icon p {
  padding: 0;
  color: #fff;
}

h1 {
  color: #919191;
  font-size: 16px;
  font-weight: 500;
}

.disclaimer {
  font-size: 12px;
  line-height: 150%;
  color: #7b7e79;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

p#highlight {
  color: #9b9e99;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  text-align: center;
}

nav div:last-child {
  display: flex;
  gap: 16px;
}

.disclaimer p:first-child {
  padding-bottom: 8px;
}

.disclaimer p:last-child {
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
    margin-top: 24px;
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
