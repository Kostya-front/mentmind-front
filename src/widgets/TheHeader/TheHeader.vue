<template>
  <header class="header">
    <div class="container header__container">
      <router-link to="/"><img src="../../assets/logo.svg" alt="logo"></router-link>

      <slot/>
    </div>
  </header>
</template>

<script lang="ts" setup>


</script>

<style scoped>
.header {
  grid-area: header;
  background: var(--background-color);
  padding: 5px 0;
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>