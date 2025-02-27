# Grow

![The Grow habit tracker](/public/Grow.jpeg 'Grow')

Grow is a basic habit tracking application developed for Turing College as the first Vue3 project.

The application affords people to manage (create, edit, delete) and track different habits.

# Key takeaways

This section outlines the ups and downs I've encountered while doing this task.

- ⬆ The ups:
  - I am happy how this project turned out;
  - The project has a fairly good UX and a decent UI;
  - I have fulfilled my goals set out before joining the Turing College.
- ⬇ The downs:
  - I still find Vue confusing and it was difficult to navigate the project while trying to remember props, template slots, computed values, etc.;
  - Due to the difficulty of understanding Vue well, my code organization is average at most;
  - I had to follow tutorials, get help from GPT in order to proceed in some areas.

# Features

- **Habit management.** Add, edit, delete or stop the habits you want to track;
- **Habit-Trigger link.** Habits are always triggered by some other action or circumstances. Outline the trigger to have a greater chance of successfully tracking your habit;
- **Accessible design.** You're not required to use a mouse to navigate around the app. The colors used in the application meet the WCAG standards;
- **Non-intrusive help overlay.** If you ever need a reminder, you can always open the Help overlay;
- **User Interface and User Experience.** I paid a lot of attention to the app's design and user experience to make it feel just right design and experience-wise.

# How to use Grow

Use Grow with either your mouse and keyboard or just the keyboard. Navigate using the `TAB` key and submit your inputs with the `ENTER` key.

## User interface

### Adding a new habit

You can add a new habit by navigating to the `Manage habits` section found in the navigation pane. Once you're there, enter the habit title, the trigger, and, finally, click the `Add` button.
In life, habits are usually triggered by something. For example, making your bed is triggered by getting out of the bed (or other triggers, in your case).

### Editing a habit

You can edit an already existing habit by clicking the `Edit` button found in the `Habit management` section. This will open a modal window, asking you to enter a new title and a new trigger. If you delete the values altogether, you will have them reminded to you in the form of a placeholder. Click `Save` when you're happy with your edits to save them or `Cancel`, if you wish to back out and discard your edits.

### Deleting habits

You can delete a habit by clicking the `Delete...` button found in the `Habit management` section. This will open a dialog, asking you to confirm the action. In addition, you are informed that this action cannot be undone.

If there is more than one habit added to the tracker, you can also bulk delete habits by clicking the `Delete all habits...` button found below the list of habits.

### Completing a habit

Clicking `Today` in the navigation pane will automatically redirect you to the current day and display all the active habits. If you wish to complete one, click the `Complete` button on the habit. You can tell a habit has been completed by looking at these two areas:

1. The habit card itself;
2. The day selector.

The day selector's style is outlined by the following conditions:

- If you complete all of the habits for the day, the selector will have a 🟢 green outline;
- If you complete some habits, the selector will have a 🟡 yellow outline;
- If you didn't mark any habits as complete, the selector will have a ⚪️ white outline.

### Stopping a habit

You are free to stop a habit from tracking by clicking the `Stop...` button on the habit itself. This will open a confirmation dialog to make sure you don't stop a habit by accident. This will prevent the habit from appearing from the day forward.

### Help section

If you ever need a brief reminder on how everything works, click `Guide` at the top of the page at anytime.

# Setting up the application

## Dependencies and compilation

### Install the required dependencies

```sh
npm install
```

### Compile the project

```sh
npm run build
```

```sh
npm run preview
```

## A sample array of habit objects

If you wish, feel free to use this minified `localStorage` array of objects for testing purposes:

```json
[
  {
    "id": 1,
    "habit": "make my bed",
    "trigger": "get up",
    "addedOn": "2024-07-30",
    "checkedDates": {}
  },
  {
    "id": 2,
    "habit": "brush my teeth",
    "trigger": "make my bed",
    "addedOn": "2024-07-30",
    "checkedDates": {}
  },
  {
    "id": 3,
    "habit": "clean up the kitchen",
    "trigger": "have a spare moment",
    "addedOn": "2024-07-30",
    "checkedDates": {}
  }
]
```

In order to use it:

1. Create any habit;
2. Open the Developer tools of the browser you're using;
3. Open the Local storage settings;
4. Edit the value of the `habits` key and paste in the value;
5. Refresh the page.
