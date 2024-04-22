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
      ></div>
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
let ctx = null

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
  },
  methods: {
    keyMousedown(key) {
      this.keySelected = key
      setTimeout(() => {
        this.keySelected = null
      }, 100)
    },

    pataTapKey(e) {
      console.log(e)
    },

    canvasInit() {
      canvas = document.getElementById("pata-tap")
      if (canvas.getContext) {
        ctx = canvas.getContext("2d")

        // drawing code here
      } else {
        // canvas-unsupported code here
      }
    },

    drawStar(ctx, r) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(r, 0);
      for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 == 0) {
          ctx.lineTo((r / 0.525731) * 0.200811, 0);
        } else {
          ctx.lineTo(r, 0);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    draw() {
      ctx.clearRect(0, 0, this.pataTapWidth, this.pataTapHeight);
      ctx.setLineDash([20, 4]);
      ctx.lineDashOffset = -this.offset;
      ctx.strokeRect(10, 10, 100, 100);
    },

    march() {
      this.offset ++;
      if (this.offset > 100) {
        this.offset = 0;
      }
      this.draw();
      setTimeout(this.march, 33);
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