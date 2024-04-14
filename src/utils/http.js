import axios from 'axios'
import { Message } from 'element-ui'
import storage from 'store'

const setSplicing = function() {
  const APP_ID = process.env.NODE_ENV === 'production' ? '121773211616' : '121968969237'
  const TIMESTAMP = new Date().getTime().toString()
  return [
    `APP_ID=${APP_ID}`,
    `TIMESTAMP=${TIMESTAMP}`
  ].join('&')
}

const ajax = axios.create({
  timeout: 10000,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
  },
  dataType: 'json',
  withCredentials: true,
})

const baseUrl = process.env.VUE_APP_API_BASE_URL

ajax.interceptors.request.use(
  (config) => {
    const Authorization = storage.get('Authorization') || ''
    config.headers['Authorization'] = Authorization

    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
      const postData = JSON.parse(config.data)
      config.data = JSON.stringify(postData)
    }

    if (config.headers['Content-Type'] === 'multipart/form-data') {
      const formData = new FormData()
      for (const key in config.data) {
        formData.append(key, config.data[key])
      }
      config.data = formData
    }

    config.url = baseUrl + config.url + (config.url.indexOf('?') > -1 ? '&' : '?') + setSplicing()

    return Promise.resolve(config)
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

ajax.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
  (error) => {
    Message.error('网络超时（Net Error: 500）')
    return Promise.reject(new Error('网络超时' + error))
  }
)

export default ajax