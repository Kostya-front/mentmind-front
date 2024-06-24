<template>
  <div>
    <q-tabs
        v-model="tab"
        no-caps
        class="text-white shadow-2"
        style="background: #181e20"
    >
      <q-tab name="info" icon="info" label="Информация" />
      <q-tab name="students" icon="people" label="Ученики" />
    </q-tabs>

    <component :is="component"/>

  </div>
</template>

<script setup lang="ts">
import UpdateMentor from "../../../features/mentors/components/UpdateMentor.vue";
import {computed, ref} from "vue";
import GetMentorStudents from "@/features/mentors/components/GetMentorStudents.vue";
const tab = ref('info')
const components = {
  info: UpdateMentor,
  students: GetMentorStudents
}

const component = computed(() => {
  return components[tab.value]
})
</script>

<style scoped>
</style>