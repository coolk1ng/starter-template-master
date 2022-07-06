import request from '../utils/request'

export default {
  // 登录
  login(userInfo) {
    return request({
      url: '/api/user/login',
      method: 'post',
      data: userInfo
    })
  },
}
