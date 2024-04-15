<template>
  <div class="layout-header">
    <div class="menu-icon" @click="setMenuShow">
      <i class="iconfont icon-menu"></i>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LayoutHeader',
  methods: {
    ...mapMutations('setting', ['setMenuShow'])
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>