import {io} from "socket.io-client";
import {useRequestStore} from "@/features/requests/store";

const socket = io('http://localhost:3000/')

socket.on('CREATE_REQUEST', (message) => {
  console.log(message)
  const requestStore = useRequestStore()
  requestStore.requests.push(JSON.parse(message))
})

socket.on('GET_REQUEST', (message) => {
  const requestStore = useRequestStore()
  requestStore.requests = JSON.parse(message)
})

socket.on('TAKE_REQUEST', (message) => {
  const requestStore = useRequestStore()
  const request = JSON.parse(message)
  requestStore.updateRequest(request)
})

socket.on('FILTER_REQUESTS', (message) => {
  const requestStore = useRequestStore()
  const requests = JSON.parse(message)
  requestStore.requests = requests
})

export function getRequests() {
  socket.emit('GET_REQUEST')
}

export function filterRequests(filter: {isSelected?: boolean, isCompleted?: boolean}) {
  socket.emit('FILTER_REQUESTS', JSON.stringify(filter))
}
export function createRequest() {
    socket.emit( 'CREATE_REQUEST', JSON.stringify(
      {
        phone: "123123",
        email: "qweqwe@mail.ru",
        text: "asdasdasdasdsad"
      }
    ))
}

export function updateRequestWs(request: IRequest) {
  socket.emit( 'TAKE_REQUEST', JSON.stringify(
    request
  ))
}