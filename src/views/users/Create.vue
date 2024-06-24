<template>
  <div class="view">
    <h1 class="title">Создать личность</h1>
    <CreateUser/>
  </div>
</template>

<script setup lang="ts">
import {CreateUser} from "@/features";
</script>

<style scoped>
.view {
  grid-column: 1/3;
}
.title {
  font-size: 4.8rem;
}
</style>