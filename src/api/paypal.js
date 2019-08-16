import http from '../plugin/axios/http'

export function getpay (queryUrl) {
  return http.get(`/config/paypal${queryUrl}`)
}
export function editpay (data) {
  return http.post(`/config/paypal/edit`, data)
}
export function outpay (queryUrl) {
  return http.get(`/config/paypal/out${queryUrl}`)
}
export function inpay (queryUrl) {
  return http.get(`/config/paypal/in${queryUrl}`)
}
