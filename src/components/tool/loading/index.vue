<template>
  <transition name="loader">
    <div id="ECharts" v-if="showFlag">
      <div class="loader"></div>
    </div>
  </transition>
</template>

<script>
import * as ECharts from 'echarts'
import { mapState } from 'vuex'
// import { debounce } from '@/utils/throttle'

// 创建EChart
let EChart = null

export default {
  name: 'ConfigView',
  data() {
    return {
      option: {
        graphic: {
          elements: [
            {
              type: 'group',
              left: 'center',
              top: 'center',
              children: new Array(7).fill(0).map((val, i) => ({
                type: 'rect',
                x: i * 10,
                shape: {
                  x: 0,
                  y: -20,
                  width: 5,
                  height: 40
                },
                style: {
                  fill: '#fff'
                },
                keyframeAnimation: {
                  duration: 1500,
                  delay: i * 100,
                  loop: true,
                  keyframes: [
                    {
                      percent: 0.5,
                      scaleY: 0.1,
                      easing: 'exponentialOut'
                    },
                    {
                      percent: 1,
                      scaleY: 1,
                      easing: 'exponentialOut'
                    }
                  ]
                }
              }))
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapState('EChartsLoading', ['showFlag'])
  },
  mounted() {
    // this.EChartsInit()
    // window.addEventListener('resize', debounce(() => {
    //   EChart.resize()
    // }, 100))
  },
  methods: {
    EChartsInit() {
      const { option } = this

      let dom = document.getElementById('ECharts')
      EChart = ECharts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      })
      
      if (option && typeof option === 'object') {
        EChart.setOption(option)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>