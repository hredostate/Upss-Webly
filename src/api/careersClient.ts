// API client for Careers/Employment system

const API_BASE_URL = '/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data.data;
}

// Public API
export const careersApi = {
  // Categories
  getCategories: () => apiCall('/careers/categories'),

  // Job Listings
  getJobs: (filters?: { status?: string; categoryId?: string; featured?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    if (filters?.featured !== undefined) params.append('featured', String(filters.featured));
    
    const query = params.toString();
    return apiCall(`/careers/jobs${query ? `?${query}` : ''}`);
  },

  getJobBySlug: (slug: string) => apiCall(`/careers/jobs/slug/${slug}`),

  // Auth
  register: (data: any) => apiCall('/careers/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (email: string, password: string) => apiCall('/careers/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),
};

// Applicant API (requires token)
export const applicantApi = {
  // Profile
  getProfile: (token: string) => apiCall('/careers/profile', {
    headers: { 'x-applicant-token': token },
  }),

  updateProfile: (token: string, data: any) => apiCall('/careers/profile', {
    method: 'PUT',
    headers: { 'x-applicant-token': token },
    body: JSON.stringify(data),
  }),

  // Applications
  getMyApplications: (token: string) => apiCall('/careers/my-applications', {
    headers: { 'x-applicant-token': token },
  }),

  getApplication: (token: string, id: string) => apiCall(`/careers/applications/${id}`, {
    headers: { 'x-applicant-token': token },
  }),

  getApplicationHistory: (token: string, id: string) => apiCall(`/careers/applications/${id}/history`, {
    headers: { 'x-applicant-token': token },
  }),

  submitApplication: (token: string, data: any) => apiCall('/careers/applications', {
    method: 'POST',
    headers: { 'x-applicant-token': token },
    body: JSON.stringify(data),
  }),

  withdrawApplication: (token: string, id: string) => apiCall(`/careers/applications/${id}/withdraw`, {
    method: 'PATCH',
    headers: { 'x-applicant-token': token },
  }),

  // Saved Jobs
  getSavedJobs: (token: string) => apiCall('/careers/saved-jobs', {
    headers: { 'x-applicant-token': token },
  }),

  saveJob: (token: string, jobId: string) => apiCall('/careers/saved-jobs', {
    method: 'POST',
    headers: { 'x-applicant-token': token },
    body: JSON.stringify({ jobId }),
  }),

  unsaveJob: (token: string, jobId: string) => apiCall(`/careers/saved-jobs/${jobId}`, {
    method: 'DELETE',
    headers: { 'x-applicant-token': token },
  }),

  // Job Alerts
  getJobAlerts: (token: string) => apiCall('/careers/job-alerts', {
    headers: { 'x-applicant-token': token },
  }),

  createJobAlert: (token: string, data: any) => apiCall('/careers/job-alerts', {
    method: 'POST',
    headers: { 'x-applicant-token': token },
    body: JSON.stringify(data),
  }),

  updateJobAlert: (token: string, id: string, data: any) => apiCall(`/careers/job-alerts/${id}`, {
    method: 'PUT',
    headers: { 'x-applicant-token': token },
    body: JSON.stringify(data),
  }),

  deleteJobAlert: (token: string, id: string) => apiCall(`/careers/job-alerts/${id}`, {
    method: 'DELETE',
    headers: { 'x-applicant-token': token },
  }),
};

// Admin API (requires admin token)
export const careersAdminApi = {
  // Jobs
  getJob: (token: string, id: string) => apiCall(`/admin/careers/jobs/${id}`, {
    headers: { 'x-admin-token': token },
  }),

  createJob: (token: string, data: any) => apiCall('/admin/careers/jobs', {
    method: 'POST',
    headers: { 'x-admin-token': token },
    body: JSON.stringify(data),
  }),

  updateJob: (token: string, id: string, data: any) => apiCall(`/admin/careers/jobs/${id}`, {
    method: 'PUT',
    headers: { 'x-admin-token': token },
    body: JSON.stringify(data),
  }),

  deleteJob: (token: string, id: string) => apiCall(`/admin/careers/jobs/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': token },
  }),

  // Applications
  getAllApplications: (token: string, filters?: { jobId?: string; status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.jobId) params.append('jobId', filters.jobId);
    if (filters?.status) params.append('status', filters.status);
    
    const query = params.toString();
    return apiCall(`/admin/careers/applications${query ? `?${query}` : ''}`, {
      headers: { 'x-admin-token': token },
    });
  },

  getApplication: (token: string, id: string) => apiCall(`/admin/careers/applications/${id}`, {
    headers: { 'x-admin-token': token },
  }),

  updateApplicationStatus: (token: string, id: string, status: string, notes?: string) => 
    apiCall(`/admin/careers/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'x-admin-token': token },
      body: JSON.stringify({ status, notes }),
    }),

  updateApplication: (token: string, id: string, data: any) => apiCall(`/admin/careers/applications/${id}`, {
    method: 'PUT',
    headers: { 'x-admin-token': token },
    body: JSON.stringify(data),
  }),
};
