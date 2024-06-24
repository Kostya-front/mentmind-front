<template>
  <div @click="onClick" class="wrap">
    <span>{{userStore.userData.firstName}} {{userStore.userData.lastName}}</span>
    <div>
      <img src="@/assets/ava.png" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/features/auth/store";
import {useRouter} from "vue-router";
import {useUserStore} from "@/features/users/store";
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
async function onClick() {
  await authStore.logout()
  router.push('/auth')
}
</script>

<style scoped>
.wrap {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>