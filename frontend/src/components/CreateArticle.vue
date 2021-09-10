<template>
  <div class="container">
    <InputComponent label="Intro" 
      v-on:childToParent="captureChildData" />
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import InputComponent from '@/components/InputComponent'

export default {
  name: 'CreateArticle',
  props: ['caller'],
  components: {
    InputComponent
  },
  data () {
    return {
      callerName: null,
    }
  },
  methods: {
    captureChildData(data) {
      let subject = data.title
      let content = data.content
      this.saveArticle(subject, content)
    },
    async saveArticle (subject, content) {
      if (subject !== null && content !== null) {

        let payload = {
          query: `mutation {
            addArticle (intro: "${subject}", content: "${content}") {
              intro
              isActive
            }
          }`
        }

        try {
          let response = await InformationService.mutateInfo(payload)
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
  mounted () {
    if (this.caller) {
      this.callerName = this.caller
    }
  }
} 
</script>
<style>
</style>
