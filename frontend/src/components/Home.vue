<template>
  <div class='container'>
    <div class="carousel">
      <img src="/images/skyline.jpg" />
    </div>
    <div class='body'>
    <Article />
      </div>
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
div { 
  margin: 0;
  padding: 0;
}

@media (max-width: 320px) {
  .carousel {
    width: 100%;
    max-height: 10vw;
  }
}

@media (min-width: 560px) {
  .carousel {
    width: 100%;
    height: 30vw;
    border: 1px #000000 solid;
  }

  .carousel img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid #000;
  }
}
</style>

