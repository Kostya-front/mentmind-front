<template>
    <form @submit.prevent="onSubmit" class="form">
      <transition-group name="form">
        <div key="logo"><img src="@/assets/logo.svg" alt=""></div>
        <q-input v-model="authStore.authData.login" key="input-login" label="Логин"/>
        <q-input v-model="authStore.authData.password" key="input-pass" autocomplete="on" label="Пароль" type="password"/>
        <q-btn type="submit" label="Войти" key="btn"/>
        <p v-if="authStore.messageError" class="text__error" key="message">{{authStore.messageError}}</p>
      </transition-group>
    </form>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/features/auth/store";
import {useRouter} from "vue-router";
const router = useRouter()
const authStore = useAuthStore()

async function onSubmit() {
  try {
    await authStore.login()
    router.push('/')
  } catch {

  }
}
</script>

<style scoped>
.form-enter-active, .form-move, .form-leave-active {
  transition: all 0.5s ease;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.form-leave-active {
  position: absolute;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.text__error {
  color: #233271;
  text-align: center;
  font-weight: 700;
}
</style>