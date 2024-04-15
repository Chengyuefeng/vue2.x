<template>
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-container>
      <el-aside>
        <layout-menu></layout-menu>
      </el-aside>
      <el-main>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutMenu from '@/components/layoutMenu'
import LayoutHeader from '@/components/layoutHeader'

export default {
  name: 'LayoutContainer',
  components: {
    LayoutMenu,
    LayoutHeader
  },
  data() {
    return {
      excludeKeys: []
    }
  },
  watch: {
    '$router.options.routes': function(val) {
      this.excludeKeys = []
      this.loadCacheConfig(val)
    },
  },
  created() {
    this.loadCacheConfig(this.$router?.options?.routes)
  },
  methods: {
    loadCacheConfig(routes, pCache = true) {
      routes.forEach(item => {
        const cacheAble = item.meta?.page?.cacheAble ?? pCache ?? true
        if (!cacheAble) {
          this.excludeKeys.push(new RegExp(`${item.path}\\d+$`))
        }
        if (item.children) {
          this.loadCacheConfig(item.children, cacheAble)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>