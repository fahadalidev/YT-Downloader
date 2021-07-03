import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
{
    path: '/folder/:id',
    component: () => import ('../views/Folder.vue')
  },
  {
    path: '/Signin',
    name: 'Sign In',
    component: () => import ('../views/Signin.vue')
  },
  {
    path: '/',
    name: 'Youtube',
    component: () => import ('../views/Youtube.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
