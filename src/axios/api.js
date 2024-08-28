import axiosInstance from "./axios.js";
// 定义登录请求方法
export const login = (data) => {
  return axiosInstance.post('http://118.89.82.46:1412/api/login', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error logging in:', error);
      throw error; // 如果需要在上层继续处理错误，可以选择抛出错误
    });
};
export const editorUploadImage = (data) => {
  return axiosInstance.post('http://118.89.82.46:1412/api/upload-img', data)
    .then(response => response.data)
    .catch(error => {
      console.error('Error logging in:', error);
      throw error; // 如果需要在上层继续处理错误，可以选择抛出错误
    });
};
export const test =()=>{
  return axiosInstance.get('/name')
    .then(response => response.data)
    .catch(error => {
      console.error('Error logging in:', error);
      throw error; // 如果需要在上层继续处理错误，可以选择抛出错误
    });
}