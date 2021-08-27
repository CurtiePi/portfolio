<template>
  <div class="container">
    <InputComponent v-on:childToParent="captureChildData" />
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'
import InputComponent from '@/components/InputComponent'

export default {
  name: 'CreateMessage',
  props: ['caller', 'contact_id', 'contact_email'],
  components: {
    InputComponent
  },
  data () {
    return {
      recipient: ['teserac_4@hotmail.com'],
      callerName: null,
      contactId: null,
      contactEmail: null
    }
  },
  methods: {
    captureChildData(data) {
      let subject = data.title
      let content = data.content
      this.sendMessage(subject, content)
    },
    async sendMessage (subject, content) {
      if (subject !== null && content !== null) {
        this.recipient.push(this.contactEmail)
        var payload = {
          'subject': subject,
          'body': content,
          'recipients': this.recipient
        }

        console.log(payload)

        let response = await InformationService.sendEmail(payload)
        console.log(response.status)
        if (response.status === 200) {
          this.updateMessageStatus()

          this.$router.push({ name: this.callerName })
        }
      } else {
        this.errorMsg = 'Please write your message and subject before trying to email your message!'
      }
    },
    async updateMessageStatus () {
      let payload = {
        query: `mutation {
          updateContactMessageStatus(id: ${this.contactId}, hasMessaged: 1) {
            id
            name
            email
          }
        }`
      }

      console.log(payload)

      try{
        let result = await InformationService.mutateInfo(payload)
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    if (this.contact_id) {
      this.contactId = this.contact_id
    }
    if (this.contact_email) {
      this.contactEmail = this.contact_email
    }
    if (this.caller) {
      this.callerName = this.caller
    }
  }
} 
</script>
<style>
</style>
