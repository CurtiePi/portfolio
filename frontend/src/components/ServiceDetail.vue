<template>
  <div class="container">
    <h1>Services</h1>
    <div>
      <p class="serviceName">{{ service.name }}</p>
      <br/>
      <span class="description">{{ service.description }}</span>
      <br/>
      <ul class="serviceItems">
        <li v-for="item in service.items" :key="item.id">{{ item.detail }}</li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ServiceDetail',
  props: {
    payload: Object,
    caller: String
  },
  data () {
    return {
      service: {},
      callerName: null
    }
  },
  methods: {
  },
  mounted () {
    if (this.payload) {
      this.service = JSON.parse(this.payload)
    }
    if (this.caller) {
      this.callerName = this.caller
    }
  }
}
</script>
<style scoped>
</style>
