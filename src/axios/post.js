import axiosInstance from "./axios";

// 获取帖子列表
export const getPostList = async (modelType, id, page = 1, pageNum = 20) => {
  try {
    const response = await axiosInstance.get('/index/post/post_list', {
      params: {
        model_type: modelType,
        id: id,
        page: page,
        page_num: pageNum,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post list:', error);
    throw error;
  }
};

// 创建帖子
export const createPost = async (modelType, postTitle, postContent) => {
  try {
    const response = await axiosInstance.post('/index/post/create_post', {
      model_type: modelType,
      post_title: postTitle,
      post_content: postContent
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// 获取回复列表
export const getReplyList = async (postId, page = 1, pageNum = 20) => {
  try {
    const response = await axiosInstance.post('/index/post/reply_list', {
      post_id: postId,
      page: page,
      page_num: pageNum
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reply list:', error);
    throw error;
  }
};

// 创建回复
export const createReply = async (postId, replyContent) => {
  try {
    const response = await axiosInstance.post('/index/post/create_reply', {
      post_id: postId,
      reply_content: replyContent
    });
    return response.data;
  } catch (error) {
    console.error('Error creating reply:', error);
    throw error;
  }
};
