import {defineStore} from "pinia";
import type {ILesson, INewLesson} from "@/features/lessons/types";
import {reactive, ref} from "vue";
import instance from "@/shared/axios";
import {fetchLessons, patchLesson} from "@/features/lessons/api";
import {useMentorsStore} from "@/features/mentors/store";
import {useStudentsStore} from "@/features/students/store";
import dayjs from "dayjs";
import {useUserStore} from "@/features/users/store";



interface ILessonStore {
  lessons: ILesson[],
  lesson: INewLesson
  createLesson: () => void
  getLessons: (id?: number, from?: string, to?: string) => void
  selectLesson: (id: number) => void
  updateLesson: () => void
  getLessonsByRange: () => void
  removeConfirm: boolean
  deleteLesson: () => void
  range: {from: string, to: string}
  getLessonsByUserId: () => void
  cleanForm: () => void
  changeLessonStatus: (status: string) => void
}

export const useLessonStore = defineStore('lessons', () => {
  const mentorStore = useMentorsStore()
  const studentStore = useStudentsStore()
  const userStore = useUserStore()


  const lessons = ref<ILesson[]>([])
  const removeConfirm = ref(false)
  const range = ref(``)
  const errorMessage = ref('')
  const lessonTemplate = {
    id: -1,
    date: '',
    time: '',
    comment:'',
    mentorId: userStore.userData.role === 'mentor' ? {label: userStore.userData.lastName, value: userStore.userData.id} : '',
    studentId: '',
    duration: 0,
    urlMeet: '',
    urlVideo: ''
  }

  let lesson = reactive({...lessonTemplate})



  async function getLessons(id: number,from = dayjs().format('YYYY/MM/DD'), to = dayjs().add(7, 'day').format('YYYY/MM/DD')) {
    const data = await fetchLessons(id, from, to)
    lessons.value = data
  }

  async function getLessonsByUserId(from = dayjs().format('YYYY/MM/DD'), to = dayjs().add(7, 'day').format('YYYY/MM/DD')) {
    const data = await instance.get(`lesson/student?from=${from}&to=${to}`)
    lessons.value = data.data
  }

  async function getLessonsByRange() {
    try {
      const {data} = await instance(`lesson/range?from=${range.value.from}&to=${range.value.to}`)
      lessons.value = data
    } catch (e) {

    }
  }

  async function createLesson() {
    try {
      const {data} = await instance.post('lesson', {...lesson, mentorId: lesson.mentorId.value, studentId: lesson.studentId.value})
      lessons.value.push(data)
    } catch (e) {
      errorMessage.value = e.response.data.message
      throw new Error('error')
    }
  }

  async function updateLesson() {
    // const {mentorId, studentId, ...aLesson} = lesson
    try {
      await patchLesson(lesson.id, {...lesson, mentorId: lesson.mentorId.value, studentId: lesson.studentId.value,})

      let foundLesson = lessons.value.find(lessonItem => lessonItem.id === lesson.id)

      console.log(foundLesson)
      foundLesson.time = `${lesson.time}:00`
      foundLesson.comment = lesson.comment
      foundLesson.date = lesson.date
      // for(let key in data) {
      //   foundLesson[key] = lesson[key]
      // }
    } catch (e) {

    }
  }

  async function changeLessonStatus(status: string) {
    await instance.patch(`lesson/${lesson.id}`, {...lesson, mentorId: lesson.mentorId.value, studentId: lesson.studentId.value, status})
  }

  async function deleteLesson() {
    await instance.delete(`lesson/${lesson.id}`)
    lessons.value = lessons.value.filter(lessonItem => lessonItem.id !== lesson.id)
  }

  async function selectLesson(id: number) {
    const data = await instance.get(`lesson/get-one/${id}`)


    for(let key in data.data) {
      if(['mentor', 'student'].includes(key)) {
        lesson[`${key}Id`] = {label: `${data.data[key]?.firstName} ${data.data[key]?.lastName}`, value: data.data[key]?.id}
      } else {
        lesson[key] = data.data[key]
      }
    }

    // const aLesson = data.data
    // lesson.id = aLesson.id
    // lesson.mentorId = {label: `${aLesson.mentor?.firstName} ${aLesson.mentor?.lastName}`, value: aLesson.mentor?.id}
    // lesson.studentId = {label: `${aLesson.student?.firstName} ${aLesson.student?.lastName}`, value: aLesson.student?.id}
    // lesson.duration = aLesson.duration
    // lesson.date = aLesson.date
    // lesson.time = aLesson.time
    // lesson.comment = aLesson.comment
    // lesson.rating = aLesson.rating
  }

  function cleanForm() {
    for(let key in lesson) {
      if(!lessonTemplate[key]) {
        delete lesson[key]
      }
      lesson[key] = lessonTemplate[key]
    }
  }

  return {
    lessons,
    lesson,
    range,
    getLessons,
    createLesson,
    selectLesson,
    updateLesson,
    getLessonsByRange,
    deleteLesson,
    removeConfirm,
    getLessonsByUserId,
    cleanForm,
    changeLessonStatus,
    errorMessage
  }
}) as () => ILessonStore