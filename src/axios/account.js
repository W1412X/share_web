/*
 * 本文件提供所有有关账户操作的接口请求
 * 要求输入的参数为对象，且对象中包含所有请求参数
 * 返回响应信息原文
 * 由各自的页面处理后续逻辑  
 * 对于请求的异常，本模块会统一处理，返回状态码-1  
 * 在请求函数中将异常转换为状态码-1(表明为网络问题/未知错误)
 * 同时在控制台输出错误信息  
 */
import axiosInstance from "./axios.js";

// 注册函数
export const register = async (data) => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/register');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/index/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    return { status: -1 };
  }
};

// 获取验证码（注册用）
export const getRegisterEmailCode = async (email) => {
  try {
    console.log('Request Type: GET');
    console.log('Request URL: /register?send_code=1&email=' + email);
    const response = await axiosInstance.get(`/register?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting register email code:', error);
    return { status: -1 };
  }
};

// 用户名和密码登录函数
export const loginWithPassword = async (data) => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/login_passwd');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/index/login_passwd', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in with password:', error);
    return { status: -1 };
  }
};

// 获取验证码（邮箱登录用）
export const getLoginEmailCode = async (email) => {
  try {
    console.log('Request Type: GET');
    console.log('Request URL: /login_email?send_code=1&email=' + email);
    const response = await axiosInstance.get(`/login_email?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting login email code:', error);
    return { status: -1 };
  }
};

// 邮箱和验证码登录函数
export const loginWithEmail = async (data) => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/login_email');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/index/login_email', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in with email:', error);
    return { status: -1 };
  }
};

// 登出函数
export const logout = async () => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/logout');
    const response = await axiosInstance.post('/index/logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    return { status: -1 };
  }
};

// 注销账户函数
export const deleteAccount = async (data) => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/delete_account');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/index/delete_account', data);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    return { status: -1 };
  }
};

// 获取验证码（注销账户用）
export const getDeleteAccountEmailCode = async (email) => {
  try {
    console.log('Request Type: GET');
    console.log('Request URL: /delete_account?send_code=1&email=' + email);
    const response = await axiosInstance.get(`/delete_account?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting delete account email code:', error);
    return { status: -1 };
  }
};

// 重置密码函数
export const resetPassword = async (data) => {
  try {
    console.log('Request Type: POST');
    console.log('Request URL: /index/reset_password');
    console.log('Request Data:', data);
    const response = await axiosInstance.post('/index/reset_password', data);
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    return { status: -1 };
  }
};

// 获取验证码（重置密码用）
export const getResetPasswordEmailCode = async (email) => {
  try {
    console.log('Request Type: GET');
    console.log('Request URL: /reset_password?send_code=1&email=' + email);
    const response = await axiosInstance.get(`/reset_password?send_code=1&email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error getting reset password email code:', error);
    return { status: -1 };
  }
};