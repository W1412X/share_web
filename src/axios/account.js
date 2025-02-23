/** 
 * this document provides all interface request for account operations
 * the required input parameter is a json object
 * returns the original response message
 * every function return a json with status code and message
 */
import axiosInstance from "./axios.js";

/**
 * registe by Email
 * @param {*} data 
 * @returns 
 */
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

/**
 * get the email exmaine code 
 * @param {*} email 
 * @returns 
 */
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

/**
 * login with username 
 * @param {*} data 
 * @returns 
 */
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

/**
 * get login email code 
 * @param {*} email 
 * @returns 
 */
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

/**
 * login with email 
 * @param {*} data 
 * @returns 
 */
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

/**
 * logout
 * @returns 
 */
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

/**
 * delete account
 * @param {*} data 
 * @returns 
 */
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

/**
 * get email code to delete account 
 * @param {*} email 
 * @returns 
 */
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

/**
 * reset passwd 
 * @param {*} data 
 * @returns 
 */
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

/**
 * get the email code to reset passwd
 * @param {*} email 
 * @returns 
 */
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