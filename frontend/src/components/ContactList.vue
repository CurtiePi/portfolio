<template>
  <div class="container">
    <h2>Contacts</h2>
    <div>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>About Me</th>
      </tr>
      <tr v-for="contact in contactList"
          :key="contact.id">
        <td width="10%">{{ contact.name }}</td>
        <td width="20%">{{ contact.email }}</td>
        <td width="65%">{{ contact.cover }}</td>
      </tr>
    </div>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'ContactList',
  data () {
    return {
      contactList: []
    }
  },
  methods: {
    async getContacts () {
      let payload = {
        query: `query {
          contacts {
            id
            name
            email
            cover
          }
        }`
      }

      try{
        let result = await InformationService.queryInfo(payload)
        this.contactList = result.data.data.contacts
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getContacts()
  }
}
</script>
<style scoped>
td, th {
  padding: 5px;
}

tr:nth-child(even) {
    background-color: #eeeeee;
}

tr:nth-child(odd) {
    background-color: #cccccc;
}
</style>
