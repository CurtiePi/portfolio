<template>
  <div>
    <form>
      <label htmlFor="title">Title</label>
      <input typye="text" name="title" id="title" v-model.trim="newPost.title" />
      <label htmlFor="content">Content</label>
    </form>
     <editor
       :api-key="mce_key"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | link | help'
       }"
       id="content"
       v-model="newPost.content"
     />
      <button type="button" @click="addPost()">Post</button>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import Editor from '@tinymce/tinymce-vue'
import sanitizeHtml from 'sanitize-html'

export default {
  name: 'Input',
  components: {
    editor: Editor
  },
  data () {
    return {
      newPost: {
        title: null,
        content: null
      },
      mce_key :'thisisadummykey',
      userId: this.$store.getters.getUserId
    }
  },
  methods: {
    async addPost() {
      let htmlContent = this.sanitize(this.newPost.content)
      let payload = {
        query: `mutation {
          addPost(userId: ${this.userId}, title: "${this.newPost.title}", content: "${htmlContent}") {
            id
            title
            content
          }
        }`
      }

      try{
        let result = await InformationService.mutateInfo(payload)
        console.log(result)
        this.newPost.title = null
        this.newPost.content = null
      } catch (err) {
        console.log(err)
      }
    },
    sanitize (htmlString) {
      const sanitizedString = sanitizeHtml(htmlString, {
        allowedTags: false,
        allowedAttributes: false
      })
      return sanitizedString.replaceAll('"', "'").replace(/\n/g, "");
    }

  },
}
</script>
<style>
</style>

