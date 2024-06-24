<template>
	<q-btn-dropdown color="purple" label="Выбрать тип занятия">
		<q-list>
      <DropdownItem @click="popupStore.createLessonPopup = true" label="Индивидуальный"/>

      <DropdownItem @click="popupStore.createLessonPopup = true" label="Пробный"/>
		</q-list>
	</q-btn-dropdown>
	<slot/>
</template>

<script setup lang="ts">
import {usePopupStore} from "@/features/popup/store";
import DropdownItem from "@/shared/ui/DropdownItem.vue";

const popupStore = usePopupStore()


</script>

<style scoped>

</style>