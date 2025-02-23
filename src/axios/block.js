/** 
 * this document provides all interface request for block operations
 * the required input parameter is a json object
 * returns the original response message
 * every function return a json with status code and message
 */
import axiosInstance from "./axios.js";
/**
 * 
 * @param {block user id} toUserId 
 * @returns 
 */
export const blockUser = async (toUserId) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /index/block');
        const response = await axiosInstance.post('/index/block', { to_user_id: toUserId });
        return response.data;
    } catch (error) {
        console.error('Error blocking user:', error);
        return { status: -1 };
    }
};
/**
 * 
 * @param {unblock user id} toUserId 
 * @returns 
 */
export const unblockUser = async (toUserId) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /index/unblock');
        const response = await axiosInstance.post('/index/unblock', { to_user_id: toUserId });
        return response.data;
    } catch (error) {
        console.error('Error unblocking user:', error);
        return { status: -1 };
    }
};

/**
 * 
 * @param {user id(self)} userId 
 * @returns 
 */
export const getBlockList = async (userId) => {
    try {
        console.log('Request Type: GET');
        console.log('Request URL: /index/blocklist');
        const response = await axiosInstance.get('/index/blocklist', { params: { user_id: userId } });
        return response.data;
    } catch (error) {
        console.error('Error getting block list:', error);
        return { status: -1 };
    }
};
