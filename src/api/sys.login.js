import http from '../plugin/axios/http'

export function AccountLogin (data) {
  return http.post('login', data)
}
