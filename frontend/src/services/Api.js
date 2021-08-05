import axios from 'axios'
import store from '../store'

const baseURL = 'http://192.168.1.3:3020'


let axiosConnection = axios.create({
  baseURL,
})

axiosConnection.interceptors.request.use((request) => {
    if (store.getters.isAuth) {
      request.headers['Authorization'] = store.getters.getToken
    }
    return request
})

export default axiosConnection
