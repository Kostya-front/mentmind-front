<template>
  <div>
    <UserInfo :name="name" :role="role">
      <GetLessons title="Занятия на ближайшие 7 дней"/>
    </UserInfo>
  </div>
</template>

<script setup lang="ts">
import {UserInfo} from "@/widgets";
import GetLessons from "@/features/lessons/components/GetLessons.vue";
import {useRolesStore} from "@/features/roles";
interface IProps {
  name: string
  role: string
}
const props = defineProps<IProps>()
</script>

<style scoped>

</style>