import ajax from '@/utils/http'

export default {
  summaryData(data) {
    return ajax({
      url: '/naturade-workbench/admin/index/summaryData',
      method: 'post',
      data
    })
  }
}
