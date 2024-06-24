<script setup  lang="ts">
import {ref} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import {TheHeader, TheAside, HeaderLogout} from "@/widgets";
import {useRequestStore} from "@/features/requests/store";
import {useAuthStore} from "@/features/auth/store";
import {usePopupStore} from "@/features/popup/store";
import {createRequest, getRequests} from "@/shared/socket";

 const requestStore = useRequestStore()
// const socket = io('http://localhost:3000');
// socket.on('rec', function (message) {
//   console.log(message)
// 	requestStore.addRequest(JSON.parse(message))
//   // Действия с полученным сообщением
// });
//
// socket.on('rec2', function (message) {
//   console.log(message)
//   // Действия с полученным сообщением
// });
// const event = new EventSource('http://localhost:3000/request/stream')

// event.onmessage = function (event) {
// 	requestStore.addRequest(JSON.parse(event.data))
// }
function send() {
  // socket.send(JSON.stringify({
  //   event: 'ping',
  //   payload: {
  //     "email": "mail2@mail.ru",
  //     "text": "Фрондент разработка С полного нуля",
  //     "phone": "73973987"
  //   }
  // }))
  // socket.emit('ping', JSON.stringify({event: 'ping', data: {id: 1}}), (resposnse) => {
  //   console.log(resposnse)
  // })
}
//
// function send2() {
//   socket.emit('message', JSON.stringify({
//     type: 'message',
//     payload: {
//       "email": "mail2@mail.ru",
//       "text": "Фрондент разработка С полного нуля",
//       "phone": "73973987"
//     }
//   }))
// }

console.log(123)
const popupStore = usePopupStore()
getRequests()
</script>

<template>
  <router-view/>

  <div :class="{'loader__active': popupStore.loaderPopup}" class="loader">loader</div>
  <button @click="createRequest">click</button>
</template>

<style scoped>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 30, 32, 0.59);
  color: #fff;
  font-size: 2rem;
  transition: 0.5s;
  visibility: hidden;
  opacity: 0;
}
.loader__active {
  visibility: visible;
  opacity: 1;
}
</style>
