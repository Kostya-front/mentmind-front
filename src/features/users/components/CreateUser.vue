<template>
  <q-form @submit.prevent="onSubmit" @reset="userStore.onReset" ref="form" class="form">
    <q-input v-model="userStore.newUser.firstName" :rules="userStore.rules.firstName" label="Имя" />


    <q-input v-model="userStore.newUser.lastName" :rules="userStore.rules.lastName" label="Фамилия"/>

    <q-input v-model="userStore.newUser.avatar" label="Аватар"/>
    <q-input
        v-model="userStore.newUser.phone"
        mask="+7  (###) ### - ####"
        hint="Формат: +7(###) ### - ####"
        label="Телефон"
    />
    <q-input v-model="userStore.newUser.email" :rules="userStore.rules.email" label="Email"/>
    <q-input v-model="userStore.newUser.password" :rules="rulses" :type="userStore.typeInput" label="Пароль"/>

    <q-select
        filled
        v-model="userStore.newUser.role"
        :options="[{label:'Ментор', value: 'mentor'}, {label:'Студент', value: 'student'}]"
        stack-label
        :rules="userStore.rules.role"
        label="Роль"
    />

    <q-select
        v-if="userStore.newUser.role && userStore.newUser.role.value === 'mentor'"
        filled
        v-model="userStore.newUser.learnDirections"
        :options="learnDirections"
        multiple
        use-chips
        stack-label
        label="Учебные направления"
    />

    <q-select
        v-if="userStore.newUser.role.value  && userStore.newUser.role.value === 'student'"
        filled
        v-model="userStore.newUser.learnDirection"
        :options="learnDirections"
        stack-label
        label="Учебное направление"
    />
<!--    <v-select-->
<!--        v-model="userStore.newUser.learnDirections"-->
<!--        v-if="userStore.newUser.role.length > 0 && userStore.newUser.role === 'mentor'"-->
<!--        :items="userStore.learnDirections"-->
<!--        item-title="text"-->
<!--        item-value="value"-->
<!--        label="Направления"-->
<!--        class="select"-->
<!--        chips-->
<!--        multiple-->
<!--    ></v-select>-->
    <v-select
        v-model="userStore.newUser.learnDirection"
        v-if="userStore.newUser.role.length > 0 && userStore.newUser.role === 'student'"
        :items="learnDirections"
        label="Направления"
        class="select"
    ></v-select>

    <q-btn class="btn" color="purple" type="submit" label="Создать" />
  </q-form>
  <p></p>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useUserStore} from "@/features/users/store";
import {learnDirections} from "@/shared/consts";


const userStore = useUserStore()

const form = ref(null)

const rulses = ref([
  value => value.length > 5 ? true : 'Пароль должен быть не меньше 6 символов'
])

function onSubmit() {
  form.value.validate().then(async success => {
    console.log('test')
    if(success) {
      await userStore.createUser()
      form.value.resetValidation()
    }
    else {
      console.log(success)
    }
  }).catch(e => console.log(e))
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  gap: 20px;
}
.btn {
  background: #642b64;
  font-size: 2rem;
  color: #fff;
  grid-column: 1;
}
.select {
  font-size: 2rem !important;
}
</style>