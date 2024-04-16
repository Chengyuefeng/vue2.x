import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('EChartsLoading', ['loadingShow', 'loadingHide'])
  }
}