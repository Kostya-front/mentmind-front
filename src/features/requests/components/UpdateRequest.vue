<template>
	<q-btn @click="onClick" :disable="isDisabled">{{text}}</q-btn>
</template>

<script setup lang="ts">
import {useRequestStore} from "@/features/requests/store";
import {useUserStore} from "@/features/users/store";
import {updateRequestWs} from "@/shared/socket";

interface IAction {
	isSelected?: boolean
	isCompleted?: boolean
}
interface IProps {
	id: number
	action: IAction
	text: string
	isDisabled: boolean
}
const props = defineProps<IProps>()

const requestStore = useRequestStore()
const userStore = useUserStore()

function onClick() {
  updateRequestWs({id: props.id, ...props.action, adminId: userStore.userData.id })

}
</script>

<style scoped>

</style>