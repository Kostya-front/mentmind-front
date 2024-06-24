<template>
  <q-input v-model="mentorStore.searchName" placeholder="Поиск ментора">
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>


<script setup lang="ts">

import {useMentorsStore} from "@/features/mentors/store";

const mentorStore = useMentorsStore()




</script>

<style scoped>

</style>