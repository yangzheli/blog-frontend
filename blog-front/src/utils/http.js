import axios from 'axios';
import QS from 'qs';  //引入qs模块，用来序列化post类型的数据

//环境的切换

//设置请求超时时间
axios.defaults.timeout = 10000;

//请求拦截器
axios.interceptors.request.use(

)

//响应拦截器
axios.interceptors.response.use(

)

//封装get方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  })
}

//封装post方法
export function post(url, params) {
  return new Promise(((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  }))
}

//封装post方法,配置请求头数据格式为multipart/form-data
export function uploadFile(url, params) {
  return new Promise(((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  }))
}
