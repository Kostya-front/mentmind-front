<template>
  <div>
    <q-tabs
        v-model="status"
        no-caps
        outside-arrows
        mobile-arrows
        class="bg-purple text-white shadow-2"
    >
      <q-tab @click="taskStore.getTasks('all')" name="mails" label="Все задачи" />
      <q-tab @click="taskStore.getTasks('true')" name="alarms" label="Все выполненные задачи" />
      <q-tab @click="taskStore.getTasks('false')" name="movies" label="Все невыполненные задачи" />
    </q-tabs>
  </div>
  <q-list bordered padding class="rounded-borders">
    <q-slide-item
        v-for="(task, index) of taskStore.tasks"
        :key="task.title"
        :class="{'completed__task': task.isCompleted}"
        @click="onClick(task.id, !task.isCompleted)"
        @right="onLeft(task.id)"
         >

      <template v-slot:right>
        <div class="row items-center">
         Удалить <q-icon right name="delete" />
        </div>
      </template>

      <div class="content">
        <q-item-section>
          <q-item-label lines="1">{{task.title}}</q-item-label>
          <q-item-label caption>{{task.date}} {{task.time}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" :color="colors[task.status]"/>
        </q-item-section>
      </div>
     </q-slide-item>

  </q-list>
</template>

<script setup lang="ts">

import {Task} from '@/shared/ui/'
import {useTasksStore} from "@/features/tasks/store";
import {computed, onMounted, ref} from "vue";
const taskStore = useTasksStore()

const status = ref('')
const colors = {
  'low': 'green',
  'middle': 'amber',
  'high': 'red'
}
const color = computed((status: string) => {
  return colors
})

function onLeft(id: number) {
  taskStore.deleteTask(id)
}

function onClick(id: number, isCompleted: boolean) {
  taskStore.completeTask(id, isCompleted)
}
onMounted(() => {
  taskStore.getTasks()
})
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  padding: 10px;
}
.completed__task {
  opacity: 0.2;
}
</style>