<template>
  <div class="page">
    <TheHeader>
      <HeaderLogout/>
    </TheHeader>

    <TheAside/>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import {TheHeader, TheAside, HeaderLogout} from "@/widgets";
</script>

<style scoped>
.page {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: max-content auto;
  height: 100vh;
  grid-template-areas: 'header header' 'aside main';
  color: var(--color-text-secondary);
  font-size: 2rem;
}
.main {
  grid-area: main;
  color: var(--color-text-primary);
  padding: 10px;
  font-size: 1.8rem;
}
</style>