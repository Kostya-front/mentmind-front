<template>
  <q-item clickable v-close-popup>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
interface IProps {
  label: string
}
const props = defineProps<IProps>()
</script>

<style scoped>

</style>