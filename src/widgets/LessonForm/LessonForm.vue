<template>
  <form @submit.prevent="onSubmit" class="form">
    <p>Дата занятия</p>
    <q-input filled v-model="lessonStore.lesson.date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="lessonStore.lesson.date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <p>Время</p>
    <div class="inputs">
      <q-input filled v-model="lessonStore.lesson.time" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="lessonStore.lesson.time">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="lessonStore.lesson.duration"></q-input>
    </div>
    <p>Клиент</p>
    <SelectUser v-model="lessonStore.lesson.studentId" :disable="!roleStore.isDisabled.studentSelect" label="Клиенты" :options="studentStore.studentList" />
    <p>Ментор</p>
    <SelectUser v-model="lessonStore.lesson.mentorId" :disable="!roleStore.isDisabled.mentorSelect"  label="Менторы" :options="mentorStore.mentorList" />
    <template v-if="lessonStore.lesson.rating">
      <p>Оценка</p>
      <q-rating
          v-model="lessonStore.lesson.rating"
          size="2em"
          :max="5"
          :readonly="roleStore.isDisabled"
          color="primary"
      />
    </template>

    <p>Ссылка на занятие</p>
    <q-input v-model="lessonStore.lesson.urlMeet" placeholder="https://..." />

    <p>Ссылка на запись занятия</p>
    <q-input v-model="lessonStore.lesson.urlVideo" placeholder="https://..." />

    <p>Комментарий</p>
    <q-input v-model="lessonStore.lesson.comment" placeholder="Например, задержится" />
    <p v-if="lessonStore.errorMessage">{{lessonStore.errorMessage}}</p>
  </form>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useLessonStore} from "@/features/lessons/store";
import {useStudentsStore} from "@/features/students/store";
import {useMentorsStore} from "@/features/mentors/store";
import SelectStudent from "@/features/students/components/SelectStudent.vue";
import SelectMentor from "@/features/mentors/components/SelectMentor.vue";
import SelectUser from "@/features/students/components/SelectUser.vue";
import {useUserStore} from "@/features/users/store";
import {useRolesStore} from "@/features/roles";

const mentor = ref('')

const lessonStore = useLessonStore()
const studentStore = useStudentsStore()
const mentorStore = useMentorsStore()
const userStore = useUserStore()
const roleStore = useRolesStore()

function onSubmit() {
  lessonStore.createLesson()
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: 20px
}
.inputs {
  display: flex;
  gap:10px
}
</style>