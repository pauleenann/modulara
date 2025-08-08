import axios from 'axios';
import { authStore } from '@/store/authStore';
import { refreshAccessToken, signout } from '@/services/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

// request interceptor to add access token each request
api.interceptors.request.use(
    (config)=>{
        const auth = authStore();
        let token = auth.accessToken;

        console.log(token)

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error)=> Promise.reject(error)
)

// to refresh access token if its expired (expires in 15 minutes)
api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log("Interceptor caught error:", error);
      const originalRequest = error.config;
  
      // 🛡️ Avoid infinite loop
      if (
        error.response?.data?.code === "TOKEN_MISSING" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
  
        try {
          // 🔄 Refresh access token using httpOnly refresh token
          const response = await refreshAccessToken();
          console.log(response)
  
          const accessToken = response.data.accessToken;
          console.log("New Access Token:", accessToken);
  
          // Store new access token to Pinia/localStorage
          const auth = authStore();
          auth.setAccessToken(accessToken);
  
          // 🔐 Update Authorization header for retry
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
  
          // ✅ Retry the original request using the same instance
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }else if(
        error.response?.data?.code === "REFRESH_TOKEN_EXPIRED"
      ){
        // if refresh token is expired, sign out
        await signout()
      }
  
      // ❌ All other errors
      return Promise.reject(error);
    }
  );
  

export default api