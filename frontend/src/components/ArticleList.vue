<template>
  <div class='container'>
    <router-link :to="{ name: 'CreateArticle', params: { 'caller': 'ArticleList', 'label': 'Intro' } }">
      Create Article
    </router-link>
    <div>
      <tr>
        <th>Intro</th>
        <th>Last Update</th>
        <th>Active</th>
      </tr>
      <tr v-for="article in articles"
          :key="article.id">
        <td width="50%">
          <router-link :to="{ name: 'EditArticle',
                              params: { 'caller': 'ArticleList',
                                        'id': article.id,
                                        'intro': article.intro,
                                        'content': article.content  } }">
            {{ article.intro }}
          </router-link>
        </td>
        <td width="30%">
            {{ article.updatedAt }}
        </td>
        <td width="20%">
          <input :id="'checkbox' + article.id" type="checkbox" :checked=article.isActive @change="setStatus">
          <label :for="'checkbox' + article.id" data-text-true="Yes" data-text-false="No"><i></i></label>
        </td>
      </tr>
    </div>
  </div>
</template>
<script>
import InformationService from '@/services/InformationService'

export default {
  name: 'ArticleList',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    async getArticles () {
      let payload = {
        query: `query {
          getArticles {
            id
            intro
            content
            updatedAt
            isActive
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
    async setStatus (evt) {
      var articleId = parseInt(evt.target.id.replace('checkbox', ''))
      var activeStatus = (evt.target.checked) ? 1 : 0
      let payload = {
        query: `mutation {
          updateArticleActivationStatus (id: ${articleId}, isActive: ${activeStatus}) {
            id
          }
        }`
      }
 
      try {
        let result = await InformationService.mutateInfo(payload)
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getArticles()
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
