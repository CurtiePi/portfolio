Vue.config.ignoredElements = [/^ion-/]

<template>
  <div id="app">
    <HeaderNav />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from '@/components/Navigation'
import Subscriber from './sub_client'

export default {
  name: 'App',
  components: {
    HeaderNav
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    const subscriber = new Subscriber(window.navigator)
    subscriber.subscribe()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
