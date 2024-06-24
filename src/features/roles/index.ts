import {defineStore} from "pinia";
import {useUserStore} from "@/features/users/store";
import {useAuthStore} from "@/features/auth/store";
import {useMentorsStore} from "@/features/mentors/store";
import {useStudentsStore} from "@/features/students/store";
import {computed} from "vue";
import {useLessonStore} from "@/features/lessons/store";
import GetLessonsByStudentId from "@/features/lessons/components/GetLessonsByStudentId.vue";
import HomeAdmin from '@/widgets/HomeAdmin/HomeAdmin.vue'
import HomeMentor from '@/widgets/HomeMentor/HomeMentor.vue'
import HomeStudent from '@/widgets/HomeStudent/HomeStudent.vue'
import instance from "@/shared/axios";

export const useRolesStore = defineStore('roles', () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const mentorStore = useMentorsStore()
  const studentStore = useStudentsStore()
  const lessonStore = useLessonStore()

  const infos = [
    {role: 'student', component: HomeStudent},
    {role: 'admin', component: HomeAdmin},
    {role: 'mentor', component: HomeMentor},
  ]

  const roles = [
    {role: 'student', value: 'Клиент'},
    {role: 'admin', value: 'Администратор'},
    {role: 'mentor', value: 'Ментор'},
  ]

  const userInfo = computed(() => {
    const info = infos.find(info => info.role === userStore.userData.role)

    return info?.component || null

  })


  const userName = computed(() => {
    return `${userStore.userData.firstName} ${userStore.userData.lastName}`
  })

  const role = computed(() => {
    return roles.find(roleItem => roleItem.role === userStore.userData.role)?.value
  })

  const userId = computed(() => {
    return userStore.userData.id
  })


  const enabledElements = {
    admin: {
      mentorSelect: true,
      studentSelect: true,
      buttons: true
    },
    mentor: {
      mentorSelect: false,
      studentSelect: true,
      buttons: true
    },
    student: {
      mentorSelect: false,
      studentSelect: false,
      buttons: false
    },
  }

  const isDisabled = computed(() => {
    return enabledElements[userStore.userData.role]
  })



  return {
    isDisabled,
    userInfo,
    userName,
    role,
    userId,


  }
})