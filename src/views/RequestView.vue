<template>
  <div>
      <GetRequests/>
  </div>
</template>

<script setup lang="ts">

import GetRequests from "@/features/requests/components/GetRequests.vue";
import {useRequestStore} from "@/features/requests/store";
</script>

<style scoped>

</style>