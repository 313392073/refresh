import http from 'http'
import https from 'https'
export default {
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 请求超时的限制
  timeout: 35000,
  // 跨域是否带Token 足彩报错
  withCredentials: false,
  responseType: 'json',
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
}