import { createRouter, createWebHistory } from 'vue-router';
// import HabitList from '../views/habits/HabitList.vue';

const isoDate = new Date().toISOString().slice(0, 10);

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
    component: () => import('../views/HabitManagementView.vue')
  },
  {
    path: '/day/:date',
    name: 'day',
    component: () => import('../views/DayView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
