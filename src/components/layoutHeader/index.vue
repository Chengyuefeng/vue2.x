<template>
  <div class="layout-header">
    <div class="header-tool">
      <div :class="{ 'icon-item': true, 'icon-item-selected': menuShowFlag }" @click="setMenuShow">
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="icon-item" @click="downLoadFlag = true">
        <i class="iconfont icon-download"></i>
      </div>
      <div :class="{ 'icon-item': true }" @click.stop="searchMenu">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="user-info" v-if="userInfo">
      <img :src="require('@/assets/images/' + userInfo.avatar)" alt="" />
      <span>{{ userInfo.username }}</span>
    </div>
    <div :class="{ 'menu-list': true, 'menu-list-selected': searchMenuFlag }" @click.stop>
      <div class="search-menu">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          ref="search-menu-input"
          v-model="searchMenuKeywords"
          @input.stop="searchMenuInput"
          @focus="setMenuSearch(true)"
          @blur="setMenuSearch(false)"
        />
      </div>
      <div class="item" v-for="item in searchMenuList" :key="item.path" @click="pathTo(item.path)">
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
import storage from 'store'

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
      downLoadFlag: false,
      userInfo: null
    }
  },
  computed: {
    ...mapState('setting', ['menuShowFlag']),
    ...mapState('menu', ['menuListData'])
  },
  created() {
    this.userInfo = storage.get('userInfo')
  },
  mounted() {
    window.addEventListener('click', () => {
      this.$nextTick(() => {
        this.searchMenuKeywords = ''
        this.searchMenuFlag = false
        if (this.$refs['search-menu-input']) {
          this.$refs['search-menu-input'].blur()
        }
      })
    })
  },
  methods: {
    ...mapMutations('setting', ['setMenuShow', 'setMenuSearch']),
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
      this.searchMenuList = this.menuListData.filter(
        (e) =>
          e.label.indexOf(searchMenuKeywords) > -1 || PinyinMatch.match(e.label, searchMenuKeywords)
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
