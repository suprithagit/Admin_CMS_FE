import apiClient from '@/lib/apiClient';

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  register: (email, password, name) =>
    apiClient.post('/auth/register', { email, password, name }),
  refresh: (refreshToken) =>
    apiClient.post('/auth/refresh', { refreshToken })
};

export const aboutAPI = {
  get: () => apiClient.get('/about'),
  create: (data) => apiClient.post('/about', data),
  update: (id, data) => apiClient.put(`/about/${id}`, data),
  delete: (id) => apiClient.delete(`/about/${id}`)
};

export const skillsAPI = {
  getAll: () => apiClient.get('/skills'),
  getById: (id) => apiClient.get(`/skills/${id}`),
  create: (data) => apiClient.post('/skills', data),
  update: (id, data) => apiClient.put(`/skills/${id}`, data),
  delete: (id) => apiClient.delete(`/skills/${id}`)
};

export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  getFeatured: () => apiClient.get('/projects/featured'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`)
};

export const blogsAPI = {
  getAll: () => apiClient.get('/blogs'),
  getById: (id) => apiClient.get(`/blogs/${id}`),
  create: (data) => apiClient.post('/blogs', data),
  update: (id, data) => apiClient.put(`/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}`)
};

export const experienceAPI = {
  getAll: () => apiClient.get('/experience'),
  getById: (id) => apiClient.get(`/experience/${id}`),
  create: (data) => apiClient.post('/experience', data),
  update: (id, data) => apiClient.put(`/experience/${id}`, data),
  delete: (id) => apiClient.delete(`/experience/${id}`)
};

export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getById: (id) => apiClient.get(`/services/${id}`),
  create: (data) => apiClient.post('/services', data),
  update: (id, data) => apiClient.put(`/services/${id}`, data),
  delete: (id) => apiClient.delete(`/services/${id}`)
};

export const testimonialsAPI = {
  getAll: () => apiClient.get('/testimonials'),
  getById: (id) => apiClient.get(`/testimonials/${id}`),
  create: (data) => apiClient.post('/testimonials', data),
  update: (id, data) => apiClient.put(`/testimonials/${id}`, data),
  delete: (id) => apiClient.delete(`/testimonials/${id}`)
};

export const contactAPI = {
  getAll: () => apiClient.get('/contact'),
  getUnread: () => apiClient.get('/contact/unread'),
  getById: (id) => apiClient.get(`/contact/${id}`),
  reply: (id, replyMessage) => apiClient.post(`/contact/${id}/reply`, { replyMessage }),
  delete: (id) => apiClient.delete(`/contact/${id}`)
};

export const mediaAPI = {
  getAll: () => apiClient.get('/media'),
  getById: (id) => apiClient.get(`/media/${id}`),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => apiClient.delete(`/media/${id}`)
};
