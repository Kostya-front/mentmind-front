<template>
  <q-btn flat label="Удалить" color="red" @click="onClick"/>
</template>

<script setup lang="ts">
import {useLessonStore} from "@/features/lessons/store";
const emit = defineEmits(['close-modal'])

const lessonStore = useLessonStore()

async function onClick() {
  await lessonStore.deleteLesson()
  emit('close-modal')
}
</script>

<style scoped>

</style>