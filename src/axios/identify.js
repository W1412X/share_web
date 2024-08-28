//所有关于身份认证的请求函数
import axiosInstance from "./axios.js";
export const register = (data) => {//注册函数
    return axiosInstance.post('/index/register', data)
      .then(response => response.data)
      .catch(error => {
        console.error('Error registering:', error);
        throw error;
      });
  };
  export const sendRegisterCode = (email) => {//发送注册的邮箱验证码
    return axiosInstance.get(`/index/register?send_code=1&email=${email}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error sending register code:', error);
        throw error;
      });
  };
  export const loginWithPassword = (data) => {//使用密码登陆
    return axiosInstance.post('/index/login_passwd', data)
      .then(response => response.data)
      .catch(error => {
        console.error('Error logging in with password:', error);
        throw error;
      });
  };
  export const loginWithEmail = (data) => {//使用邮箱验证码登陆
    return axiosInstance.post('/index/login_email', data)
      .then(response => response.data)
      .catch(error => {
        console.error('Error logging in with email:', error);
        throw error;
      });
  };
  
  export const sendLoginCode = (email) => {//发送登陆时使用的邮箱验证码
    return axiosInstance.get(`/index/login_email?send_code=1&email=${email}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error sending login code:', error);
        throw error;
      });
  };
  export const logout = () => {//登出的逻辑，可能需要在本地进行配置
    return axiosInstance.post('/index/logout')
      .then(response => response.data)
      .catch(error => {
        console.error('Error logging out:', error);
        throw error;
      });
  };
  export const deleteAccount = (data) => {//登出账户
    return axiosInstance.post('/index/delete_account', data)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleting account:', error);
        throw error;
      });
  };
  export const sendDeleteCode = (email) => {//注销账户
    return axiosInstance.get(`/index/delete_account?send_code=1&email=${email}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error sending delete code:', error);
        throw error;
      });
  };
  
