import { createRouter, createWebHistory } from 'vue-router';

const isoDate = new Date().toISOString().slice(0, 10);

function validateDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);

  // Check if the date parts are valid numbers
  if (!year || !month || !day) return false;

  // Create a date object using the provided date parts
  const date = new Date(year, month - 1, day);

  // Check if the date is valid and matches the provided values
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
}

const routes = [
  {
    path: '/',
    redirect: () => {
      return { name: 'day', params: { date: isoDate } };
    }
  },
  {
    path: '/manage-habits',
    name: 'habits',
    component: () => import('../views/HabitManagement.vue')
  },
  {
    path: '/day/:date',
    name: 'day',
    component: () => import('../views/DayView.vue'),
    beforeEnter: (to, from, next) => {
      const dateParam = to.params.date;
      const isValidDate = validateDate(dateParam);

      if (isValidDate) {
        next();
      } else {
        next({ path: '404' }); // Redirect to an error page or a 404 page
      }
    }
  },
  {
    path: '/day/:notFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/:notFound',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/grow/'),
  routes
});

export default router;
