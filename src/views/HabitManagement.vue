<script setup>
import { ref } from 'vue';
import HabitCard from '../components/habits/HabitCard.vue';
import AddHabit from '../components/habits/AddHabit.vue';
import { useHabitsStore } from '../store/useHabitsStore';
import DeleteDialog from '../components/dialogs/DeleteDialog.vue';
import EditDialog from '../components/dialogs/EditDialog.vue';

const habits = useHabitsStore();
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const selectedHabitId = ref(null);
const selectedHabit = ref('');
const selectedHabitTrigger = ref('');
const selectedHabitIndex = ref(null);

const handleAddHabit = (newHabit) => {
  habits.value.push(newHabit);
};

const openDeleteDialog = (habitId, habit) => {
  showDeleteDialog.value = true;
  selectedHabitId.value = habitId;
  selectedHabit.value = habit;
};

const openEditDialog = (habitId, habitTitle, habitTrigger) => {
  showEditDialog.value = true;
  selectedHabitId.value = habitId;
  selectedHabit.value = habitTitle;
  selectedHabitTrigger.value = habitTrigger;
  selectedHabitIndex.value = habits.value.findIndex(
    (habit) => habit.id === habitId
  );
};

const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
};

const editHabit = (newHabitTitle, newHabitTrigger) => {
  const index = selectedHabitIndex.value;
  habits.value[index].habit = newHabitTitle;
  habits.value[index].trigger = newHabitTrigger;
  closeEditDialog();
};

const deleteHabit = () => {
  if (selectedHabitId.value !== null) {
    habits.value = habits.value.filter(
      (habit) => habit.id !== selectedHabitId.value
    );
    closeDeleteDialog();
  }
};
</script>

<template>
  <main>
    <div class="addition-and-information">
      <AddHabit @add-habit="handleAddHabit"></AddHabit>
      <div v-if="habits.length === 0">
        <p>No habits to display yet. Try adding one above!</p>
      </div>
    </div>

    <div class="habit-cards">
      <HabitCard
        v-for="habit in habits.slice().reverse()"
        :id="habit.id"
        :key="habit.id"
        :habit="habit.habit"
        :trigger="habit.trigger"
        :addedOn="habit.addedOn"
        :checkedDates="habit.checkedDates"
        :currentDate="$route.params.date"
        positiveAction="Edit"
        negativeAction="Delete"
        @positiveAction="openEditDialog(habit.id, habit.habit, habit.trigger)"
        @negativeAction="openDeleteDialog(habit.id, habit.habit)"
      />
    </div>
  </main>

  <DeleteDialog
    v-if="showDeleteDialog"
    @commit="deleteHabit"
    @close="closeDeleteDialog"
  >
    <template #header> Delete habit? </template>
    <template #bodyText>
      Are you sure you want to delete the habit
      <strong>{{ selectedHabit }}</strong
      >? This action cannot be undone.
    </template>
    <template #positive-action>
      <div @keydown="Tab" role="button" tabindex="0">Cancel</div>
    </template>
    <template #negative-action>
      <div @keydown="Tab" role="button" tabindex="0">Yes, delete</div>
    </template>
  </DeleteDialog>

  <EditDialog
    v-if="showEditDialog"
    :initialTitle="selectedHabit"
    :initialTrigger="selectedHabitTrigger"
    @commit="editHabit"
    @close="closeEditDialog"
  >
    <template #header>Edit habit</template>
    <template #bodyText
      >Please provide a new title and a trigger for
      <strong>{{ selectedHabit }}</strong
      >. You will be able to undo the changes by editing the habit again.
    </template>
    <template #positive-action>
      <div @keydown="Tab" role="button" tabindex="0">Save</div>
    </template>
    <template #negative-action>
      <div @keydown="Tab" role="button" tabindex="0">Cancel</div>
    </template>
  </EditDialog>
</template>

<style scoped>
div.addition-and-information {
  display: flex;
  flex-direction: column;
  gap: 24px;
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

div.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
}

p {
  color: white;
}
</style>
