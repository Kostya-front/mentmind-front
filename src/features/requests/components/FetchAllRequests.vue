<template>
	<q-tab @click="onClick" name="all"   label="Все заявки" />
</template>

<script setup lang="ts">
 import {useRequestStore} from "@/features/requests/store";
 import {getRequests} from "@/shared/socket";
 function onClick() {
	 getRequests()
 }
</script>

<style scoped>

</style>