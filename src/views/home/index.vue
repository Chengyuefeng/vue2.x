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
      offset: 0
    }
  },
  computed: {
    ...mapState('setting', ['mobileFlag'])
  },
  mixins: [CLoadingMixin],
  activated() {
    // this.summaryData()
  },
  mounted() {
    // 初始化canvas尺寸
    if (this.$refs['home-page']) {
      this.pataTapWidth = this.$refs['home-page'].offsetWidth
      this.pataTapHeight = this.$refs['home-page'].offsetHeight
    }

    // 监听窗口尺寸变化重载canvas
    this.reCanvas = () => {
      this.pataTapWidth = this.$refs['home-page'].offsetWidth
      this.pataTapHeight = this.$refs['home-page'].offsetHeight
    }
    window.addEventListener('resize', this.reCanvas)

    // 创建canvas
    this.$nextTick(() => {
      this.canvasInit()
    })

    // 绑定键盘事件
    window.addEventListener('keydown', this.pataTapKey)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reCanvas)
    window.removeEventListener('keydown', this.pataTapKey)
  },
  methods: {
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
      if (this.keys[e.key] && this.keys[e.key].canvasDraw) {
        this.keys[e.key].canvasDraw(canvas)
      }

      if (this.keys[e.key] && this.keys[e.key].audio) {
        const audio = this.$refs['audio' + e.key][0]
        audio.currentTime = 0
        audio.play()
      }
    },

    canvasInit() {
      canvas = document.getElementById('pata-tap').getContext('2d')
    }

    // async summaryData() {
    //   this.loadingShow()
    //   const { data } = await appApi.summaryData({ shopCode: '1521' })
    //   console.log(data)
    //   setTimeout(() => {
    //     this.loadingHide()
    //   }, 1000)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
