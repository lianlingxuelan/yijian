import axios from './index'
const http = {
  get: function (url) {
    return new Promise((resolve, reject) => {
      axios.get('api/v2/' + url)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.post('api/v2/' + url, params)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default http
