<template>
  <div>
    <h1>Articles</h1>
    <div class="archive">
      <article class="article" v-for="article in articles"
       :key="article.id">
       <span class="intro">{{ article.intro }}</span>
       <br>
       <span class="instant">Updated at {{ article.updatedAt }}</span>
       <br>
       {{ article.content }}
       </article>
    </div>    
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      timer: null,
      userId: this.$store.getters.getUserId
    }
  },
  methods: {
    async getArticles () {
      let payload = {
        query: `query {
          getArticles (isActive: 1) {
            id
            intro
            content
            updatedAt
          }
        }`
      }

      try{
        let result = await InformationService.queryInfo(payload)
        console.log(result)
        this.articles = result.data.data.getArticles
      } catch (err) {
        console.log(err)
      }
    },
    cancelAutoUpdate () {
      clearInterval(this.timer)
    },
    checkForRefresh () {
      console.log(this.$store.getters.getRefresh('articles'))
      if (this.$store.getters.getRefresh('articles')) {
        this.getArticles()
        this.$store.commit('clearRefresh', { type: 'articles' })
      } 
    }
  },
  created () {
    this.getArticles()
    this.timer = setInterval(this.checkForRefresh, 10000)
  },
  beforeUnmount () {
    this.cancelAutoUpdate()
  }
}
</script>
<style>
.archive {
  display: flex;
  flex-direction: column;
}

@media (min-width: 321px) {
  .archive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 1em;
    grid-auto-flow: dense;
  }

  .article: {
    grid-column: 2/-2;
  }
}

.intro {
  font-size: 1.25em;
  font-weight: bold;
}
.instant {
  font-size: .75em;
  font-style: italic;
}
</style>

