<template>
  <div>
    <el-input v-model="homeMsg"></el-input>
  </div>
</template>

<script>
import appApi from '@/api/app'

export default {
  name: 'HomeView',
  data() {
    return {
      homeMsg: ''
    }
  },
  mounted() {
    this.summaryData()
  },
  activated() {
    
  },
  methods: {
    async summaryData() {
      const { data } = await appApi.summaryData({ shopCode: '1521' })
      // console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>