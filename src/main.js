// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'
import axios from 'axios'

// PENTING: Inisialisasi header Authorization untuk Axios dari localStorage
const user = JSON.parse(localStorage.getItem('user'))
if (user && user.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
  console.log('main.js: Axios Authorization header set from localStorage.')
} else {
  console.log(
    'main.js: No user token found in localStorage, Authorization header not set initially.',
  )
}

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

console.log('Vue application mounted.')
