<script setup>
import { ref, watch } from 'vue';
import HabitCard from '../../components/habits/HabitCard.vue';
import AddHabit from './AddHabit.vue';
import getStoredHabits, { HABITS_KEY } from './habits';
import DeleteOverlay from '../../components/dialogs/DeleteOverlay.vue';
import EditOverlay from '../../components/dialogs/EditOverlay.vue';

const habits = ref(getStoredHabits());
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const selectedHabitId = ref(null);
const selectedHabit = ref('null');

const handleAddHabit = (newHabit) => {
  habits.value.push(newHabit);
};

const openDeleteDialog = (habitId, habit) => {
  selectedHabitId.value = habitId;
  selectedHabit.value = habit;
  showDeleteDialog.value = true;
};

const openEditDialog = (habitId, habit) => {
  selectedHabitId.value = habitId;
  selectedHabit.value = habit;
  showEditDialog.value = true;
};

const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
};

// TODO: Add a function to edit the habit

const deleteHabit = () => {
  if (selectedHabitId.value !== null) {
    habits.value = habits.value.filter(
      (habit) => habit.id !== selectedHabitId.value
    );
    closeDeleteDialog();
  }
};

watch(habits, (updatedHabits) => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(updatedHabits));
});
</script>

<template>
  <main>
    <AddHabit @add-habit="handleAddHabit"></AddHabit>
    <div v-if="habits.length === 0">
      <p>No habits to display. Try adding one now!</p>
    </div>

    <DeleteOverlay v-if="showDeleteDialog" @close="closeDeleteDialog">
      <template #header> Delete habit? </template>
      <template #bodyText>
        Are you sure you want to delete the habit
        <strong> {{ selectedHabit }} </strong>
        ? This action cannot be undone.
      </template>
      <template #positive-action>
        <div
          @keydown="Tab"
          role="button"
          tabindex="0"
          @click="closeDeleteDialog"
        >
          Cancel
        </div>
      </template>
      <template #negative-action>
        <div @keydown="Tab" role="button" tabindex="0" @click="deleteHabit">
          Yes, delete
        </div>
      </template>
    </DeleteOverlay>

    <EditOverlay v-if="showEditDialog" @close="closeEditDialog">
      <template #header>Edit habit?</template>
      <template #bodyText
        >Please provide a new title and a trigger for
        <strong>{{ selectedHabit }}</strong
        >. You will be able to undo the changes by editing the habit again.
      </template>
      <template #positive-action>
        <div @keydown="Tab" role="button" tabindex="0" @click="editHabit">
          Save
        </div>
      </template>
      <template #negative-action>
        <div @keydown="Tab" role="button" tabindex="0" @click="closeEditDialog">
          Cancel
        </div>
      </template>
    </EditOverlay>

    <HabitCard
      v-for="habit in habits.slice().reverse()"
      :key="habit.id"
      :habit="habit.habit"
      :trigger="habit.trigger"
      :trackingSince="habit.trackingSince"
      positiveAction="Edit"
      negativeAction="Delete"
      @edit="openEditDialog(habit.id, habit.habit)"
      @delete="openDeleteDialog(habit.id, habit.habit)"
    />
  </main>
</template>

<style scoped>
/* stylelint-disable-next-line selector-type-case */
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

div.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;

  /* height: 48px; */
}

p {
  color: white;
}
</style>
