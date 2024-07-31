<!-- eslint-disable no-param-reassign -->
<script setup></script>

<template>
  <main>
    <h1>Page not found</h1>
    <p>
      Looks like this page broke a habit... It's not where it's supposed to be!
      While you’re here, why not take a moment to reflect? Even the best of us
      slip up now and then. Whether it's a page or a habit, sometimes things
      just go off track. The important part is getting back on course.
    </p>
    <p>Remember, consistency is key. Even in browsing!</p>
  </main>
</template>

<style>
div.information {
  color: #fff;
}

div.habit-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  color: #fff;
  font-size: 18px;
  padding: 0;
}

div.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
}

@media (width >= 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
