<template>
  <q-select :model-value="modelValue" @update:model-value="onChange" :disable="disable"  :options="options" :label="label" />
</template>

<script setup lang="ts">
interface IProps {
  modelValue: string
  options: any
  label: string
  disable: boolean
}
const props = defineProps<IProps>( )

const emit = defineEmits(['update:model-value'])

function onChange(event) {
  emit('update:model-value', event)
}
</script>

<style scoped>

</style>