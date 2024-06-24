<template>
  <div class="cards">
    <q-table
        :title="title || 'Занятия'"
        flat bordered
        :rows="lessonStore.lessons"
        :columns="columns"
        binary-state-sort
        no-data-label="Занятий не обнаружено"
        row-key="mentor">
<!--        v-model:pagination="mentorStore.pagination"-->
<!--        @request="requestMentors"-->

      <template v-slot:top-right>
        <SearchMentor  />
      </template>

      <template v-slot:body="props">
        <q-tr @click="onClick(props.row.id)" class="qwe"  :props="props">
<!--          <q-td key="name" :props="props">-->
<!--            <router-link :to="`/mentors/mentor-info/${props.row.id}`">{{ props.row.id }}</router-link>-->
<!--          </q-td>-->

          <q-td key="mentor" :props="props">
            <a href="#">{{ props.row.mentor?.firstName }} {{ props.row.mentor?.lastName }}</a>
          </q-td>

          <q-td key="student" :props="props">
            <a href="#">{{ props.row.student?.firstName }} {{ props.row.student?.lastName }}</a>
          </q-td>

          <q-td key="date" :props="props">
            <a href="#">{{ props.row.date }}</a>
          </q-td>

          <q-td key="time" :props="props">
            <a href="#">{{ props.row.time }}</a>
          </q-td>

          <q-td key="status" :props="props">
            <a href="#">{{ props.row.status }}</a>
          </q-td>

          <q-td key="comment" :props="props">
            <a href="#">{{ props.row.comment }}</a>
          </q-td>
        </q-tr>
      </template>
    </q-table>
<!-- <LessonCard v-for="item of lessonStore.lessons" :onClick="onClick" :key="item.id" :lesson="item"/>-->
  </div>

</template>

<script setup lang="ts">

import {defineProps, onMounted, ref} from "vue";
import {useLessonStore} from "@/features/lessons/store";
import LessonCard from "@/entities/lessons/LessonCard.vue";
import {usePopupStore} from "@/features/popup/store";
import {ILesson, INewLesson} from "@/features/lessons/types";
import {useUserStore} from "@/features/users/store";
interface IProps {
  from?: string
  to?: string
  title: string
}
const props = defineProps<IProps>()

const columns = [
  { name: 'mentor', align: 'left', label: 'Ментор', field: 'mentor'},
  { name: 'student', align: 'left', label: 'Ученик', field: 'student'},
  { name: 'date', align: 'left', label: 'Дата', field: 'date'},
  { name: 'time', label: 'Время', field: 'time', sortable: true },
  { name: 'status', label: 'Статус', field: 'status', sortable: true },
  { name: 'comment', label: 'Комментарий', field: 'comment' },
]

const lessonStore = useLessonStore()
const popupStore = usePopupStore()
const userStore = useUserStore()
function onClick(id: number) {
  lessonStore.selectLesson(id)
  popupStore.updateLessonPopup = true
}

onMounted(() => {
  lessonStore.getLessons(userStore.userData.id)
})
</script>

<style scoped>

</style>