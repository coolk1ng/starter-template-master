import request from '../utils/request'

export default {
  getLoginParam() {
    return request({
      url: `/api/ucenter/wx/getLoginParam`,
      method: `get`
    })
  }
}
