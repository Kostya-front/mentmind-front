<template>
  <div class="page-admin">
    <UserInfo :name="name" :role="role">
      <GetTasks/>
    </UserInfo>
    <AdminTasks/>
  </div>
</template>

<script setup lang="ts">
import {UserInfo} from "@/widgets";
import GetTasks from "@/features/tasks/components/GetTasks.vue";
import AdminTasks from '@/widgets/AdminTasks/AdminTasks.vue'
interface IProps {
  name: string
  role: string
}
const props = defineProps<IProps>()

</script>

<style scoped>
.page-admin {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
</style>