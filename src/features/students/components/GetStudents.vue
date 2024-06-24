  <template>
  <q-table
      title="Студенты"
      flat bordered
      :rows="studentStore.students"
      :columns="columns"
      :filter="studentStore.searchName"
      v-model:pagination="studentStore.pagination"
      @request="requestStudents"
  >
    <template v-slot:top-right>
      <SearchStudent  />
    </template>

    <template v-slot:body="props">
      <q-tr @click="transition(props.row?.id)" :props="props">
        <q-td key="name" :props="props">
          <span>{{ props.row.firstName }}</span>
<!--          <router-link :to="`/students/student-info/${props.row.id}`">{{ props.row.firstName }}</router-link>-->
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
          <a href="#">{{  props.row.mentor?.id }}</a>
        </q-td>

      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

import {useStudentsStore} from "@/features/students/store";
import SearchStudent from "@/features/students/components/SearchStudent.vue";
import {useUserStore} from "@/features/users/store";
import {useRouter} from "vue-router";
interface IRequestParam {
  filter: string
  pagination: {
    page:number
    rowsNumber:number
    rowsPerPage: number
  }
}
const studentStore = useStudentsStore()

function requestStudents(params: IRequestParam) {

  if(params.pagination.page < studentStore.pagination.page) {
    --studentStore.pagination.page
  }
  else {
    ++studentStore.pagination.page
  }

  studentStore.pagination = {...params.pagination}

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
  {name:'mentorId',    align: 'left', label: 'Ментор', field: 'mentor'},
]
const userStore = useUserStore()
const router = useRouter()
function transition(url: string) {
  if(userStore.userData.role === 'admin') {
    router.push(`/students/student-info/${url}`)
  }
}
onMounted(async () => {
  await studentStore.getStudents()
})
</script>

<style scoped>

</style>

