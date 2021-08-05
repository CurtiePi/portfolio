import axios from 'axios'
import { options, updateOptions } from './config'

const Api = () => {
  return axios.create(options)
}

function setAuthorization (token) {
    updateOptions('Authorization', token)
}

export { Api, setAuthorization }

