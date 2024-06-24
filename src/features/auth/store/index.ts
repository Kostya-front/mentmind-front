import {defineStore} from "pinia";
import {reactive, ref, watch} from "vue";
import router from "@/router";
import instance from "@/shared/axios";
import {AxiosError} from "axios";
import {useUserStore} from "@/features/users/store";


interface IAuthStore {
  isAuth: boolean
  authData: {login:string, password: string}

  messageError: string
  login: () => void
  checkAuth: () => Promise<void>
  logout: () => void
}

export const useAuthStore = defineStore('auth', () => {

  const userStore = useUserStore()

  const isAuth = ref(false)
  const messageError = ref('')
  const authData = reactive({
    login:'',
    password:''
  })

  async function login() {
    try {
      const {data} = await instance.post('auth/login', {email: authData.login, password: authData.password})

      userStore.userData = {...data}
      localStorage.setItem('accessToken', data.accessToken)
      messageError.value = ''
    } catch(e: AxiosError | Error) {
      if(e instanceof AxiosError) {
       return messageError.value = e.response.data?.message
      }
      messageError.value = 'Кажется, проблемы с сервером...'

      throw new Error('')
    }
  }


  async function checkAuth() {
    try {
      const {data} = await instance.get('auth/check')
      isAuth.value = true

      for (let key in data) {
        userStore.userData[key] = data[key]
      }
     // userStore.userData = {...data}
      return true
    }catch {
      isAuth.value = false
      throw new Error('err')
    }

  }

  async function logout() {
    try {
      await instance('auth/logout')
      localStorage.removeItem('accessToken')
      isAuth.value = false
    } catch {
      throw new Error('error')
    }
  }

  return {
    isAuth,
    checkAuth,
    authData,
    messageError,
    login,
    logout
  }
}) as () => IAuthStore