import instance from "@/shared/axios";
import axios from "axios";
import type {IStudent, IUpdatedStudent} from "@/features/students/types";
import type {ISearchQueryParams} from "@/shared/types";


export async function fetchStudents ({skip, take, name, mentorId}: ISearchQueryParams = {skip: 0, take: 0, name:'', mentorId: 0}): Promise<axios.AxiosResponse<IStudent[]>> {
    return instance.get(`student?skip=${skip}&take=${take}&name=${name}&mentorId=${mentorId}`)
}

export async function fetchStudentsList (): Promise<IStudent[]> {
    const {data} = await instance.get(`student/list`)
    return data
}

export async function fetchStudent (id: number): Promise<axios.AxiosResponse<IStudent>> {
    const {data} = await  instance.get(`student/${id}`)
    return data
}

export async function patchStudent(student: IUpdatedStudent): Promise<axios.AxiosResponse<IUpdatedStudent>> {
    return instance.patch(`student/${student.id}`, student)
}
