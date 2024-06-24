import {LearnDirection, Roles} from "@/features/users/types";

interface IOption<T> {
    label: T
    value: string
}
export const learnDirections: IOption<LearnDirection>[] = [
    {label: LearnDirection.MOBILE, value: 'mobile'},
    {label: LearnDirection.FRONTEND, value: 'frontend'},
    {label: LearnDirection.BACKEND, value: 'backend'},
    {label: LearnDirection.FULLSTACK, value: 'fullstack'},
]

export const roles: IOption<Roles>[] = [
    {label: Roles.STUDENT, value: 'student'},
    {label: Roles.MENTOR, value: 'mentor'},
]