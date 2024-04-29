import storage from 'store'

export default {
  namespaced: true,
  state: () => ({
    avatarImagePath: '',
    userListData: [
      {
        username: 'xiaobai',
        password: 'xiaobai666',
        avatar: 'xiaobai.jpeg'
      },
      {
        username: 'xiaohua',
        password: 'xiaohua666',
        avatar: 'xiaohua.jpeg'
      }
    ],
    userInfo: storage.get('userInfo')
  }),
  mutations: {
    setAvatarImagePath(state, path) {
      state.avatarImagePath = path
    }
  },
  actions: {
    // 获取用户头像
    findAvatarImage({ dispatch, commit, state }, username) {
      return new Promise((resolve, reject) => {
        const item = state.userListData.find(e => e.username === username)
        if (item) {
          commit('setAvatarImagePath', item.avatar)
          resolve(item.username)
        } else {
          commit('setAvatarImagePath', '')
        }
      })
    },

    // 登录系统
    storeSubmitAdmin({ dispatch, commit, state }, userInfo) {
      return new Promise((resolve, reject) => {
        const item = state.userListData.find(e => e.username === userInfo.username)
        if (item && item.password === userInfo.password) {
          storage.set('userInfo', item)
          resolve(true)
        } else {
          reject('账号或密码错误')
        }
      })
    },

    // 退出登录
    stareLogout({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        commit('setAvatarImagePath', '')
        storage.clearAll()
        resolve()
      })
    }
  }
}