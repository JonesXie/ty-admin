const getters = {
  language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  userUrl: state => state.user.userUrl,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  refreshTag: state => state.tagsView.refreshTag,
  addrOptions: state => state.addr.addrOptions,
  proClassOptions: state => state.proClass.proClassOptions,
  menuApiRole: state => state.api.menuApiRole,
  roleMenu: state => state.api.roleMenu
}
export default getters
