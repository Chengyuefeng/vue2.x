export default {
  namespaced: true,
  state: () => ({
    showFlag: false
  }),
  mutations: {
    loadingShow(state) {
      state.showFlag = true
    },
    loadingHide(state) {
      state.showFlag = false
    }
  }
}