<template>
  <form @submit.prevent="onSubmit" class="form">
    <q-input v-model="mentorStore.mentor.firstName" label="Имя" />


    <q-input v-model="mentorStore.mentor.lastName" label="Фамилия"/>

    <q-input v-model="mentorStore.mentor.avatar" label="Аватар"/>

    <q-input
        v-model="mentorStore.mentor.phone"
        mask="+7  (###) ### - ####"
        hint="Формат: +7(###) ### - ####"
        label="Телефон"
    />
    <q-input v-model="mentorStore.mentor.email" label="Email"/>

    <q-select
        filled
        v-model="mentorStore.mentor.learnDirections"
        :options="learnDirections"
        stack-label
        multiple
        use-chips
        label="Учебные направления"
    />

    <q-btn color="purple" type="submit" label="Создать" />
  </form>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {learnDirections} from "@/shared/consts";

import {useMentorsStore} from "@/features/mentors/store";

const route = useRoute()



const mentorStore = useMentorsStore()


const rulses = ref([
  value => value.length > 5 ? true : 'Пароль должен быть не меньше 6 символов'
])

function onSubmit() {
  mentorStore.updateMentor()

}


onMounted(() => {
  mentorStore.getMentor(+route.params.id)
})
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
}
.select {
  font-size: 2rem !important;
}
.add__form {
  display: flex;
  align-items: center;
  gap: 10px
}
</style>