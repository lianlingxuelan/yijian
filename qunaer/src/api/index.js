import axios from 'axios'

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data.data;
});


//请求home组件的数据接口
export let getHome = ()=>{
  return axios.get('/static/mock/index.json')
}
export let getCities = ()=>{
  return axios.get('/static/mock/city.json')
}
export let getDetails = (msg)=>{
  return axios.get('/static/mock/detail/'+msg+'.json')
}
