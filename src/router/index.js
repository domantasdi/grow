import { createRouter, createWebHistory } from 'vue-router';
import HabitList from '../views/habits/HabitList.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HabitList
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
