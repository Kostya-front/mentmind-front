
export interface IUser {

    id?: number

    firstName: string

    lastName: string

    role: {value: string}

    avatar: string

    phone: string

    email: string

    password: string

    learnDirection?: {value: string}

    learnDirections?: {value: string}[]

}

export enum LearnDirection {
    FULLSTACK = 'Фуллстак',
    MOBILE = 'Мобильная разработка',
    FRONTEND = 'Фронтенд',
    BACKEND = 'Бэкенд'
}

export enum Roles {
    STUDENT = 'student',
    MENTOR = 'mentor'
}