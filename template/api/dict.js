import request from '../utils/request'

export default {
  // 查询所有子节点数据
  getByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/getByDictCode/${dictCode}`,
      method: 'get',
    })
  },
  // 根据医院名称模糊查询
  getHospitaByHosname(id) {
    return request({
      url: `/admin/cmn/dict/getChildrenData/${id}`,
      method: 'get',
    })
  }
}
