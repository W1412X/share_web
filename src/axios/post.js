//POST即Question
import axiosInstance from "./axios";
export const getPostList = (modelType, id, page = 1, pageNum = 20) => {
    return axiosInstance.get('/index/post/post_list', {
      params: {
        model_type: modelType,
        id: id,
        page: page,
        page_num: pageNum,
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching post list:', error);
      throw error;
    });
  };
  
  // 创建 Post
  export const createPost = (modelType, postTitle, postContent) => {
    return axiosInstance.post('/index/post/create_post', {
      model_type: modelType,
      post_title: postTitle,
      post_content: postContent
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating post:', error);
      throw error;
    });
  };
  
  // 获取 Reply 列表
  export const getReplyList = (postId, page = 1, pageNum = 20) => {
    return axiosInstance.post('/index/post/reply_list', {
      post_id: postId,
      page: page,
      page_num: pageNum
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching reply list:', error);
      throw error;
    });
  };
  
  // 创建 Reply
  export const createReply = (postId, replyContent) => {
    return axiosInstance.post('/index/post/create_reply', {
      post_id: postId,
      reply_content: replyContent
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating reply:', error);
      throw error;
    });
  };