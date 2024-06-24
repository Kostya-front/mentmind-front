import axios from "axios";
import instance from "@/shared/axios";


export async function fetchRequests(): Promise<axios.AxiosResponse<{text: string, email: string, phone: string}[]>> {
    return instance.get('request')
}

export async function fetchRequestsBySelected(filter: boolean): Promise<axios.AxiosResponse<{text: string, email: string, phone: string}[]>> {
    return instance.get(`http://localhost:3000/request/filtered?isSelected=${filter}`)
}

export async function patchRequest(request: {id: number, isSelected?: boolean, isCompleted?: boolean}): Promise<axios.AxiosResponse<void>> {
    const {id, ...updatedRequest} = request
    return instance.patch(`request/${request.id}`, updatedRequest)
}