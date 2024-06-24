<template>
  <q-table
      :title="title"
      flat bordered
      :rows="rows"
      :columns="columns"
  >
    <template v-slot:body="props">
      <slot :data="props"/>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import {IColumn} from "@/shared/types";

interface IProps {
  columns: IColumn[]
  rows: any []
  title: string
}
const props = defineProps<IProps>()
</script>

<style scoped>

</style>