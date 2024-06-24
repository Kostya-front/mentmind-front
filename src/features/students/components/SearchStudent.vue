<template>
  <q-input v-model="studentsStore.searchName" placeholder="Поиск студента">
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>


<script setup lang="ts">

import {useStudentsStore} from "@/features/students/store";

const studentsStore = useStudentsStore()

</script>

<style scoped>

</style>