import axios from "axios";
import instance from "@/shared/axios";
import type {ILesson, INewLesson} from "@/features/lessons/types";
import type {IMentor} from "@/features/mentors/types";
import type {IStudent} from "@/features/students/types";

export async function fetchLessons(id: number, from: string, to: string): Promise<axios.AxiosResponse<ILesson[]>> {
  const {data} = await instance.get(`lesson/range?id${id}&from=${from}&to=${to}`)
  return data
}

export async function patchLesson(id: number, lesson: INewLesson): Promise<axios.AxiosResponse<void>> {
  const {data} = await instance.patch(`lesson/${id}`, lesson)
  return data
}
