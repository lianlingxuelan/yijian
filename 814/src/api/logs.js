import http from '../plugin/axios/http'

export function getCode (queryUrl) {
  return http.get(`/config/logs${queryUrl}`)
}
