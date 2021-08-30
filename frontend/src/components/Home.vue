<template>
  <div>
    <img src="/images/skyline.jpg" />
    <Article />
  </div>
</template>
<script>
import Article from '@/components/Article'

export default {
  name: 'Home',
  components: {
    Article
  },
  data () {
    return {
    }
  },
  methods: {
  },
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

@media (min-width: 320px) {
  div { 
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

@media (min-width: 560px) {
  div { 
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>

