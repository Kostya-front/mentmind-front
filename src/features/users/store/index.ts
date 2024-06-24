import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import type {IUser} from "@/features/users/types";
import instance from "@/shared/axios";
import type {LearnDirection} from "@/features/users/types";
import {AxiosError} from "axios";

export interface IUserStore {
    typeInput: string
    newUser:  IUser,
    selectedUser: IUser
    rules: any
    onReset: () => void
    userData: Omit<IUser, 'role'> & {role: string}
    createUser: () => Promise<void>
    updateUser: () => void
}
export const useUserStore = defineStore('users', () => {
    const typeInput = ref('password')
    const messageError = ref('')

    let userData = reactive({})

    const selectedUser = reactive({
        firstName: '',
        lastName: '',
        phone: ''
    })

    const newUser: IUser = reactive({
        firstName: '',

        lastName: '',

        role: {value: '', label: ''},

        avatar: '',

        phone: '',

        email: '',

        password: '',
    })

    const rules = reactive({
        firstName: [
            (val: string) => val.length >= 2 ? true : 'Имя должно содержать быть более 2 букв',
            (val: string) => val.match(/^[А-Я]/) ? true : 'Имя должно начинаться с большой буквы'
        ],
        lastName: [
            (val: string) => val.length >= 2 ? true : 'Фамилия должно содержать быть более 2 букв',
            (val: string) => val.match(/^[А-Я]/) ? true : 'Фамилия должно начинаться с большой буквы'
        ],
        email: [
            (val: string) => val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : 'Почта невалидная'
        ],
        role: [
            (val: {value: string}) => val.value ? true : 'Надо выбрать роль'
        ]
    })

    async function createUser() {
        try {
            const learnDirections = newUser?.learnDirections?.map(direction => direction.value) || []
            const learnDirection = newUser?.learnDirection?.value
            const {data} = await instance.post<IUser>('auth/register', {
                ...newUser,
                role: newUser.role.value,
                learnDirections,
                learnDirection
            })

            for(let key in newUser) {
                newUser[key] = ''
            }
            alert('Пользователь успешно создан')
        } catch (e: any) {
            messageError.value = e
            console.log(e)
        }
    }

    function onReset(){
        for(let key in newUser) {
            newUser[key] = null
        }
    }

    function toggleTypeInput() {
        typeInput.value === 'password' ? typeInput.value = 'text':typeInput.value = 'password'
    }

    async function updateUser() {
        try {
            const {data} = await instance.patch(`user/${userData.id}`, selectedUser)
            userData.firstName = selectedUser.firstName
            userData.lastName = selectedUser.lastName
        } catch (e) {

        }
    }

    return {
        newUser,
        typeInput,
        toggleTypeInput,
        updateUser,
        createUser,
        selectedUser,
        userData,
        rules,
        onReset
    }
}) as () => IUserStore
