<template>
	<div>
		<q-tabs
			v-model="requestStore.tabFilter"
			class="text-teal"
    >
      <q-tab name="all"   label="Все  "/>
      <q-tab name="selected" label="Все занятые"/>
      <q-tab name="notSelected"  label="Все незанятые"/>
      <q-tab name="completed"  label="Все завершенные"/>
<!--			<FetchAllRequests/>-->
<!--			<FilterRequestBySelected :filter="{isSelected: true}" name="true" label="Все на рассмотрении" />-->
<!--			<FilterRequestBySelected :filter="{isSelected: false}" name="false" label="Все невыбранные" />-->
<!--			<q-tab name="completed" :filter="{isCompleted: true}"  label="Все завершенные"/>-->
		</q-tabs>

		<q-table
			title="Заявки"
			flat bordered
			:rows="requestStore.requests"
			:columns="columns"
			row-key="firstName"
		>

			<template v-slot:body="props">
				<q-tr class="qwe"  :props="props">
					<q-td key="phone" :props="props">
						<a href="#">{{ props.row.id }}</a>
					</q-td>

					<q-td key="phone" :props="props">
						<a href="#">{{ props.row.phone }}</a>
					</q-td>

					<q-td key="email" :props="props">
						<a href="#">{{ props.row.email }}</a>
					</q-td>

					<q-td key="email" style="text-wrap: balance" :props="props">
						{{ props.row.text }}
					</q-td>

					<q-td key="isSelected" :props="props">
						<a href="#">{{ props.row.isSelected? 'Да': 'Нет' }}</a>
					</q-td>

					<q-td key="isCompleted" :props="props">
						<a href="#">{{ props.row.isCompleted? 'Да': 'Нет' }}</a>
					</q-td>

					<q-td key="actions" :props="props">
						<div  v-if="userStore.userData.id === props.row?.admin?.id || (!props.row.isSelected && !props.isCompleted)">
							<UpdateRequest
								v-if="!props.row.isSelected && !props.row.isCompleted"
								:action="{isSelected: true}"
								:id="props.row.id"
								text="Рассмотреть"

							/>
							<UpdateRequest
								v-else
								:action="{isSelected: false}"
								:id="props.row.id"
								text="Отказаться"

							/>

							<UpdateRequest
								v-if="!props.row.isCompleted"
								:action="{isCompleted: true}"
								:id="props.row.id"
								text="Завершить"

							/>
							<UpdateRequest
								v-else
								:action="{isCompleted: false}"
								:id="props.row.id"
								text="Вернуть"

							/>
						</div>
            <div v-else>Заявка на рассмотрении</div>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";

import {useRequestStore} from "@/features/requests/store";
import UpdateRequest from "@/features/requests/components/UpdateRequest.vue";
import FilterRequestBySelected from "@/features/requests/components/FilterRequestBySelected.vue";
import FetchAllRequests from "@/features/requests/components/FetchAllRequests.vue";
import {useUserStore} from "@/features/users/store";
const requestStore = useRequestStore()
const userStore = useUserStore()
const tab = ref('')

const columns = [
	{
		name: 'id',
		required: true,
		label: 'ID',
		align: 'left',
		field: 'id',

	},
  {
    name: 'phone',
    required: true,
    label: 'Телефон',
    align: 'left',
    field: 'phone',

  },
  {name:'email', align: 'left', label: 'Email', field: 'email'},
  {name:'text',  align: 'left', label: 'Заявка', field: 'text'},
	{name:'isSelected',  align: 'left', label: 'На рассмотрении',},
	{name:'isCompleted',  align: 'left', label: 'Завершена',},
	{name:'actions',  align: 'left', label: 'Действия',},
]
function test() {
	console.log(tab.value)
}
onMounted(async () => {
  await requestStore.getAll()

})
</script>

<style scoped>

</style>

