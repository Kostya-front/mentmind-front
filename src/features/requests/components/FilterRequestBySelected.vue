<template>
	<q-tab @click="onClick" :name="name" :label="label" />
</template>

<script setup lang="ts">
import {useRequestStore} from "@/features/requests/store";
import {filterRequests} from "@/shared/socket";

interface IProps {
	name: string
	label: string
  filter: {isSelected?: boolean, isCompleted?: boolean}
}
 const props = defineProps<IProps>()
const requestStore = useRequestStore()

function onClick() {
  filterRequests(props.filter)
	//requestStore.filterRequestsBySelected(props.name)
}
</script>

<style scoped>

</style>