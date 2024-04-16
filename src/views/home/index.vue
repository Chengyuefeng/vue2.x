<template>
  <div>
    <!-- <el-input v-model="homeMsg"></el-input> -->
  </div>
</template>

<script>
import appApi from '@/api/app'
import CLoadingMixin from '@/mixin/CLoadingMixin'

export default {
  name: 'HomeView',
  data() {
    return {
      homeMsg: ''
    }
  },
  mixins: [CLoadingMixin],
  activated() {
    this.summaryData()
  },
  methods: {
    async summaryData() {
      this.loadingShow()
      const { data } = await appApi.summaryData({ shopCode: '1521' })
      console.log(data)
      setTimeout(() => {
        this.loadingHide()
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>@/mixin/CLoadingMixin