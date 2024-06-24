import {defineStore} from "pinia";
import {reactive, ref, watch, watchEffect} from "vue";
import {useMentorsStore} from "@/features/mentors/store";
import {learnDirections} from "@/shared/consts";
import type {IStudent, IUpdatedStudent} from "@/features/students/types";
import {fetchStudent, fetchStudents, fetchStudentsList, patchStudent} from "@/features/students/api";
import type {IMentor} from "@/features/mentors/types";
import type {IPagination} from "@/shared/types";
import {searchMentors} from "@/features/mentors/api";
import instance from "@/shared/axios";
import {createTableOptions} from "@/shared/helpers/createTableOptions";
import {createWatchEffect} from "@/shared/helpers/createWatchEffect";
import {useRolesStore} from "@/features/roles";


export interface IStudentStore {
    students: IStudent[]
    student: IStudent
    getStudents: () => void
    getStudent: (id: number) => void
    updateStudent: () => void
    searchName: string
    pagination: IPagination
    studentList: IStudent[]
    getStudentsList: () => IStudent[],
    getStudentsByMentorId: (id: number) => void
}

export const useStudentsStore = defineStore('students', () => {
    const tableOptions = createTableOptions()

    const rolesStore = useRolesStore()

    const students:  IStudent[] = ref([])

    const studentList = ref([])

    const searchName = tableOptions.searchName

    const pagination = tableOptions.pagination

    const queryParams = tableOptions.queryParams

    const student: IUpdatedStudent = reactive ({
        id: 0,
        firstName: '',
        lastName: '',
        avatar: '',
        phone: '',
        email: '',
        learnDirection: '',
        paidMinutes: 0,
        mentor: {value: '', label: ''},
    })

    async function getStudents() {
        try {
            // await fetchStudents({...queryParams, mentorId: tableOptions.userId})
            const {data} = await instance.get(`student?skip=${queryParams.skip}&take=${queryParams.take}&name=${queryParams.name}&mentorId=${rolesStore.role === 'Ментор' ? rolesStore.userId: null}`)
            students.value = data
        } catch (e) {

        }
    }

    async function getStudentsByMentorId(id: number) {
        try {
            const {data} = await instance.get('student/mentor' + id)
            students.value = data
        } catch (e) {

        }
    }

    async function getStudentsList() {
        try {
            // const {data} = await fetchStudents()
            //
            // studentList.value = data.map(student => ({label: student.firstName, value: student.id}))
        } catch (e) {

        }
    }

    async function getStudent(id: number) {
        try {
            const mentorStore = useMentorsStore()
            const [user, mentors] = await Promise.all([fetchStudent(id), mentorStore.getMentorsList()])

            for(let key in user) {
                if(key === 'learnDirection') {

                    student[key] = {
                        label: learnDirections.find(direction => direction.value === user[key])?.label,
                        value: learnDirections.find(direction => direction.value === user[key])?.value,
                    }
                }

                else if (key === 'mentor') {
                    const mentor = mentorStore.mentorList.find(mentorsItem => mentorsItem.id === user[key].id)
                    student[key].label = `${mentor?.firstName} ${mentor?.lastName}`
                    student[key].value = `${user[key].id}`
                }

                else {
                    student[key] = user[key]
                }
            }


        } catch (e) {

        }
    }

    async function updateStudent() {
        try {
            // const {mentor, mentors, learnDirections, ...studentInfo} = student
            const {mentor, ...studentInfo} = student
            const {data} = await patchStudent( {...studentInfo, learnDirection: studentInfo.learnDirection.value, mentorId: +mentor.value})
            alert('Пользователь обновлен')
        } catch (e) {

        }
    }

    createWatchEffect(queryParams, pagination, searchName, getStudents)

    return {
        students,
        student,
        getStudents,
        getStudent,
        updateStudent,
        searchName,
        pagination,
        studentList,
        getStudentsList,
        getStudentsByMentorId
    }
}) as () => IStudentStore