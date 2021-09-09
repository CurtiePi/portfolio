import Api from '@/services/Api'

export default {
  queryInfo (payload) {
    return Api.post('/graphql', payload)
  },
  mutateInfo (payload) {
    return Api.post('/graphql', payload)
  },
  sendEmail (payload) {
    return Api.post('/email', payload)
  },
  subscribe (payload) {
    return Api.post('/subscribe', payload)
  }
}
