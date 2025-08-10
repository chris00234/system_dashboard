import axios from 'axios';
import type { SystemMetrics, Process } from '../types/metrics';

const API_BASE_URL = '/dashboard/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const apiService = {
  async getMetrics(): Promise<SystemMetrics> {
    const response = await api.get<SystemMetrics>('/metrics');
    return response.data;
  },

  async getProcesses(): Promise<Process[]> {
    const response = await api.get<Process[]>('/processes');
    return response.data;
  },

  async getNetworkStats(): Promise<any> {
    const response = await api.get('/network-stats');
    return response.data;
  },

  async getHealth(): Promise<any> {
    const response = await api.get('/health');
    return response.data;
  },
};

export default apiService;