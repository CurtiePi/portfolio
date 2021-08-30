<template>
  <div>
    <h1>Current Posts</h1>
    <p v-for="post in posts"
       :key="post.id">
       Title: {{ post.title }}
       <br>
       Content: {{ post.content }}
    </p>    
    <InputComponent v-on:childToParent="captureChildData" />
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import InputComponent from '@/components/InputComponent'
import sanitizeHtml from 'sanitize-html'

export default {
  name: 'Home',
  components: {
    InputComponent
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
          getPosts {
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
    },
    async addPost(titleText, content) {
      let userId = this.$store.getters.getUserId
      let payload = {
        query: `mutation {
          addPost(userId: ${userId}, title: "${titleText}", content: "${content}") {
            id
            title
            content
          }
        }`
      }

      try{
        let result = await InformationService.mutateInfo(payload)
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    },
    captureChildData (data) {
      console.log(data)
      let titleText = data.title
      let content = this.sanitize(data.content)
      this.addPost(titleText, content)
    },
    sanitize (htmlString) {
      const sanitizedString = sanitizeHtml(htmlString, {
        allowedTags: false,
        allowedAttributes: false
      })
      return sanitizedString.replaceAll('"', "'").replace(/\n/g, "");
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
<style>
</style>

