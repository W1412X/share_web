/** 
 * this document provides all interface request for course operations
 * the required input parameter is a json object
 * returns the original response message
 * every function return a json with status code and message
 */
import axiosInstance from "./axios";
/**
 * Create a new course
 * @param {Object} courseData - The data of the course to be created
 * @returns {Promise} - The result of the course creation request
 */
export const createCourse = async (courseData) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/create');
        const response = await axiosInstance.post('/course/create', courseData);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        return { status: -1 };
    }
};
/**
 * Edit an existing course
 * @param {Object} courseData - The data of the course to be updated, including the course ID and fields to modify
 * @returns {Promise} - The result of the course editing request
 */
export const editCourse = async (courseData) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/edit');
        const response = await axiosInstance.post('/course/edit', courseData);
        return response.data;
    } catch (error) {
        console.error('Error editing course:', error);
        return { status: -1 };
    }
};

/**
 * Delete a course
 * @param {number} courseId - The ID of the course to be deleted
 * @returns {Promise} - The result of the course deletion request
 */
export const deleteCourse = async (courseId) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/delete');
        const response = await axiosInstance.post('/course/delete', { course_id: courseId });
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error);
        return { status: -1 };
    }
};

/**
 * Rate and evaluate a course
 * @param {Object} ratingData Rating and evaluation data
 * @returns {Promise} Returns the result of the rating and evaluation
 */
export const rateCourse = async (ratingData) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/rate');
        const response = await axiosInstance.post('/course/rate', ratingData);
        return response.data;
    } catch (error) {
        console.error('Error rating course:', error);
        return { status: -1 };
    }
};

/**
 * Edit the submitted course rating and evaluation
 * @param {Object} updateData Modified rating and evaluation data
 * @returns {Promise} Returns the result of the modification
 */
export const editCourseRating = async (updateData) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/edit_rating');
        const response = await axiosInstance.post('/course/edit_rating', updateData);
        return response.data;
    } catch (error) {
        console.error('Error editing course rating:', error);
        return { status: -1 };
    }
};

/**
 * Get the user's rating and evaluation of a course
 * @param {Object} evaluationData User ID and course ID
 * @returns {Promise} Returns the user's rating and evaluation
 */
export const getUserCourseEvaluation = async (evaluationData) => {
    try {
        console.log('Request Type: POST');
        console.log('Request URL: /course/user_evaluation');
        const response = await axiosInstance.post('/course/user_evaluation', evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error fetching user evaluation:', error);
        return { status: -1 };
    }
};

/**
 * Get course details by course ID
 * @param {number} courseId Course ID
 * @returns {Promise} Returns the course details
 */
export const getCourseDetail = async (courseId) => {
    try {
        console.log('Request Type: GET');
        console.log(`Request URL: /course/detail?course_id=${courseId}`);
        const response = await axiosInstance.get(`/course/detail?course_id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course detail:', error);
        return { status: -1 };
    }
};

/**
 * Get the post list of a specified course with pagination
 * @param {Object} postListData Course ID and pagination information
 * @returns {Promise} Returns the post list of the course
 */
export const getCoursePostList = async (postListData) => {
    try {
        console.log('Request Type: GET');
        console.log(`Request URL: /course/post_list?id=${postListData.course_id}&page_index=${postListData.page_index}&page_size=${postListData.page_size}`);
        const response = await axiosInstance.get(`/course/post_list?id=${postListData.course_id}&page_index=${postListData.page_index}&page_size=${postListData.page_size}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course post list:', error);
        return { status: -1 };
    }
};

/**
 * Get the course list with pagination
 * @param {Object} paginationData Pagination information
 * @returns {Promise} Returns the course list
 */
export const getCourseList = async (paginationData) => {
    try {
        console.log('Request Type: GET');
        console.log(`Request URL: /course/list?page_index=${paginationData.page_index}&page_size=${paginationData.page_size}`);
        const response = await axiosInstance.get(`/course/list?page_index=${paginationData.page_index}&page_size=${paginationData.page_size}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching course list:', error);
        return { status: -1 };
    }
};


