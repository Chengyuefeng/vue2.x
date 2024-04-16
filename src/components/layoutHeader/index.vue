<template>
  <div class="layout-header">
    <div 
      :class="{ 'icon-item': true, 'icon-item-selected': menuShowFlag }" 
      @click="setMenuShow"
    >
      <i class="iconfont icon-menu"></i>
    </div>
    <div 
      :class="{ 'icon-item': true, 'search-selected': searchMenuFlag }" 
      @click.stop="searchMenu"
    >
      <i class="iconfont icon-search"></i>
      <input
        type="text"
        class="search-menu-input"
        ref="search-menu-input"
        v-model="searchMenuKeywords"
        @input="searchMenuInput"
      />
    </div>
    <div 
      class="icon-item"
      @click="downLoadFlag = true"
    >
      <i class="iconfont icon-download"></i>
    </div>
    <div 
      :class="{ 'menu-list': true, 'menu-list-selected': searchMenuFlag }"
      @click.stop
    >
      <div 
        v-for="item in searchMenuList" 
        :key="item.path" 
        @click="pathTo(item.path)
      ">
        {{ item.label }}
      </div>
    </div>
    <DownLoad :show.sync="downLoadFlag"></DownLoad>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import PinyinMatch from 'pinyin-match'
import DownLoad from './downLoad.vue'

export default {
  name: 'LayoutHeader',
  components: {
    DownLoad
  },
  data() {
    return {
      searchMenuFlag: false,
      searchMenuList: [],
      searchMenuKeywords: '',
      downLoadFlag: false
    }
  },
  computed: {
    ...mapState('setting', ['menuShowFlag']),
    ...mapState('menu', ['menuListData'])
  },
  mounted() {
    window.addEventListener('click', () => {
      this.$nextTick(() => {
        this.searchMenuKeywords = ''
        this.searchMenuFlag = false
        this.$refs['search-menu-input'].blur()
      })
    })
  },
  methods: {
    ...mapMutations('setting', ['setMenuShow']),
    ...mapMutations('menu', ['setSelectedPath']),

    pathTo(path) {
      if (path !== this.$route.path) {
        this.$router.push(path)
        this.setSelectedPath(path)
      }
    },

    searchMenu() {
      this.searchMenuFlag = true
      if (!this.searchMenuList.length) {
        this.searchMenuList = this.menuListData
      }
      setTimeout(() => {
        this.$refs['search-menu-input'].focus()
      }, 300)
    },

    searchMenuInput() {
      const { searchMenuKeywords } = this
      this.searchMenuList = this.menuListData.filter((e) => e.label.indexOf(searchMenuKeywords) > -1 || PinyinMatch.match(e.label, searchMenuKeywords))
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
