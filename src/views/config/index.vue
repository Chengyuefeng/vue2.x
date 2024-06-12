<template>
  <div class="config-page" ref="mountRef">

  </div>
</template>

<script>
import { threeScene } from './modules/church'

export default {
  name: 'ConfigView',
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      threeScene(this.$refs.mountRef)
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
