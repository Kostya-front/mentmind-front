import {defineStore} from "pinia";
import {reactive, ref, watch, watchEffect} from "vue";

import {fetchMentor, fetchMentors, fetchMentorsList, searchMentors} from "@/features/mentors/api";
import type {IMentor} from "@/features/mentors/types";
import type {IPagination} from "@/shared/types";
import instance from "@/shared/axios";
import {Notify} from "quasar";
import {createTableOptions} from "@/shared/helpers/createTableOptions";
import {createWatchEffect} from "@/shared/helpers/createWatchEffect";


export interface IMentorStore {
    mentors: {count: number, items: IMentor[]}
    getMentors: (queryParams: {skip: number, name: string, take: number}) =>  IMentor[]
    getMentorsList: () => IMentor[]
    mentor: IMentor
    getMentor: (id: number) => void
    pagination: IPagination
    searchMentor: (name: string) => void
    updateMentor: () => void
    searchName: string
    mentorList: IMentor[]
}



export const useMentorsStore = defineStore('mentors', () => {
    const tableOptions = createTableOptions()

    const mentors: IMentor[] = ref([])

    const searchName = tableOptions.searchName

    const pagination = tableOptions.pagination

    const queryParams = tableOptions.queryParams

    const mentor: IMentor = reactive({
        id: 0,
        firstName: '',
        lastName: '',
        avatar: '',
        phone: '',
        email: '',
        learnDirections: [],
    })

    const mentorList = ref([])

    async function getMentors() {
        try {
            const {data} = await fetchMentors(queryParams)
            // mentors.count = data[1]
            // mentors.items = data[0]
            mentors.value = data


            // pagination.value.rowsNumber = mentors.value.length

            return mentors
        } catch (e) {
            console.log(e)
        }
    }

    async function getMentorsList() {
        try {
           const {data} = await fetchMentors()
            mentorList.value = data.map(mentor => ({label: mentor.firstName, value: mentor.id}))
        } catch (e) {

        }
    }

    async function getMentor(id: number) {
        const directions = {
            'mobile': 'Мобильная разработка',
            'frontend': 'Фронтенд',
            'backend': 'Бэкенд',
            'fullstack': 'Фулстак'
        }
        try {
           const {data} = await fetchMentor(+id)
            for(let key in data) {
                if(key === 'learnDirections') {
                    mentor[key] = data[key].map(direction => {
                        return {value: direction, label: directions[direction]}
                    })
                }
                else {
                    mentor[key] = data[key]
                }
            }
        } catch (e) {

        }
    }

    // async function searchMentor(name: string) {
    //     try {
    //         const {data} = await searchMentors(name)
    //         pagination.value.rowsNumber = data[1]
    //         mentors.items = data[0]
    //     } catch (e) {
    //
    //     }
    // }

    async function updateMentor() {
        try {
            await instance.patch(`mentor/${mentor.id}`, {...mentor, learnDirections: mentor.learnDirections.map(learn => learn.value)})

        } catch (e) {
            Notify.create('Danger, Will Robinson! Danger!')
            console.log(e)
        }
    }

    createWatchEffect(queryParams, pagination, searchName, getMentors)

    return {
        mentor,
        tableOptions,
        mentors,
        pagination,
        queryParams,
        getMentors,
        getMentor,
        getMentorsList,
        searchName,
        mentorList,
        updateMentor
    }
}) as () => IMentorStore