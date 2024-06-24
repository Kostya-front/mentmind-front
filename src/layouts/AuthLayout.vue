<template>
  <div class="page__auth">
    <router-view/>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.page__auth {
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(300px, 30%);
  align-items: center;
  justify-content: center;
}
</style>