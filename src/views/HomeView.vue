<script setup lang="ts">

import UserInfo from "@/widgets/UserInfo/UserInfo.vue";
import AdminTasks from "@/widgets/AdminTasks/AdminTasks.vue";

import {useAuthStore} from "@/features/auth/store";
import {useUserStore} from "@/features/users/store";
import {useRolesStore} from "@/features/roles";
const roleStore = useRolesStore()
const userStore = useUserStore()
const rolesStore = useRolesStore()
</script>

<template>
  <component :is="roleStore.userInfo" :name="roleStore.userName" :role="roleStore.role"/>
</template>

<style scoped>

</style>