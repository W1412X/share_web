import axiosInstance from "./axios.js";
export const getArticleDetail = (id) => {//获取文章的详细信息-文章页面
    return axiosInstance.get(`/detail?model_type=0&id=${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching article detail:', error);
            throw error;
        });
};
export const getQuestionDetail = (id) => {//获取问题的详细信息-问题页面
    return axiosInstance.get(`/detail?model_type=1&id=${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching question detail:', error);
            throw error;
        });
};
export const getCourseDetail = (id) => {//获取课程的详细信息
    return axiosInstance.get(`/detail?model_type=3&id=${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching course detail:', error);
            throw error;
        });
};
