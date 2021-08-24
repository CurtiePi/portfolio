<template>
  <div>
    <img src="/images/skyline.jpg" />
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'Home',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    async getPosts () {
      let payload = {
        query: `query {
          posts {
            id
            title
            content
          }
        }`
      }

      try{
        let result = await InformationService.queryInfo(payload)
        this.posts = result.data.data.posts
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getPosts()
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

@media (min-width: 320px) {
  div { 
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

@media (min-width: 560px) {
  div { 
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>

