// 所有关于身份认证的请求函数
import axiosInstance from "./axios.js";

export const register = async (data) => { // 注册函数
  try {
    const response = await axiosInstance.post('/index/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const sendRegisterCode = async (email) => { // 发送注册的邮箱验证码
  try {
    const response = await axiosInstance.get(`/index/register?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error sending register code:', error);
    throw error;
  }
};

export const loginWithPassword = async (data) => { // 使用密码登陆
  try {
    const response = await axiosInstance.post('/index/login_passwd', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in with password:', error);
    throw error;
  }
};

export const loginWithEmail = async (data) => { // 使用邮箱验证码登陆
  try {
    const response = await axiosInstance.post('/index/login_email', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in with email:', error);
    throw error;
  }
};

export const sendLoginCode = async (email) => { // 发送登陆时使用的邮箱验证码
  try {
    const response = await axiosInstance.get(`/index/login_email?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error sending login code:', error);
    throw error;
  }
};

export const logout = async () => { // 登出的逻辑，可能需要在本地进行配置
  try {
    const response = await axiosInstance.post('/index/logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const deleteAccount = async (data) => { // 删除账户
  try {
    const response = await axiosInstance.post('/index/delete_account', data);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

export const sendDeleteCode = async (email) => { // 注销账户
  try {
    const response = await axiosInstance.get(`/index/delete_account?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error sending delete code:', error);
    throw error;
  }
};

export const resetPasswd = async (data) => { // 重置密码
  try {
    const response = await axiosInstance.post(`/reset_password?send_code=1&email=email`, data);
    return response.data;
  } catch (error) {
    console.error('Error reset passwd:', error);
    throw error;
  }
};

export const sendResetPasswdCode = async (email) => { // 发送重置密码的验证码
  try {
    const response = await axiosInstance.get(`/index/reset_passwd?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error sending reset code:', error);
    throw error;
  }
};
