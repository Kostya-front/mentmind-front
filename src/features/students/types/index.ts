import type {LearnDirection, IUser} from "@/features/users/types";



export interface IStudent extends IUser {
    learnDirection: { label: LearnDirection, value: string }
    paidMinutes: number
}

export interface IUpdatedStudent extends IStudent {
    id: number
    mentorId: number
    mentor: {label: string, value: string}
}