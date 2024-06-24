<template>
  <div class="cards">
    <LessonCard v-for="item of lessonStore.lessons" :key="item.id" :lesson="item"/>
  </div>
</template>

<script setup lang="ts">
 import {useLessonStore} from "@/features/lessons/store";
 import {usePopupStore} from "@/features/popup/store";
import {onMounted} from "vue";
import LessonCard from '@/entities/lessons/LessonCard.vue'
 const lessonStore = useLessonStore()

 onMounted(() => {
   lessonStore.getLessonsByUserId()
 })
</script>

<style scoped>

</style>