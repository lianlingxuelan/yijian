import http from '../plugin/axios/http'

export function getCode (queryUrl) {
  return http.get(`my/code${queryUrl}`)
}

export function editCode (data) {
  return http.get(`/my/code/edit`, data)
}

export function outCode (queryUrl) {
  return http.get(`/my/code/out${queryUrl}`)
}

export function inCode (queryUrl) {
  return http.get(`/my/code/in${queryUrl}`)
}

export function checkCodeName (queryUrl) {
  return http.get(`/my/code/check_codename${queryUrl}`)
}
export function getDomain (queryUrl) {
  return http.get(`/my/domain${queryUrl}`)
}

export function editDomain (data) {
  return http.post(`/my/domain/edit`, data)
}
export function addDomain (data) {
  return http.post(`/my/domain/add`, data)
}

export function outDomain (queryUrl) {
  return http.get(`/my/domain/out${queryUrl}`)
}

export function inDomain (queryUrl) {
  return http.get(`/my/domain/in${queryUrl}`)
}
export function checkDomainName (queryUrl) {
  return http.get(`/my/code/check_domainname${queryUrl}`)
}
export function getKF (queryUrl) {
  return http.get(`/my/kf${queryUrl}`)
}
export function editKF (data) {
  return http.post(`/my/kf/edit`, data)
}
export function addKF (data) {
  return http.post(`/my/kf/add`, data)
}
export function outKF (queryUrl) {
  return http.get(`/my/kf/out${queryUrl}`)
}
export function inKF (queryUrl) {
  return http.get(`/my/kf/in${queryUrl}`)
}
export function getZXKF (queryUrl) {
  return http.get(`/my/zxkf${queryUrl}`)
}
export function editZXKF (data) {
  return http.post(`/my/zxkf/edit`, data)
}
export function addZXKF (data) {
  return http.post(`/my/zxkf/add`, data)
}
export function outZXKF (queryUrl) {
  return http.get(`/my/zxkf/out${queryUrl}`)
}
export function inZXKF (queryUrl) {
  return http.get(`/my/zxkf/in${queryUrl}`)
}
export function getPage (queryUrl) {
  return http.get(`/my/page${queryUrl}`)
}
export function editPage (data) {
  return http.post(`/my/page/save`, data)
}
export function delPage (queryUrl) {
  return http.get(`/my/page/del${queryUrl}`)
}
