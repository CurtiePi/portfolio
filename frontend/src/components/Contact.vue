<template>
  <div class="container">
    <p>Leave your contact information</p>
    <form>
      <span class="label-holder">
        <label htmlFor="name">Name</label>
      </span>
      <span class="input-holder">
        <input type="text" name="name" id="name" v-model.trim="contactInfo.name" />
      </span>
      <span class="label-holder">
        <label htmlFor="email">Email</label>
      </span>
      <span class="input-holder">
        <input type="text" name="email" id="email" v-model.trim="contactInfo.email" />
      </span>
      <span class="label-holder">
        <label htmlFor="cover">About You</label>
      </span>
        <span class="input-holder">
      <textarea name="cover" id="cover" cols="80" rows="6" v-model.trim="contactInfo.cover"></textarea>
      </span>
    </form>
    <button type="button" @click="saveContact()">Send</button>
    
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'Contact',
  data () {
    return {
      contactInfo: {
        name: null,
        email: null,
        cover: null
      }
    }
  },
  methods: {
    async saveContact () {
      let contact = this.contactInfo
      let payload = {
        query: `mutation {
          addContact (name: "${contact.name}", email: "${contact.email}", cover: "${contact.cover}") {
            name
            email
            cover
          }
        }`
      }

      try {
        let result = await InformationService.mutateInfo(payload)
        if(result.status === 200) {
          this.$store.commit('scheduleRefresh', { type: 'contacts' })
          this.$router.replace({ name: 'Home' })
        }
      } catch (err) {
        console.log(err)
      }
    }
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
  width: 90%;
  padding: 15px;
  margin: 50px auto 0px auto;
  clear: both;
  overflow: hidden;
}

div.container span.label-holder {
  display: block;
  width: calc(25% - 10px);
  float: left;
  padding: 5px;
}
             
div.container span.input-holder {
  display: block;
  width: calc(75% - 10px);
  float: left;
  padding: 5px;
}

div.container span.input-holder input[type="text"]{
  width: 100%;
}

div.container span.input-holder textarea {
  width: 100%;
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
