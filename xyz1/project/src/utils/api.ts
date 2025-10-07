const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API utility functions
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async register(userData: any) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    this.removeToken();
  }

  // Health Records methods
  async getHealthRecords() {
    return this.request('/health-records');
  }

  async getLatestVitals() {
    return this.request('/health-records/vitals/latest');
  }

  async createHealthRecord(data: any) {
    return this.request('/health-records', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateHealthRecord(id: string, data: any) {
    return this.request(`/health-records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteHealthRecord(id: string) {
    return this.request(`/health-records/${id}`, {
      method: 'DELETE',
    });
  }

  async getHealthTrends(period: string = '6months') {
    return this.request(`/health-records/trends?period=${period}`);
  }

  // AI Insights methods
  async getAIInsights(params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/ai-insights?${queryString}`);
  }

  async generateAIInsight(type: string, healthData: any) {
    return this.request('/ai-insights/generate', {
      method: 'POST',
      body: JSON.stringify({ type, healthData }),
    });
  }

  async markInsightAsRead(id: string) {
    return this.request(`/ai-insights/${id}/read`, {
      method: 'PATCH',
    });
  }

  async getInsightStats() {
    return this.request('/ai-insights/stats');
  }

  // Dashboard methods
  async getDashboardOverview() {
    return this.request('/dashboard/overview');
  }

  async getHealthMetrics() {
    return this.request('/dashboard/metrics');
  }

  async getRiskFactors() {
    return this.request('/dashboard/risk-factors');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;