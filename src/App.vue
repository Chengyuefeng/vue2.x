<template>
  <div id="app">
    <router-view/>
    <EChartsLoading></EChartsLoading>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { debounce } from '@/utils/throttle'

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.setMobile(window.innerWidth <= 500 ? true : false)
    window.addEventListener('resize', debounce(() => {
      this.setMobile(window.innerWidth <= 500 ? true : false)
    }, 100))
  },
  methods: {
    ...mapMutations('setting', ['setMobile'])
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
