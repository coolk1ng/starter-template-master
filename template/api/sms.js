import request from '../utils/request'

export default {
  sendCode(phone) {
    return request({
      url: `/api/sms/send/${phone}`,
      method: 'get',
    })
  },
}
