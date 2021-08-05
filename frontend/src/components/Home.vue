<template>
  <div>
    <h1>Current Posts</h1>
    <p v-for="post in posts"
       :key="post.id">
       Title: {{ post.title }}
       <br>
       Content: {{ post.content }}
    </p>    
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
<style>
</style>

