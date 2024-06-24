import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateMentor from '@/views/users/Create.vue'
import instance from "@/shared/axios";
import {useAuthStore} from "@/features/auth/store";
import {usePopupStore} from "@/features/popup/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'children-home', component: HomeView, }
      ],
      beforeEnter: test
    },
    {
      path: '/users/create/',
      name: 'create-mentor-layout',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'create-mentor', component: () => import('../views/users/Create.vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/mentors',
      name: 'layout-mentors',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'mentors', component: () => import('../views/mentors/index.vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/students',
      name: 'layout-students',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'students', component: () => import('../views/students/index.vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/students/student-info/:id',
      name: 'layout-student-info',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'student-info', component: () => import('../views/students/student-info/[id].vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/mentors/mentor-info/:id',
      name: '-layout-mentor-info',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'mentor-info', component: () => import('../views/mentors/mentor-info/[id].vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/requests',
      name: 'layout-requests',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'requests', component: () => import('../views/RequestView.vue') }
      ],
      beforeEnter: test
    },
    {
      path: '/lessons',
      name: 'layout-lessons',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {path: '', name: 'lessons', component: () => import('../views/lessons/LessonsView.vue'), }
      ],
      beforeEnter: test
    },
    {
      path: '/auth',
      name: 'layout-auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {path: '', name: 'auth', component: () => import('../views/AuthView.vue')}
      ],
      beforeEnter: test
    },
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()
//   try {
//     if(to.path === '/auth') {
//       return next()
//     }
//     const isAuth = await authStore.checkAuth()
//
//     // Если пользователь авторизован или находится на странице аутентификации, продолжаем навигацию
//     next();
//   } catch (e) {
//     next('/auth');
//   }
// })

async function test(to, from, next){
  const authStore = useAuthStore()
  const popupStore = usePopupStore()
  popupStore.loaderPopup = true
  try {
    if(to.path === '/auth') {
      return next()
    }
    const isAuth = await authStore.checkAuth()

    // Если пользователь авторизован или находится на странице аутентификации, продолжаем навигацию
    next();
  } catch (e) {
    next('/auth');
  }
}

router.afterEach(() => {
  const popupStore = usePopupStore()
  popupStore.loaderPopup = false
})
export default router
