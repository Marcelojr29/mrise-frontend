import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';
import { 
  Service, 
  ServiceList, 
  CreateServiceData,
  UpdateServiceData,
  Pagination 
} from '@/types';

// Parâmetros de consulta para listar serviços
interface GetServicesParams {
  page?: number;
  pageSize?: number;
  isActive?: boolean;
  category?: string;
  search?: string;
}

/**
 * Serviço de Serviços
 * Gerencia os serviços oferecidos
 */
class ServicesService {
  /**
   * Criar novo serviço (admin)
   * @param serviceData Dados do serviço
   * @returns Serviço criado
   */
  async createService(serviceData: CreateServiceData): Promise<Service> {
    try {
      const response = await api.post<ApiResponse<Service>>(
        '/api/services',
        serviceData
      );

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Listar serviços (público/admin)
   * @param params Parâmetros de filtragem e paginação
   * @returns Array de serviços
   */
  async getServices(params?: GetServicesParams): Promise<Service[]> {
    try {
      const response = await api.get<ApiResponse<ServiceList>>('/api/services', {
        params,
      });

      return getResponseData(response).services;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar serviço por ID (público/admin)
   * @param id ID do serviço
   * @returns Dados do serviço
   */
  async getServiceById(id: string): Promise<Service> {
    try {
      const response = await api.get<ApiResponse<Service>>(`/api/services/${id}`);

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar serviço (admin)
   * @param id ID do serviço
   * @param updateData Dados a atualizar
   * @returns Serviço atualizado
   */
  async updateService(id: string, updateData: UpdateServiceData): Promise<Service> {
    try {
      const response = await api.patch<ApiResponse<Service>>(
        `/api/services/${id}`,
        updateData
      );

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Deletar serviço (admin)
   * @param id ID do serviço
   */
  async deleteService(id: string): Promise<void> {
    try {
      await api.delete(`/api/services/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Alternar status ativo (admin)
   * @param id ID do serviço
   * @param isActive Novo status
   * @returns Serviço atualizado
   */
  async toggleActive(id: string, isActive: boolean): Promise<Service> {
    return this.updateService(id, { isActive });
  }

  /**
   * Buscar serviços ativos (público)
   * @returns Lista de serviços ativos
   */
  async getActiveServices(): Promise<Service[]> {
    try {
      const response = await api.get<ApiResponse<ServiceList>>('/api/services', {
        params: { isActive: true },
      });

      return getResponseData(response).services;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar serviços por categoria (público)
   * @param category Categoria do serviço
   * @returns Lista de serviços da categoria
   */
  async getServicesByCategory(category: string): Promise<Service[]> {
    try {
      const response = await api.get<ApiResponse<ServiceList>>('/api/services', {
        params: { category, isActive: true },
      });

      return getResponseData(response).services;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

// Exportar instância única do serviço
export const servicesService = new ServicesService();
export default servicesService;
