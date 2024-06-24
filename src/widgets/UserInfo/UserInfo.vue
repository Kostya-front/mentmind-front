<template>
  <div class="wrap border__wrap">
    <div class="info">
      <div class="avatar"><img src="@/assets/ava.png" alt=""></div>
      <div class="info__text">
        <span>{{name}}</span>
        <span>{{role}}</span>
      </div>
    </div>

    <RefreshUser/>

    <slot/>
  </div>
</template>

<script setup lang="ts">

import {RefreshUser} from "@/features";
interface IProps {
  name: string
  role: string
}
defineProps<IProps>()
</script>

<style scoped>
.wrap {
}
.info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}
.info__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>