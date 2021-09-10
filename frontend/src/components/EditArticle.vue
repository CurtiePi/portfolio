<template>
  <div class="container">
    <InputComponent :initContent="articleContent" :initTitle="articleTitle" label="Intro"
      v-on:childToParent="captureChildData" />
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import InputComponent from '@/components/InputComponent'

export default {
  name: 'EditArticle',
  props: ['caller', 'id', 'intro', 'content'],
  components: {
    InputComponent
  },
  data () {
    return {
      callerName: null,
      articleId: null,
      articleTitle: null,
      articleContent: null
    }
  },
  methods: {
    captureChildData(data) {
      let intro = data.title
      let content = data.content
      this.saveArticle(intro, content)
    },
    async saveArticle (intro, content) {
      if (intro !== null && content !== null) {
        let payload = {
          query: `mutation {
            updateArticle (id: ${this.articleId}, intro: "${intro}", content: "${content}") {
              intro
              isActive
            }
          }`
        }

        try {
          let response = await InformationService.mutateInfo(payload)
          console.log(response.status)
          if (response.status === 200) {
            this.$router.push({ name: this.callerName })
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        this.errorMsg = 'Please write your article and title before trying to save'
      }
    }
  },
  created () {
    if (this.caller) {
      this.callerName = this.caller
      this.articleId = this.id
      this.articleTitle = this.intro
      this.articleContent = this.content
    }
  }
} 
</script>
<style>
</style>
