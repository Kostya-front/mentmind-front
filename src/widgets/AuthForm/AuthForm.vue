<template>
  <div class="form__wrapper">
    <LoginUser/>

  </div>
</template>

<script setup lang="ts">

import LoginUser from "@/features/auth/components/LoginUser.vue";
</script>

<style scoped>
.form__wrapper {
  border: 1px solid;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 10px;
}
</style>