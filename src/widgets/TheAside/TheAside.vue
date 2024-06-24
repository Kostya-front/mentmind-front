<template>
  <aside class="aside">
    <q-list bordered padding>
      <router-link v-for="link of filteredLinks" :to="link.url" :key="link.text" >
        <q-item
            clickable
            v-ripple
            active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon style="justify-content: flex-start" :name="link.icon" />
          </q-item-section>

          <q-item-section  class="link__item" v-if="link.url === '/requests'">
            <GetUnSelectedRequest/>
            {{link.text}}
          </q-item-section>

          <q-item-section v-else >
            {{link.text}}
          </q-item-section>
        </q-item>
      </router-link>
    </q-list>

<!--    <ul class="list">-->
<!--      <li v-for="link of filteredLinks" :key="link.text" class="li">-->
<!--	      <div class="link__item" v-if="link.url === '/requests'">-->
<!--		      <GetUnSelectedRequest/>-->
<!--		      <router-link  :to="link.url" class="link">{{link.text}}</router-link>-->
<!--	      </div>-->

<!--        <router-link v-else :to="link.url" class="link">{{link.text}}</router-link>-->
<!--      </li>-->
<!--    </ul>-->
  </aside>
</template>

<script setup lang="ts">

import GetUnSelectedRequest from "@/features/requests/components/GetUnSelectedRequest.vue";
import {computed} from "vue";
import {useAuthStore} from "@/features/auth/store";
import {useUserStore} from "@/features/users/store";
const authStore = useAuthStore()
const userStore = useUserStore()
const links: {text: string, url: string, icon: string, roles: string[]}[] = [
  {text: 'Главная', url: '/', icon: 'home', roles: ['admin', 'mentor', 'student']},
  {text: 'Личности', url: '/users/create',  icon: 'person', roles: ['admin']},
  {text: 'Менторы', url: '/mentors', icon: 'worker',  roles: ['admin']},
  {text: 'Студенты', url: '/students',  icon: 'books',  roles: ['admin', 'mentor']},
  {text: 'Заявки', url: '/requests',  icon: 'emails',  roles: ['admin']},
	{text: 'Занятия', url: '/lessons',  icon: 'computers', roles: ['admin', 'mentor', 'student']},
]

const filteredLinks = computed(() => {
  return links.filter(link => link.roles.some(role => role === userStore.userData.role))
})
</script>

<style scoped>
.aside {
  grid-area: aside;
  background: var(--background-color);
}
.link {
  display: flex;
}
.link__item {
	position: relative;
}
</style>