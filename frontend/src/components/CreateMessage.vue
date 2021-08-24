<template>
  <div class="container">
    <inputcomponent></inputcomponent>
  </div>
</template>
<script>
import InputComponent from '@/components/InputComponent'

export default {
  name: 'CreateMessage',
  props: ['payload', 'caller'],
  components: {
    inputcomponent: InputComponent
  }
  
} 
</script>
<style>
</style>
