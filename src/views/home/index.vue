<template>
  <div class="home-page" ref="home-page">
    <canvas id="pata-tap" :width="pataTapWidth" :height="pataTapHeight">
      current stock price: $3.15 +0.15
    </canvas>
    <div class="pata-tap-btn">
      <div
        v-for="(item, key) in keys"
        :key="key"
        :class="{ 'btn-item': true, 'key-selected': keySelected === key }"
        @mousedown="keyMousedown(key)"
      >
        <audio v-if="item.audio" :src="item.audio" :ref="'audio' + key"></audio>
        <span>{{ key.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import appApi from '@/api/app'
import CLoadingMixin from '@/mixin/CLoadingMixin'
import { mapState } from 'vuex'
import keys from './keys'

// 创建canvas
let canvas = null

export default {
  name: 'HomeView',
  data() {
    return {
      pataTapWidth: 0,
      pataTapHeight: 0,
      keys: keys(this),
      keySelected: null,
      offset: 0,
      ctrlOrCmdPressed: false
    }
  },
  computed: {
    ...mapState('setting', ['mobileFlag', 'menuSearchFlag'])
  },
  mixins: [CLoadingMixin],
  activated() {
    // this.summaryData()
    this.$message.info('请输入键盘字母或点击屏幕上的方格')
  },
  mounted() {
    // 创建canvas
    this.$nextTick(() => {
      // 监听画布盒子尺寸变化
      this.resizeObserver().observe(this.$refs['home-page'])
      // 画布初始化
      this.canvasInit()
    })
    // 绑定键盘事件
    window.addEventListener('keydown', this.pataTapKey)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    this.resizeObserver().disconnect()
    window.removeEventListener('keydown', this.pataTapKey)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    resizeObserver() {
      return new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect
          this.reloadCanvas(width, height)
        }
      })
    },

    // 监听窗口尺寸变化重载canvas
    reloadCanvas(width, height) {
      this.pataTapWidth = width
      this.pataTapHeight = height
    },

    handleKeyUp(e) {
      if (e.key === 'Control' || e.key === 'Meta') {
        this.ctrlOrCmdPressed = false
      }
    },

    keyMousedown(key) {
      this.keySelected = key
      this.pataTapKey({ key })

      if (this.keys[key] && this.keys[key].audio) {
        const audio = this.$refs['audio' + key][0]
        audio.currentTime = 0
        audio.play()
      }
      setTimeout(() => {
        this.keySelected = null
      }, 100)
    },

    pataTapKey(e) {
      e = { ...e, key: e.key.toLowerCase() }
      if (this.ctrlOrCmdPressed || this.menuSearchFlag) {
        // 如果 Ctrl 或 Command 键被按下，直接返回，不继续执行
        return
      }

      if (e.key === 'Control' || e.key === 'Meta') {
        this.ctrlOrCmdPressed = true
      }
      this.keySelected = e.key
      if (this.keys[e.key] && this.keys[e.key].canvasDraw) {
        this.keys[e.key].canvasDraw(canvas)
      }

      if (this.keys[e.key] && this.keys[e.key].audio) {
        const audio = this.$refs['audio' + e.key][0]
        audio.currentTime = 0
        audio.play()
      }
      setTimeout(() => {
        this.keySelected = null
      }, 100)
    },

    canvasInit() {
      canvas = document.getElementById('pata-tap').getContext('2d')
    },

    async summaryData() {
      this.loadingShow()
      const { data } = await appApi.summaryData({ shopCode: '1521' })
      setTimeout(() => {
        this.loadingHide()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
