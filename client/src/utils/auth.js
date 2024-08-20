import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';
export const verifyToken = async (token) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GET_USER, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Token verification failed:', error);
    return null; 
  }
};
