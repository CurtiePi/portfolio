<template>
  <nav class="main-nav">
    <input type="checkbox" id="main-nav-checkbox" class="main-nav-checkbox"/>
    <label for="main-nav-checkbox" class="main-nav-toggle">
      <icon-base icon-name="menu" class="menu-icon"><icon-menu /></icon-base>
      <icon-base icon-name="close" class="close-icon"><icon-close /></icon-base>
    </label>
    <ul class="main-nav-menu">
      <li>Portfolio Icon</li>
      <li
        v-for="(link, index) in navLinks"
        :key="index"
      >
        <router-link
          :to="{ name: link.name }"
        >
          {{ link.text }}
        </router-link>
      </li>
      <li @click="logout" v-if="isAuth">
        Logout
      </li>
    </ul>
  </nav>
</template>
<script>
import getLinks from '@/components/navigation/index'
import IconBase from './IconBase.vue'
import IconMenu from './icons/IconMenu.vue'
import IconClose from './icons/IconClose.vue'


export default {
  components: {
    IconBase,
    IconMenu,
    IconClose
  },
  computed: {
    navLinks: function () {
      let type = (this.$store.getters.isAuth) ? 'admin' : 'guest'
      return getLinks(type)
    },
    isAuth: function () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    logout () {
      this.$store.commit('clearAuth')
      this.$router.replace({ name: 'Home' })
    }
  }
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
  .main-nav {
    border-bottom: 1px solid $clr-gray200;
  }

  .main-nav-toggle {
    position:absolute;
    cursor: pointer;
    margin: 0rem 1rem;
    right: 0;
  }

  .main-nav-toggle icon-base {
    width: 1.5rem;
    fill: $clr-gray600;
  }

  .close-icon {
    display: none;
  }

  .menu-icon {
    margin-top: 0.2rem;
  }

  .main-nav-checkbox {
    display: none;
  }

  .main-nav-menu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    margin: 1rem;
  }

  .main-nav-menu li {
    list-style: none;
    display: none;
  }

  .main-nav-menu li:first-child {
    margin-right: auto;
    display: block;
  }

  .main-nav-menu a {
     text-decoration: none;
     color: inherit;
     font-size: 1.2rem;
  }

  #main-nav-checkbox:checked ~ ul.main-nav-menu  li {
    display: block;
  }

  #main-nav-checkbox:checked ~ label.main-nav-toggle .close-icon {
    display: block; 
  }

  #main-nav-checkbox:checked ~ label.main-nav-toggle .menu-icon {
    display: none; 
  }

}


@media (min-width: 560px) {
  .main-nav {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.5rem;
    background: #01d1d1;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    margin: 0;
  }

  .main-nav-toggle {
    display: none;
  }

  .main-nav-checkbox {
    display: none;
  }

  .main-nav-menu  {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
    margin: 0;
  }

  .main-nav-menu li {
    display: flex;
    flex-direction: row;
  }

  .main-nav-menu li:first-child {
    margin-right: auto;
    display: block;
  }

  .main-nav-menu a {
     text-decoration: none;
     color: #000;
  }

  .main-nav-menu a:hover,
  .main-nav-menu a:active {
    color: #f8e264;
  }
}
</style>
