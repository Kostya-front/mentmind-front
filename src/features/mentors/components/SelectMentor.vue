<template>
  <q-select :model-value="modelValue" @update:model-value="onChange"  :options="mentorsStore.mentorList" label="Standard" />
</template>

<script setup lang="ts">
import {useMentorsStore} from "@/features/mentors/store";
const props = defineProps(['modelValue'])
const mentorsStore = useMentorsStore()
const emit = defineEmits(['update:model-value'])

function onChange(event) {
  emit('update:model-value', event)
}
</script>

<style scoped>

</style>