<script setup></script>

<template>
  <div class="backdrop">
    <div class="wrapper">
      <div class="header">
        <h1>Welcome to Grow!</h1>
      </div>
      <div class="body">
        <p class="body-text">
          Use this app to manage and track your habits! Here's a quick
          introduction:
        </p>
        <div class="body-instructions">
          <div>
            <h2>Managing habits</h2>
            <p>
              Navigate to the
              <RouterLink
                tabindex="0"
                @keydown.enter="$emit('close')"
                @click="$emit('close')"
                :to="{ name: 'habits' }"
                >Habit management</RouterLink
              >
              section to add, edit or delete your habits.
            </p>
          </div>
          <div>
            <h2>Tracking habits</h2>
            <p>
              Once you've added some habits, you'll see a selection of days,
              spanning from today to a week back. Each day will display the
              habits you have added.
            </p>
            <p>
              Clicking <code id="code-positive">Complete</code> on a habit will
              mark it as done.
            </p>
            <p>
              Clicking <code id="code-negative">Stop...</code> on a habit will
              remove it from future days.
            </p>
          </div>

          <div class="summary">
            <p>Good luck with your habit growth!</p>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div
          @keyup.enter="$emit('close')"
          @click="$emit('close')"
          class="negative-button"
          tabindex="0"
        >
          <slot name="negative-action">Close</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #1a1a1a;
  background: linear-gradient(to right, #1a1a1a, #1a1a1a),
    linear-gradient(to right, #00bd7e, #00f0a0);
  background-size:
    100% 1px,
    0 1px;
  background-position:
    100% 100%,
    0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (hover: hover) {
  a:hover {
    background-size:
      0 1px,
      100% 1px;
  }
}

h1 {
  color: #1a1a1a;
  font-size: 22px;
}

h2 {
  font-size: 16px;
  margin-bottom: 4px;
}

code {
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
  color: #1a1a1a;
}

code#code-positive {
  background-color: #e9f5ec;
}

code#code-negative {
  background-color: #ffedf2;
}

div.backdrop {
  z-index: 1;
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
  max-width: 560px;
  color: #1a1a1a;
  background-color: white;
  border-radius: 8px;
}

div.header,
div.body {
  padding: 24px;
  border-bottom: 1px solid #c3c3c3;
}

div.header {
  font-size: 20px;
  font-weight: 500;
}

div.body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 14px;
}

div.body-instructions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
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
  border-bottom-right-radius: 8px;
}

div.buttons .positive-button:active {
  background-color: #c9e4d0;
  cursor: pointer;
  border-bottom-right-radius: 8px;
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
  cursor: pointer;
  border-bottom-right-radius: 8px;
}

div.buttons .negative-button:active {
  background-color: #ffd6dd;
  cursor: pointer;
  border-bottom-right-radius: 8px;
}

p.error-message {
  color: #b30000;
}

@media (width <= 768px) {
  div.backdrop {
    padding: 24px;
  }
}
</style>
