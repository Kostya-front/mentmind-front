<template>
<div>
	<SelectionTypeLesson>
		<PopupAlert
        title="Создание занятия"
        v-model="popupStore.createLessonPopup"
        @update:model-value="usePopupStore.createLessonPopup = false"
    >
			<LessonForm/>
			<template v-slot:action="props">
				<CreateLesson @close-popup="props.closePopup"/>
        <q-btn @click="props.closePopup">Отмена</q-btn>
			</template>
		</PopupAlert>

    <PopupAlert
        v-model="popupStore.updateLessonPopup"
        @update:model-value="usePopupStore.updateLessonPopup = false"
        title="Редактирование занятия"
    >
      <LessonForm/>
      <template v-slot:action="props">
        <div v-if="roleStore.isDisabled.buttons">
          <ChangeLessonStatus status="Законченное"/>

          <UpdateLesson @close-popup="props.closePopup"/>

          <ConfirmDeleteLesson @close-popup="props.closePopup"/>
        </div>

        <q-btn @click="() => {
          props.closePopup();
          lessonStore.cleanForm()
        }">Отмена</q-btn>

        <DialogPopup
            v-model="lessonStore.removeConfirm"
            @close-modal="lessonStore.removeConfirm = false"
            question="Вы точно хотите удалить занятие?"
        >
          <DeleteLesson @close-modal="close"/>
        </DialogPopup>
      </template>
    </PopupAlert>
	</SelectionTypeLesson>

  <RangeLessons/>

  <GetLessons/>
</div>
</template>

<script setup lang="ts">

import SelectionTypeLesson from "@/features/lessons/components/SelectionTypeLesson.vue";
import PopupAlert from "@/widgets/PopupAlert/PopupAlert.vue";
import CreateLesson from "@/features/lessons/components/CreateLesson.vue";
import LessonForm from "@/widgets/LessonForm/LessonForm.vue"
import {usePopupStore} from "@/features/popup/store";
import GetLessons from "@/features/lessons/components/GetLessons.vue";
import UpdateLesson from "@/features/lessons/components/UpdateLesson.vue";
import {ref} from "vue";
import {useLessonStore} from "@/features/lessons/store";
import ConfirmDeleteLesson from "@/features/lessons/components/ConfirmDeleteLesson.vue";
import DeleteLesson from "@/features/lessons/components/DeleteLesson.vue";
import DialogPopup from "@/shared/ui/DialogPopup.vue";
import RangeLessons from "@/widgets/RangeLessons/RangeLessons.vue";
import ChangeLessonStatus from "@/features/lessons/components/ChangeLessonStatus.vue";
import {useRolesStore} from "@/features/roles";

const popupStore = usePopupStore()
const lessonStore = useLessonStore()
const date = ref(new Date())
const roleStore = useRolesStore()

function close () {
  popupStore.updateLessonPopup = false
  lessonStore.removeConfirm = false
}

</script>

<style scoped>

</style>