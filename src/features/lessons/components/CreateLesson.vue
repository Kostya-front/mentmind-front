<template>
  <q-btn label="Создать" color="purple"  @click="onClick" />
</template>

<script setup lang="ts">

import {useLessonStore} from "@/features/lessons/store";

const emit = defineEmits(['close-popup'])
const lessonStore = useLessonStore()


async function onClick() {
  try {
    await lessonStore.createLesson()
    emit('close-popup')
  } catch {

  }
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