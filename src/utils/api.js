import axios from 'axios'
const baseURL='http://118.89.82.46:1412'
const axiosInstance=axios.create({
    baseURL,
})
// 定义网络请求方法
export const fetchData = () => {
  return axiosInstance.get('/data')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // 可以选择抛出错误，由调用方处理
    });
};
// 定义登录请求方法
export const login = (type, username, passwd) => {
  const data = {
    type: type,
    username: username,
    passwd: passwd
  };
  return axiosInstance.post('http://118.89.82.46:1412/api/login', data)
    .then(response => response.data.state)
    .catch(error => {
      console.error('Error logging in:', error);
      throw error; // 如果需要在上层继续处理错误，可以选择抛出错误
    });
};
