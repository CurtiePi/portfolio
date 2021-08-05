<template>
  <div>
    <form class="auth-form">
      <div class="form-control">
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" name="email" v-model.trim="email"/>
      </div>
      <div class="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" v-model.trim="password" />
      </div>
      <div class="form-actions">
        <button type="button" @click="getToken()">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      token: null
    }
  },
  methods: {
    async getToken () {
      let payload = {
        query: `query {
          login(email: "${this.email}", password: "${this.password}") {
            userId
            token
            tokenExpiry
          }
        }`
      }

      try{
        let result = await InformationService.queryInfo(payload)
        let token = result.data.data.login.token
        console.log(token)
        InformationService.setAuthorization(token)
        this.$router.replace({ name: 'Home' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
.auth-form {
  width: 35rem;
  max-width: 80%;
  margin: 5rem auto;
}

.form-control label,
.form-contral input {
  width: 100%;
  display: block;
}

.form-control label {
  margin-bottom: 0.5rem;
}

.form-control {
  margin-bottom: 1rem;
}

.form-actions button {
  background: #01d1d1;
  font: inherit;
  border: 1px solid #01d1d1;
  border-radius: 3px;
  padding: 0.2rem 1rem;
  margin-right: 1rem;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.26);
  color: white;
  cursor: pointer;
}

.form-actions button:hover,
.form-actions button:active {
  background: #01a7a7;
  border-color: #01a7a7;
}
</style>
