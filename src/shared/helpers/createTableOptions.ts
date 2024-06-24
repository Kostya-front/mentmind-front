import {computed, reactive, ref, watchEffect} from "vue";
import type {IPagination} from "@/shared/types";
import {useRolesStore} from "@/features/roles";

export function createTableOptions() {

    const rolesStore = useRolesStore()

    const searchName = ref('')

    const userId = ref(rolesStore.role === 'Ментор' ? rolesStore.userId : null)

    const pagination = ref<IPagination>({
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 0
    })

    const queryParams = reactive<{skip: number, take: number, name: string}>({
        skip: 0,
        take: 3,
        name: '',
    })


    return {
        queryParams,
        pagination,
        searchName,
        userId: userId.value
    }
}