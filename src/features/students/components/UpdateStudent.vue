<template xmlns:template="http://www.w3.org/1999/html">
  <form @submit.prevent="onSubmit" class="form">
    <q-input v-model="studentsStore.student.firstName" label="Имя" />


    <q-input v-model="studentsStore.student.lastName" label="Фамилия"/>

    <q-input v-model="studentsStore.student.avatar" label="Аватар"/>

    <q-input
        v-model="studentsStore.student.phone"
        mask="+7  (###) ### - ####"
        hint="Формат: +7(###) ### - ####"
        label="Телефон"
    />
    <q-input v-model="studentsStore.student.email" label="Email"/>

    <q-select
        filled
        v-model="studentsStore.student.learnDirection"
        :options="learnDirections"
        stack-label
        label="Учебное направление"
    />

          <q-input
              filled
              v-model="minutes"
              :options="studentsStore.learnDirections"
              stack-label
              :label="`Добавить минуты, сейчас (${studentsStore.student.paidMinutes})`"
          >
            <template v-slot:append>
              <q-icon @click="addMinutes" name="add">

              </q-icon>
            </template>
          </q-input>

    <SelectUser v-model="studentsStore.student.mentor"  stack-label :options="mentorStore.mentorList"  label="Ментор"/>



    <q-btn color="purple" type="submit" label="Создать" />
  </form>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useStudentsStore} from "@/features/students/store";
import {learnDirections} from "@/shared/consts";
import SelectUser from "@/features/students/components/SelectUser.vue";
import {useMentorsStore} from "@/features/mentors/store";
const route = useRoute()

const minutes = ref(0)

const studentsStore = useStudentsStore()
const mentorStore = useMentorsStore()

const rulses = ref([
  value => value.length > 5 ? true : 'Пароль должен быть не меньше 6 символов'
])

function addMinutes() {
  studentsStore.student.paidMinutes += Number(minutes.value)
  minutes.value = 0
}
function onSubmit() {
  studentsStore.updateStudent()
}

onMounted(() => {
  studentsStore.getStudent(+route.params.id)
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