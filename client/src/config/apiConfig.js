const API_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  GET_ALLUSERS: `${API_URL}/api/admin/user`,
  DELETE_USER: (id) => `${API_URL}/api/user/profile/${id}`,
  GET_USER: `${API_URL}/api/user/profile`,
  GET_USERID: (id) => `${API_URL}/api/user/profile/${id}`,

  GET_ALLBLOGS: `${API_URL}/api/blog`,
  DELETE_BLOG: (id) => `${API_URL}/api/blog/${id}`,
  ADD_BLOG:`${API_URL}/api/blog/add`,
  GET_BLOGID : (id) => `${API_URL}/api/blog/${id}`,
  GET_COMMENT: (id) =>`${API_URL}/api/blog/${id}/comment`,

  GET_ALLPOSTS: `${API_URL}/api/post`,
  DELETE_POST: (id) => `${API_URL}/api/post/${id}`,
  GET_POSTID: (id) => `${API_URL}/api/post/${id}`,
  GET_REVIEW: (id) =>`${API_URL}/api/post/${id}/reviews`,

  USER_LOGIN:`${API_URL}/api/auth/login`,
  USER_REGISTER:`${API_URL}/api/auth/register`,
  UPLOAD_PROFILE: `${API_URL}/uploads/profile/`, 
  UPLOAD_BLOGS: `${API_URL}/uploads/blog/`, 
  UPLOAD_POSTS: `${API_URL}/uploads/post/`, 

  CHAT_AI:`${API_URL}/api/aichat`,

  CONTACT_API:`${API_URL}/api/contact`,

  ADMIN_LOGIN:`${API_URL}/api/admin/login`,
};
