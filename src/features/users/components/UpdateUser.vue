<template>
  <div class="wrap">
    <q-list bordered class="rounded-borders">
<!--      <p>Чтобы изменить фотографию — кликните по ней.</p>-->
<!--      <span>обновить информацию</span>-->
      <q-expansion-item
          expand-separator
          label="Чтобы изменить фотографию — кликните по ней."
          caption="обновить информацию"
      >
        <form @submit.prevent="onSubmit" class="form">
          <q-input v-model="userStore.selectedUser.firstName"  label="Имя"/>
          <q-input v-model="userStore.selectedUser.lastName"  label="Фамилия"/>
          <q-input v-model="userStore.selectedUser.phone"  label="Телефон"/>
          <q-btn label="Сохранить" type="submit"/>
        </form>
      </q-expansion-item>

    </q-list>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/features/users/store";

const userStore = useUserStore()

function onSubmit() {
  userStore.updateUser()
}
</script>

<style scoped>
.wrap {
  display: grid;
  padding: 5px;
  background: #800080;
  color: #fff;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}
</style>