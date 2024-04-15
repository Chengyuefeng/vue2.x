<template>
  <div>
    <el-input v-model="homeMsg"></el-input>
  </div>
</template>

<script>
import appApi from '@/api/app'
import EChartsLoadingMixin from '@/mixin/EChartsLoadingMixin'

export default {
  name: 'HomeView',
  data() {
    return {
      homeMsg: ''
    }
  },
  mixins: [EChartsLoadingMixin],
  mounted() {
    
  },
  activated() {
    this.summaryData()
  },
  methods: {
    async summaryData() {
      this.loadingShow()
      const { data } = await appApi.summaryData({ shopCode: '1521' })
      // console.log(data)
      this.loadingHide()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>