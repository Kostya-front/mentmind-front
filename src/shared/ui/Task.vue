<template>
  <li>
    <span>{{index + 1}}</span>
    <span>{{task.title}}</span>
    <slot/>
  </li>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {ITask} from "@/features/tasks/types";
interface IProps {
  task:ITask
  index: number
}
const props = defineProps<IProps>()
</script>

<style scoped>

</style>