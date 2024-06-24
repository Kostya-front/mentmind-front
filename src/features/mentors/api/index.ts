import instance from "@/shared/axios";
import axios from "axios";
import type {IUser} from "@/features/users/types";
import type {IMentor} from "@/features/mentors/types";


export async function fetchMentors(query: {
   skip: number,
   take: number,
   name: string
} = {skip: 0, take: 0, name: ''}): Promise<axios.AxiosResponse<IMentor[]>> {
   return instance.get(`mentor?skip=${query.skip}&take=${query.take}&name=${query.name}`)
}

export async function fetchMentorsList(): Promise<IMentor[]> {
   const {data} = await instance.get(`mentor/list`)
   return data
}

export async function fetchMentor(id: number): Promise<axios.AxiosResponse<IMentor>> {
   return instance.get(`mentor/${id}`)
}

export async function searchMentors(name: string): Promise<axios.AxiosResponse<[IMentor[], number]>> {
   return instance.get(`mentor/search/${name}`)
}