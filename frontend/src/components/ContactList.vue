<template>
  <div class="container">
    <h2>Contacts</h2>
    <div class="row filter-div">
      Contacts Filter
      <span class="status">
        <label>
          <input type="radio" name="contact_filter" value="all" 
            @change="filterContacts()"
            v-model="contacts_view" />
            All ({{ contactList.length }})
        </label>
        <label>
          <input type="radio" name="contact_filter" value="messaged"
            @change="filterContacts()"
            v-model="contacts_view" />
            Messaged ({{ messagedCount }})
        </label>
        <label>
          <input type="radio" name="contact_filter" value="unmessaged" 
            @change="filterContacts()"
            v-model="contacts_view" />
            Unmessaged ({{ unmessagedCount }})
        </label>
      </span>
    </div>
    <div>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>About Me</th>
      </tr>
      <tr v-for="contact in contacts_display"
          :key="contact.id">
        <td width="10%">{{ contact.name }}</td>
        <td width="20%">
          <router-link :to="{ name: 'CreateMessage', params: { 'payload': contact.email, 'caller': 'ContactList' } }">
            {{ contact.email }}
          </router-link>
        </td>
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
      contactList: [],
      contacts_display: [],
      contacts_view: 'unmessaged',
    }
  },
  computed: {
    messagedCount () {
      return this.contactList.filter((contact) => { return contact.hasMessaged }).length
    },
    unmessagedCount () {
      return this.contactList.filter((contact) => { return !contact.hasMessaged }).length
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
            hasMessaged
          }
        }`
      }

      try{
        let result = await InformationService.queryInfo(payload)
        this.contactList = result.data.data.contacts
        this.filterContacts()
      } catch (err) {
        console.log(err)
      }
    },
    filterContacts () {
      switch (this.contacts_view) {
        case 'all': 
          this.contacts_display = this.contactList
          break
        case 'messaged': 
          this.contacts_display = this.contactList.filter((contact) => { return contact.hasMessaged })
          break
        case 'unmessaged':
          this.contacts_display = this.contactList.filter((contact) => { return !contact.hasMessaged })
          break
      }
    },
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
