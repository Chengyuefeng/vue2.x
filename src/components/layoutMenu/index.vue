<template>
  <div :class="{ 'layout-menu': true, 'show': menuShowFlag }">
    <div
      :class="{ 'menu-item': true, 'selected': selectedPath === item.path }"
      v-for="item in menuListData"
      :key="item.path"
      @click="menuSelect(item.path)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'LayoutMenu',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState('menu', ['menuListData', 'selectedPath']),
    ...mapState('setting', ['menuShowFlag'])
  },
  mounted() {
    this.setSelectedPath(this.$route.path)
  },
  methods: {
    ...mapMutations('menu', ['setSelectedPath']),

    menuSelect(path) {
      if (path !== this.$route.path) {
        this.$router.push(path)
        this.setSelectedPath(path)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index';
</style>
