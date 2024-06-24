<template>
	<q-dialog  persistent :model-value="modelValue" @click="close">
		<q-card>
			<q-card-section>
				<div class="text-h6">{{title}}</div>
			</q-card-section>

			<q-card-section class="q-pt-none">
				<slot/>
			</q-card-section>

			<q-card-actions align="right">
				<slot name="action" :closePopup="close"/>
<!--				<q-btn   label="Создать" color="purple" @click="close" />-->
<!--				<q-btn flat label="Отмена" color="primary" @click="close" />-->
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
 import {ref} from "vue";
 interface IProps {
   modelValue: boolean
	 title: string
 }
	const props = defineProps<IProps>()
 const emit = defineEmits(['update:modelValue'])


 function close() {
	 emit('update:modelValue', false)

 }
</script>

<style scoped>

</style>