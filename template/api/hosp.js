import request from '../utils/request'

export default {
  // 查询医院列表
  getHospitalList(hospital) {
    return request({
      url: '/api/hosp/hospital/getHospitalList',
      method: 'post',
      data: hospital
    })
  },
  // 根据医院名称模糊查询
  getHospitalByHosname(hospital) {
    return request({
      url: '/api/hosp/hospital/getHospitalByHosname',
      method: 'post',
      data: hospital
    })
  },
  getHospitalByHoscode(hoscode) {
    return request({
      url: `/api/hosp/hospital/getHospitalByHoscode/${hoscode}`,
      method: 'get',
    })
  },
  getScheduleDetailByHoscode(hoscode) {
    return request({
      url: `/api/hosp/hospital/getScheduleDetailByHoscode/${hoscode}`,
      method: 'get',
    })
  }
}
