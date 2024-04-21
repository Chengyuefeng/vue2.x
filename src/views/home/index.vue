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
        let lineCap = ["butt", "round", "square"]


        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 6; j++) {
            ctx.fillStyle =
              "rgba(" +
              Math.floor(255 - 42.5 * i) +
              "," +
              Math.floor(255 - 42.5 * j) +
              ", 50)";
            ctx.fillRect(j * 25 + 20, i * 25 + 20, 25, 25);
          }
        }

        ctx.fillStyle = "#FFF";
        // 设置透明度值
        ctx.globalAlpha = 0.1;

        // 画半透明圆
        for (var k = 0; k < 9; k++) {
          ctx.beginPath();
          ctx.arc(95, 275, 10 * k, 0, Math.PI * 2, true);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        for (var l = 0; l < 11; l++) {
          ctx.lineWidth = 1 + l;
          ctx.beginPath();
          ctx.moveTo(20 + l * 16, 400);
          ctx.lineTo(20 + l * 16, 540);
          ctx.stroke();
        }
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#09f";
        ctx.beginPath();
        ctx.moveTo(210, 20);
        ctx.lineTo(340, 20);
        ctx.moveTo(210, 170);
        ctx.lineTo(340, 170);
        ctx.stroke();
        ctx.strokeStyle = "black";
        for (var a = 0; a < lineCap.length; a++) {
          ctx.lineWidth = 15;
          ctx.lineCap = lineCap[a];
          ctx.beginPath();
          ctx.moveTo(225 + a * 50, 20);
          ctx.lineTo(225 + a * 50, 170);
          ctx.stroke();
        }

        ctx.lineWidth = 1

        var lineargradient = ctx.createLinearGradient(450, 20, 450, 120);
        lineargradient.addColorStop(0, "white");
        lineargradient.addColorStop(.5, "rgba(0, 0, 0, .1)");
        lineargradient.addColorStop(1, "black");
        ctx.fillStyle = lineargradient
        ctx.fillRect(400, 20, 100, 100);

        var img = new Image();
        img.src = require('@/assets/images/xiaohua.jpeg')
        img.onload = function () {
          // 创建图案
          var ptrn = ctx.createPattern(img, "no-repeat");
          ctx.fillStyle = ptrn;
          ctx.fillRect(0, 0, 750, 850);
        };
        // this.march()
        // drawing code here
      } else {
        // canvas-unsupported code here
      }
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