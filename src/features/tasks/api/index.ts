import instance from "@/shared/axios";
import type {ITask} from "@/features/tasks/types";
import axios from "axios";


export const postTask = (newTask): Promise<axios.AxiosResponse<ITask>> => {
      return instance.post<ITask>('task', newTask)
}
