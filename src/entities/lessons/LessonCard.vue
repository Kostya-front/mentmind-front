<template>
	<div @click="onClick(lesson)" :style="{backgroundColor: cardsColor }" class="card" >
    <p>{{lesson.student?.id}} {{lesson.student?.firstName}} {{lesson.student?.lastName}}</p>
		<p>{{lesson.time}}</p>
    <p>{{lesson.date}}</p>
    <p>{{lesson.mentor?.id}} {{lesson.mentor?.firstName}} {{lesson.mentor?.lastName}}</p>
    <p v-html="lesson.comment"></p>
	</div>
</template>

<script setup lang="ts">

import {ILesson} from "@/features/lessons/types";
import {computed, ref} from "vue";

interface IProps {
  lesson: ILesson
  onClick: (lesson: ILesson) => void
}
const props = defineProps<IProps>()

const colors = [
  {type: 'В процессе', value: 'violet'}
]

const test = ref('')
const cardsColor = computed(() => {
  return colors.find((color) => color.type === props.lesson.status)?.value || 'violet'
})
</script>

<style scoped>
.card {
	border: 1px solid;
	box-shadow: 1px 1px 10px;
	border-radius: 10px;
}
</style>