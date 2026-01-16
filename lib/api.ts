import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Buscar token do localStorage (apenas no cliente)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Se for erro 401 (não autorizado), fazer logout
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

// Interface para resposta padronizada da API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Interface para resposta de erro
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

// Função helper para extrair dados da resposta
export const getResponseData = <T>(response: { data: ApiResponse<T> }): T => {
  return response.data.data;
};

// Função helper para tratar erros
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    
    if (apiError?.message) {
      // Se message for um array, retornar o primeiro erro
      if (Array.isArray(apiError.message)) {
        return apiError.message[0];
      }
      return apiError.message;
    }
    
    // Mensagens de erro padrão por status code
    switch (error.response?.status) {
      case 400:
        return 'Dados inválidos. Por favor, verifique as informações.';
      case 401:
        return 'Não autorizado. Faça login novamente.';
      case 403:
        return 'Acesso negado.';
      case 404:
        return 'Recurso não encontrado.';
      case 409:
        return 'Conflito. O recurso já existe.';
      case 500:
        return 'Erro no servidor. Tente novamente mais tarde.';
      default:
        return 'Ocorreu um erro inesperado.';
    }
  }
  
  return 'Erro de conexão. Verifique sua internet.';
};

export default api;
