<template>
  <form @submit.prevent="onSubmit" class="form">
    <q-input v-model="tasksStore.newTask.title" label="Задача"  />
    <q-select v-model="tasksStore.newTask.status" :options="prioretets" label="Выберите приоретет" />

		  <div>

			  <q-input filled v-model="date">
				  <template v-slot:prepend>
					  <q-icon name="event" class="cursor-pointer">
						  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
							  <q-date v-model="tasksStore.newTask.date" :locale="myLocale" mask="YYYY-MM-DD HH:mm">
								  <div class="row items-center justify-end">
									  <q-btn v-close-popup label="Close" color="primary" flat />
								  </div>
							  </q-date>
						  </q-popup-proxy>
					  </q-icon>
				  </template>

				  <template v-slot:append>
					  <q-icon name="access_time" class="cursor-pointer">
						  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
							  <q-time v-model="tasksStore.newTask.time"  mask="YYYY-MM-DD HH:mm" format24h>
								  <div class="row items-center justify-end">
									  <q-btn v-close-popup label="Close" color="primary" flat />
								  </div>
							  </q-time>
						  </q-popup-proxy>
					  </q-icon>
				  </template>
			  </q-input>
		  </div>

    <q-btn>
      Создать
    </q-btn>
  </form>
</template>

<script setup lang="ts">
 import {ref} from "vue";
 import {useTasksStore} from "@/features/tasks/store";
 import {Store} from "pinia";

 const time = ref('')
 const tasksStore = useTasksStore()
 const task = ref('')
 const prioretets = [
   {label: 'Низкая', value: 'low'},
   {label: 'Средняя', value: 'middle'},
   {label: 'Высокая', value: 'high'},
 ]

 const format = (date) => {
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear();
   const hour = date.getHours()
   const minute = date.getMinutes()
   tasksStore.newTask.date = `${year}.${month}.${day}`
   tasksStore.newTask.time = `${hour}:${minute < 10? '0' + minute: minute}`
 }

 const date = ref('Выберите дату и время')
 const myLocale = {
	 /* starting with Sunday */
	 days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
	 daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
	 months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
	 monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
	 firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
	 format24h: true,
	 pluralDay: 'dias'
 }

 function onSubmit(event) {
   tasksStore.createTask()
   console.log(123)
   event.reset()
 }
</script>

<style scoped>
.form {
  display: grid;
  gap: 20px;
}
</style>