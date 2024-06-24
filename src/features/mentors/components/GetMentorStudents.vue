<template>
  <q-table
      title="Студенты"
      flat bordered
      :rows="mentorStore.mentor.students"
      :columns="columns">

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <router-link :to="`/students/student-info/${props.row.id}`">{{ props.row.firstName }}</router-link>
        </q-td>

        <q-td key="lastName" :props="props">
          <a href="#">{{ props.row.lastName }}</a>
        </q-td>

        <q-td key="email" :props="props">
          <a href="#">{{ props.row.email }}</a>
        </q-td>

        <q-td key="phone" :props="props">
          <a href="#">{{ props.row.phone }}</a>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import {useMentorsStore} from "@/features/mentors/store";
import {useStudentsStore} from "@/features/students/store";
import {onMounted} from "vue";
import {useUserStore} from "@/features/users/store";
const mentorStore = useMentorsStore()

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Имя',
    align: 'left',
    field: 'firstName',
    sortable: true
  },
  {name:'lastName'  , align: 'left', label: 'Фамиля', field: 'lastName'},
  {name:'email',   align: 'left', label: 'Email', field: 'email'},
  {name:'phone',    align: 'left', label: 'Телефон', field: 'phone'},
]

</script>

<style scoped>

</style>

