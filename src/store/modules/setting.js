export default {
  namespaced: true,
  state: () => ({
    mobileFlag: false,
    menuShowFlag: false
  }),
  mutations: {
    setMobile(state, flag) {
      state.mobileFlag = flag
    },
    setMenuShow(state) {
      state.menuShowFlag = !state.menuShowFlag
    }
  }
}