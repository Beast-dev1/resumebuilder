import axios, { AxiosInstance, AxiosError } from 'axios';
import { getToken, removeToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:15',message:'Request interceptor',data:{url:config.url,baseURL:config.baseURL,method:config.method,hasAuth:!!config.headers.Authorization},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:29',message:'Response interceptor success',data:{status:response.status,url:response.config.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return response;
  },
  (error: AxiosError) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/3c66fedc-29a9-4365-9364-0533247855be',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:31',message:'Response interceptor error',data:{status:error.response?.status,statusText:error.response?.statusText,url:error.config?.url,code:error.code,message:error.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (error.response?.status === 401) {
      // Unauthorized - remove token and redirect to login
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Resume API functions
export const getResumes = async () => {
  const response = await api.get('/api/resumes');
  return response.data;
};

export const getResume = async (id: string) => {
  const response = await api.get(`/api/resumes/${id}`);
  return response.data;
};

export const createResume = async (data: { title: string; resumeData?: Record<string, any> }) => {
  const response = await api.post('/api/resumes', data);
  return response.data;
};

export const uploadResume = async (file: File, title?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  if (title) {
    formData.append('title', title);
  }
  const response = await api.post('/api/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(`/api/resumes/${id}`);
  return response.data;
};

export default api;

