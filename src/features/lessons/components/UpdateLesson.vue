<template>
  <q-btn label="Обновить" color="purple"  @click="onClick" />
</template>

<script setup lang="ts">

import {useLessonStore} from "@/features/lessons/store";

const emit = defineEmits(['close-popup'])
const lessonStore = useLessonStore()


async function onClick() {
  await lessonStore.updateLesson()
  emit('close-popup')
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