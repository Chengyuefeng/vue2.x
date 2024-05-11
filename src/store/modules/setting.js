export default {
  namespaced: true,
  state: () => ({
    mobileFlag: false,
    menuShowFlag: false,
    menuSearchFlag: false
  }),
  mutations: {
    setMobile(state, flag) {
      state.mobileFlag = flag
    },
    setMenuShow(state) {
      state.menuShowFlag = !state.menuShowFlag
    },
    setMenuSearch(state, flag) {
      state.menuSearchFlag = flag
    }
  }
}