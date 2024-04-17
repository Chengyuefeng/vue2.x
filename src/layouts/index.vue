<template>
  <transition name="loader-login">
    <el-container class="app-container" v-if="hasLogged">
      <el-aside :style="{ width: menuShowFlag ? '210px' : '70px' }">
        <layout-menu></layout-menu>
      </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
    <LayoutLogin v-else @reloadAdmin="reloadAdmin"></LayoutLogin>
  </transition>
</template>

<script>
import LayoutMenu from '@/components/layoutMenu'
import LayoutHeader from '@/components/layoutHeader'
import LayoutLogin from '@/components/layoutLogin'
import { mapState } from 'vuex'
import storage from 'store'

export default {
  name: 'LayoutContainer',
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutLogin
  },
  data() {
    return {
      excludeKeys: [],
      hasLogged: false 
    }
  },
  computed: {
    ...mapState('setting', ['menuShowFlag'])
  },
  watch: {
    '$router.options.routes': function (val) {
      this.excludeKeys = []
      // this.loadCacheConfig(val)
    }
  },
  created() {
    // this.loadCacheConfig(this.$router?.options?.routes)
    if (storage.get('userInfo') && storage.get('userInfo').username) {
      this.hasLogged = true
    }
  },
  methods: {
    reloadAdmin() {
      this.hasLogged = true
    },

    // loadCacheConfig(routes, pCache = true) {
    //   routes.forEach((item) => {
    //     const cacheAble = item.meta?.page?.cacheAble ?? pCache ?? true
    //     if (!cacheAble) {
    //       this.excludeKeys.push(new RegExp(`${item.path}\\d+$`))
    //     }
    //     if (item.children) {
    //       this.loadCacheConfig(item.children, cacheAble)
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
