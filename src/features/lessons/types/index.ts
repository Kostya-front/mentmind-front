
export interface INewLesson {
  id: number

  date: string

  time:string

  mentorId: {
    label: string
    value: number
  }

  studentId:  {
    label: string
    value: number
  }

  comment?: string

  duration: number
}

export interface ILesson {
  id: number

  date: string

  time:string

  mentor: {
    id: number
    firstName: string
    lastName: string
  }

  student: {
    id: number
    firstName: string
    lastName: string
  }

  comment?: string

  duration: number
}