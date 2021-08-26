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
  props: ['payload', 'caller'],
  components: {
    InputComponent
  },
  data () {
    return {
      recipient: ['teserac_4@hotmail.com'],
      callerName: null
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
        var payload = {
          'subject': subject,
          'body': content,
          'recipients': this.recipient
        }


        let response = await InformationService.sendEmail(payload)
        console.log(response.status)
        if (response.status === 200) {
          this.$router.replace({ name: this.callerName })
        }
      } else {
        this.errorMsg = 'Please write your message and subject before trying to email your message!'
      }
    }
  },
  mounted () {
    if (this.payload) {
      console.log("Parameters have been sent to me")
      this.recipient.push(this.payload)
      if (this.caller) {
        this.callerName = this.caller
      }
    }
    console.log(this.recipient)
    console.log(this.callerName)
  }
} 
</script>
<style>
</style>
