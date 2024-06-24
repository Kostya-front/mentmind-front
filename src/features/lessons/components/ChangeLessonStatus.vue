<template>
  <q-btn @click="onClick">Провести</q-btn>
</template>

<script setup lang="ts">
import {useLessonStore} from "@/features/lessons/store";
interface IProps {
  status: string
}
const props = defineProps<IProps>()
const lessonStore = useLessonStore()

function onClick() {
  lessonStore.changeLessonStatus(props.status)
}
</script>

<style scoped>

</style>