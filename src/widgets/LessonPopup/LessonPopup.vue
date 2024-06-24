<template>
  <PopupAlert
      :title="title"
      :model-value="modelValue"
      @update:model-value="onClick"
  >
    <LessonForm/>
    <slot/>
  </PopupAlert>
</template>

<script setup lang="ts">
import PopupAlert from "@/widgets/PopupAlert/PopupAlert.vue";
import LessonForm from '@/widgets/LessonForm/LessonForm.vue'

interface IProps {
  title: string
  modelValue: boolean
  onClick: () => void
}
const props = defineProps<IProps>()
</script>

<style scoped>

</style>