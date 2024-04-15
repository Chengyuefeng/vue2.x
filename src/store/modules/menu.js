export default {
  namespaced: true,
  state: () => ({
    selectedPath: '/home',
    menuListData: [
      {
        icon: 'iconfont icon-home',
        label: '首页',
        path: '/home'
      },
      {
        icon: 'iconfont icon-icon_config',
        label: '基础设置',
        path: '/config'
      }
    ]
  }),
  mutations: {
    setSelectedPath(state, path) {
      state.selectedPath = path
    }
  }
}