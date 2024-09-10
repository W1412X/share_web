import axiosInstance from "./axios.js";

export const getArticleDetail = async (id) => { // 获取文章的详细信息-文章页面
  try {
    const response = await axiosInstance.get(`/detail?model_type=0&id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article detail:', error);
    throw error;
  }
};

export const getQuestionDetail = async (id) => { // 获取问题的详细信息-问题页面
  try {
    const response = await axiosInstance.get(`/detail?model_type=1&id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question detail:', error);
    throw error;
  }
};

export const getCourseDetail = async (id) => { // 获取课程的详细信息
  try {
    const response = await axiosInstance.get(`/detail?model_type=3&id=${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course detail:', error);
    throw error;
  }
};
