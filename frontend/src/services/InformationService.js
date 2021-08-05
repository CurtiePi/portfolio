import { Api, setAuthorization } from '@/services/Api'

export default {
  queryInfo (payload) {
    return Api().post('/graphql', payload)
  },
  mutateInfo (payload) {
    return Api().post('/graphql', payload)
  },
  setAuthorization (payload) {
    setAuthorization(payload)
    return payload
  }
}
