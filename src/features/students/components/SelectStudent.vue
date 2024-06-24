<template>
  <q-select :model-value="modelValue" :options="studentStore.studentList" label="Студенты" />
</template>

<script setup lang="ts">
 import {useStudentsStore} from "@/features/students/store";
  const props = defineProps(['modelValue'])
 const studentStore = useStudentsStore()
</script>

<style scoped>

</style>