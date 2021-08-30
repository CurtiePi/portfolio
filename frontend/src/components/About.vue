<template>
  <div class="container">
    <p v-html="content"></p>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'About',
  data () {
    return {
      content: null
    }
  },
  methods: {
    async getContent () {
      let payload = {
        query: `query {
          getContents (id: 1) {
            cover
          }
        }`
      }

      try {
        let result = await InformationService.queryInfo(payload)
        console.log(result.data.data)
        this.content = result.data.data.getContents[0].cover 
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getContent()
  }
}
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

div {
  margin: 0;
  padding: 0;
}

@media (min-width: 320px) {
  .container {
    width: 90%;
    margin: auto;
  }
}

@media (min-width: 560px) {
  .container {
    width: 80%;
    margin: auto;
  }
}
</style>
