<template>
  <q-btn @click="popupStore.rangeLessonsPopup = true">Выбрать интервал занятий</q-btn>
  <PopupAlert title="Выбрать интервал" v-model="popupStore.rangeLessonsPopup">
    <GetLessonsByDate @close-modal="popupStore.rangeLessonsPopup = false">
      <q-btn @click="popupStore.rangeLessonsPopup = false" label="Close" color="primary" flat />
    </GetLessonsByDate>
  </PopupAlert>
</template>

<script setup lang="ts">
import {usePopupStore} from "@/features/popup/store";
import {useLessonStore} from "@/features/lessons/store";
import PopupAlert from '@/widgets/PopupAlert/PopupAlert.vue'
import GetLessonsByDate from '@/features/lessons/components/GetLessonsByDate.vue'

const popupStore = usePopupStore()
const lessonStore = useLessonStore()
</script>

<style scoped>

</style>