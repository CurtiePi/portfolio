<template>
  <div>
    <h1>Current Posts</h1>
    <p v-for="post in posts"
       :key="post.id">
       Title: {{ post.title }}
       <br>
       Content: {{ post.content }}
    </p>    
    <inputcomponent></inputcomponent>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import Input from '@/components/Input'

export default {
  name: 'Home',
  components: {
    inputcomponent: Input
  },
  data () {
    return {
      posts: [],
      userId: this.$store.getters.getUserId
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

