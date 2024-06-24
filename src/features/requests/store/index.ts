import {defineStore} from "pinia";
import {computed, ref, watchEffect} from "vue";
import {fetchRequests, fetchRequestsBySelected, patchRequest} from "@/features/requests/api";
import {filterRequests, getRequests, updateRequestWs} from "@/shared/socket";


export interface IRequestStore {
  requests: {isSelected: boolean}[]
  getAll: () => Promise<void>
  updateRequest: (request: IRequest) => void
  filterRequestsBySelected: (filter: string) => Promise<void>
  addRequest: (request) => void
  notSelectedRequests: number
}
export const useRequestStore = defineStore('requests', () => {
  const requests = ref<IRequest[]>([])

  const tabFilter = ref('')

  const filterItems = {
    selected: {isSelected: true},
    notSelected: {isSelected: false},
    completed: {isCompleted: true}
  }


  async function getAll() {
    const {data} = await fetchRequests()
    requests.value = data
  }

  async function filterRequestsBySelected(filter: string) {
    const {data} = await fetchRequestsBySelected(Boolean(filter))
    requests.value = data
  }

  async function updateRequest(request: IRequest) {
    //await patchRequest(request)

    const updatedRequest = requests.value.find(requestItem => requestItem.id === request.id)

    for(let key in request) {
      updatedRequest[key] = request[key]
    }

  }

  function addRequest(request) {
    requests.value.unshift(request)
  }

  const notSelectedRequests = computed(() => {
    return requests.value.filter(request => !request.isSelected).length
  })

  watchEffect(() => {
    const filter = filterItems[tabFilter.value]
    if(filter) {
      filterRequests(filter  )
    } else {
      getRequests()
    }
  })

  return {
    requests,
    getAll,
    updateRequest,
    tabFilter,
    addRequest,
    notSelectedRequests,
    filterRequestsBySelected
  }
}) as () => IRequestStore