<template>
  <q-date v-model="lessonStore.range" range @update:model-value="onChange">
    <div class="row items-center justify-end">
      <slot/>
    </div>
  </q-date>
</template>

<script setup lang="ts">
 import {useLessonStore} from "@/features/lessons/store";

 const lessonStore = useLessonStore()
 const emit = defineEmits(['close-modal'])

 async function onChange() {
   await lessonStore.getLessonsByRange()
   // emit('close-modal')
 }
</script>

<style scoped>

</style>