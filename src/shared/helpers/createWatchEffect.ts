import {watchEffect} from "vue";
import {fetchStudents} from "@/features/students/api";

interface IQueryParam {
    skip: number
    take: number
    name: string
}
interface IPagination {
    value: {
        page: number
        rowsPerPage: number
    }
}

interface ISearchName {
    value: string
}
export function createWatchEffect(
    queryParams: IQueryParam,
    pagination: IPagination,
    searchName: ISearchName,
    callback: () => Promise<any>) {
    return watchEffect(async () => {
        queryParams.skip = (pagination.value.page - 1) * pagination.value.rowsPerPage
        queryParams.take = pagination.value.rowsPerPage
        queryParams.name = searchName.value
        await callback()
    }, {flush: "post"})
}