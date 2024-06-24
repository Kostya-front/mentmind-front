import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {ITask} from "@/features/tasks/types";
import {postTask} from "@/features/tasks/api";
import instance from "@/shared/axios";
import {useUserStore} from "@/features/users/store";


export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<ITask[]>([])
    const userStore = useUserStore()

    const newTask = reactive<ITask>({
        title: '',
        adminId: userStore.userData.id,
        date: '',
        time: '',
        status: {label: 'Низкая', value: 'low'}
    })

    async function createTask() {
        try {
            const {data} = await postTask({...newTask, status: newTask.status.value})
            tasks.value.push(data)
        } catch (e) {
            console.log(e)
        }
    }

    async function getTasks(status: string = 'all') {
        try {
            const {data} = await instance.get(`task?adminId=${userStore.userData.id}&status=${status}`)
            tasks.value = data
        } catch {
            console.log(123)
        }
    }

    async function completeTask(id: number, isCompleted: boolean) {
        try {
            await instance.patch(`task/${id}`, {isCompleted})
            const task = tasks.value.find(task => task.id === id)
            task.isCompleted = isCompleted
        } catch {

        }
    }

    async function deleteTask(id: number) {
        try {
            await instance.delete(`task/${id}`)
            tasks.value = tasks.value.filter(task => task.id !== id)
        } catch {
            console.log(123)
        }
    }

    return {
        tasks,
        newTask,
        createTask,
        getTasks,
        deleteTask,
        completeTask
    }
})