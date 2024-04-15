<template>
  <!-- <el-menu @select="menuSelect">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航</span>
      </template>
      <el-menu-item index="/home">home</el-menu-item>
      <el-menu-item index="/config">config</el-menu-item>
    </el-submenu>
  </el-menu> -->
  <div class="layout-menu"></div>
</template>

<script>
export default {
  name: 'LayoutMenu',
  methods: {
    menuSelect(index) {
      if (index !== this.$route.path) {
        this.$router.push(index)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
