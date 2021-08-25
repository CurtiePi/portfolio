<template>
  <div>
    <form>
      <label htmlFor="title">Title</label>
      <input
         type="text"
         name="title"
         id="title"
         v-model.trim="newPost.title"
       />
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
      <button type="button" @click="postToParent()">Post</button>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'Input',
  components: {
    editor: Editor
  },
  emits: [ 'childToParent' ],
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
    postToParent () {
      this.$emit('childToParent', this.newPost)
    }
  },
}
</script>
<style scoped>
</style>

