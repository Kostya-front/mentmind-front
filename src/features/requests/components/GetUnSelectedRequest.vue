<template>
	<span class="wrap">{{requestStore.notSelectedRequests}}</span>
</template>

<script setup lang="ts">
 import {useRequestStore} from "@/features/requests/store";

 const requestStore = useRequestStore()
</script>

<style scoped>
.wrap {
	position: absolute;
	right: 5px;
	background: rebeccapurple;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 7px;
	font-size: 1.5rem;
}
</style>