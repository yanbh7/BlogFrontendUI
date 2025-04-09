import ApiResponse from './res';

// 请求拦截器
const getInterceptorsReq = () => [
  // 在发送请求之前做些什么
  (config) => {
    const token = localStorage.getItem('token'); // 从本地存储获取token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // 设置Authorization头部
    }
    return config;
  },
  // 对请求错误做些什么
  (error) => {
    return Promise.reject(error);
  },
];

// 响应拦截器
const getInterceptorsRes = () => [
  (response) => {
    // 对响应数据做点什么
    return new ApiResponse(response.data);
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 根据响应状态码处理错误
      switch (error.response.status) {
        case 401:
          console.error('未授权，请重新登录');
          // 可以跳转到登录页面
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求地址不存在');
          break;
        default:
          console.error('服务器错误');
      }
    }
    return Promise.reject(error);
  },
];

export { getInterceptorsReq, getInterceptorsRes };
