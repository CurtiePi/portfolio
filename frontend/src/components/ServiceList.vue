<template>
  <div class='container'>
    <router-link :to="{ name: 'CreateService' }">
      Create Service
    </router-link>
    <div>
      <tr>
        <th>Name</th>
        <th>Desciption</th>
      </tr>
      <tr v-for="service in services"
          :key="service.id">
        <td width="30%">
          <router-link :to="{ name: 'ServiceDetail',
                              params: { 'caller': 'ServiceList', 'payload': JSON.stringify(service)  } }">
            {{ service.name }}
          </router-link>
        </td>
        <td width="70%">
            {{ service.description }}
        </td>
      </tr>
    </div>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'ServiceList',
  data () {
    return {
      services: []
    }
  },
  methods: {
    async getServices () {
      let payload = {
        query: `query {
          getServices {
            id
            name
            description
            items {
              id
              detail
            }
          }
        }`
      }

      try {
        let result = await InformationService.queryInfo(payload)
        console.log(result)
        this.services = result.data.data.getServices
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getServices()
  }
}
</script>
<style scoped>
input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label {
  display: inline-block;
  background-color: #DB574D;
  color: white;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  position: relative;
  text-transform: uppercase;
  width: 80px;
}

input[type=checkbox] + label,
input[type=checkbox] + label i {
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}

input[type=checkbox]:checked + label {
  background-color: #67B04F;
}

input[type=checkbox] + label:before,
input[type=checkbox] + label:after,
input[type=checkbox] + label i {
  width: 50%;
  display: inline-block;
  height: 100%;
  text-align: center;
}

input[type=checkbox] + label:before {
  content: attr(data-text-true);
}

input[type=checkbox] + label:after {
  content: attr(data-text-false);
}

input[type=checkbox] + label i {
  top: 10%;
  background-color: white;
  height: 80%;
  left: 5%;
  position: absolute;
  width: 45%;
}

input[type=checkbox]:checked + label i {
  left: 50%;
}
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
