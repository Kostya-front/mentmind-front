<template>
  <q-btn label="Удалить" color="purple"  @click="onClick" />
</template>

<script setup lang="ts">
import {useLessonStore} from "@/features/lessons/store";
interface IProps {
  id: number
}
const props = defineProps<IProps>()
const emit = defineEmits(['close-popup'])

const lessonStore = useLessonStore()

function onClick() {
  lessonStore.removeConfirm = true
}
</script>

<style scoped>

</style>