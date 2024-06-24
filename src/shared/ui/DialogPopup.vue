<template>
  <q-dialog :model-value="modelValue" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">{{question}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="primary"  @click="onClick" />
        <slot/>
<!--        <DeleteLesson @close-modal="props.closePopup"/>-->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
interface IProps {
  modelValue: boolean
  question: string
}
const props = defineProps<IProps>()

const emit = defineEmits(['close-modal'])

function onClick() {
  emit('close-modal', false)
}
</script>

<style scoped>

</style>