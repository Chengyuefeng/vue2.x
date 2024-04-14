export default {
  namespaced: true,
  state: () => ({
    mobileFlag: false
  }),
  mutations: {
    setMobile(state, flag) {
      state.mobileFlag = flag
    }
  }
}