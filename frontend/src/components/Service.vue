<template>
  <div class="container">
    <h1>Services</h1>
    <div>
      <div v-for="service in services" :key="service.id">
        <p class="serviceName">{{ service.name }}</p>
        <br/>
        <span class="description">{{ service.description }}</span>
        <br/>
        <ul class="serviceItems">
          <li v-for="item in service.items" :key="item.id">{{ item.detail }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'Service',
  data () {
    return {
      services: []
    }
  },
  methods: {
    async getServices () {
      let payload = {
        query: `query {
          getServices {
            id
            name
            description
            items {
              id
              detail
            }
          }
        }`
      }

      try {
        let result = await InformationService.queryInfo(payload)
        console.log(result)
        this.services = result.data.data.getServices
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getServices()
  } 
}
</script>
<style scoped>
</style>
