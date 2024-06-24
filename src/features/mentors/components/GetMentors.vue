<template>
  <q-table
      title="Менторы"
      flat bordered
      :filter="mentorStore.searchName"
      :rows="mentorStore.mentors"
      :columns="columns"
      binary-state-sort
      row-key="firstName"
      v-model:pagination="mentorStore.pagination"
      @request="requestMentors"
  >
    <template v-slot:top-right>
      <SearchMentor  />
    </template>

    <template v-slot:body="props">
      <q-tr class="qwe"  :props="props">
        <q-td key="name" :props="props">
          <router-link :to="`/mentors/mentor-info/${props.row.id}`">{{ props.row.firstName }}</router-link>
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

        <q-td key="phone" :props="props">
          <a href="#">{{ props.row.students?.length }}</a>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import {useMentorsStore} from "@/features/mentors/store";
import {createTableColumns} from "@/shared/helpers/createTableColumns";
import {onMounted, ref} from "vue";
import {IPagination} from "@/shared/types";
import SearchMentor from '@/features/mentors/components/SearchMentor.vue'
const mentorStore = useMentorsStore()

const test = ref('')
test.value = '123'

async function requestMentors(params: {pagination: IPagination}) {
  if(params.pagination.page < mentorStore.pagination.page) {
    --mentorStore.pagination.page
  }
  else {

    ++mentorStore.pagination.page
  }

  mentorStore.pagination = {...params.pagination}

  console.log(params)
}
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
  {name:'students',    align: 'left', label: 'Студенты', field: 'students',  sortable: true},
]

onMounted(async () => {
    mentorStore.getMentors()
})
</script>

<style scoped>

</style>

