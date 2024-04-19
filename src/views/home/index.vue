<template>
  <div class="home-page" ref="home-page">
    <canvas id="pata-tap" :width="pataTapWidth" :height="pataTapHeight">
      current stock price: $3.15 +0.15
    </canvas>
  </div>
</template>

<script>
import appApi from '@/api/app'
import CLoadingMixin from '@/mixin/CLoadingMixin'
import { mapState } from 'vuex'

// 创建canvas
let canvas = null
let ctx = null

export default {
  name: 'HomeView',
  data() {
    return {
      pataTapWidth: 0,
      pataTapHeight: 0
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
    if (this.$refs['home-page']) {
      this.pataTapWidth = this.$refs['home-page'].offsetWidth
      this.pataTapHeight = this.$refs['home-page'].offsetHeight
    }
    this.reCanvas = () => {
      this.pataTapWidth = this.$refs['home-page'].offsetWidth
      this.pataTapHeight = this.$refs['home-page'].offsetHeight
    }
    window.addEventListener('resize', this.reCanvas)
    this.$nextTick(() => {
      this.canvasInit()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reCanvas)
  },
  methods: {
    canvasInit() {
      canvas = document.getElementById("pata-tap")
      if (canvas.getContext) {
        ctx = canvas.getContext("2d")
        
        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);

        // drawing code here
      } else {
        // canvas-unsupported code here
      }
      
    },

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