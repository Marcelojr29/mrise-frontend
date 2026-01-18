import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';
import { 
  Technology, 
  TechnologyList, 
  TechnologyStats,
  TechnologyByCategory,
  CreateTechnologyData,
  UpdateTechnologyData,
  Pagination 
} from '@/types';

// Helpers para normalização de IDs (backend retorna 'id', frontend usa '_id')
const normalizeTechnology = (tech: any): Technology => ({
  ...tech,
  _id: tech.id || tech._id,
  id: tech.id || tech._id,
});

const normalizeTechnologies = (techs: any[]): Technology[] => 
  techs.map(normalizeTechnology);

// Parâmetros de consulta para listar tecnologias
interface GetTechnologiesParams {
  page?: number;
  pageSize?: number;
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'mobile';
  level?: 'básico' | 'intermediário' | 'avançado';
  isActive?: boolean;
  search?: string;
}

/**
 * Serviço de Stack Tecnológica
 * Gerencia as tecnologias do portfólio
 */
class StackService {
  /**
   * Criar nova tecnologia (admin)
   * @param technologyData Dados da tecnologia
   * @returns Tecnologia criada
   */
  async createTechnology(technologyData: CreateTechnologyData): Promise<Technology> {
    try {
      const response = await api.post<ApiResponse<Technology>>(
        '/api/stack',
        technologyData
      );

      return normalizeTechnology(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Listar tecnologias (público/admin)
   * @param params Parâmetros de filtragem e paginação
   * @returns Array de tecnologias
   */
  async getTechnologies(params?: GetTechnologiesParams): Promise<Technology[]> {
    try {
      const response = await api.get<ApiResponse<TechnologyList>>('/api/stack', {
        params,
      });

      return normalizeTechnologies(getResponseData(response).technologies);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar tecnologia por ID (público/admin)
   * @param id ID da tecnologia
   * @returns Dados da tecnologia
   */
  async getTechnologyById(id: string): Promise<Technology> {
    try {
      const response = await api.get<ApiResponse<Technology>>(`/api/stack/${id}`);

      return normalizeTechnology(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar tecnologia (admin)
   * @param id ID da tecnologia
   * @param updateData Dados a atualizar
   * @returns Tecnologia atualizada
   */
  async updateTechnology(id: string, updateData: UpdateTechnologyData): Promise<Technology> {
    try {
      const response = await api.patch<ApiResponse<Technology>>(
        `/api/stack/${id}`,
        updateData
      );

      return normalizeTechnology(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Deletar tecnologia (admin)
   * @param id ID da tecnologia
   */
  async deleteTechnology(id: string): Promise<void> {
    try {
      await api.delete(`/api/stack/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Alternar status ativo (admin)
   * @param id ID da tecnologia
   * @param isActive Novo status
   * @returns Tecnologia atualizada
   */
  async toggleActive(id: string, isActive: boolean): Promise<Technology> {
    return this.updateTechnology(id, { isActive });
  }

  /**
   * Buscar estatísticas (público)
   * @returns Estatísticas de tecnologias
   */
  async getStats(): Promise<TechnologyStats> {
    try {
      const response = await api.get<ApiResponse<TechnologyStats>>('/api/stack/stats');

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar tecnologias por categoria (público)
   * @returns Tecnologias agrupadas por categoria
   */
  async getTechnologiesByCategory(): Promise<TechnologyByCategory> {
    try {
      const response = await api.get<ApiResponse<TechnologyList>>('/api/stack', {
        params: { isActive: true, pageSize: 100 },
      });

      const technologies = getResponseData(response).technologies;
      
      // Agrupar por categoria localmente
      return technologies.reduce((acc, tech) => {
        if (!acc[tech.category]) {
          acc[tech.category] = [];
        }
        acc[tech.category].push(tech);
        return acc;
      }, {} as TechnologyByCategory);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar tecnologias ativas (público)
   * @returns Lista de tecnologias ativas
   */
  async getActiveTechnologies(): Promise<Technology[]> {
    try {
      const response = await api.get<ApiResponse<TechnologyList>>('/api/stack', {
        params: { isActive: true },
      });

      return getResponseData(response).technologies;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar tecnologias por nível (público)
   * @param level Nível de experiência
   * @returns Lista de tecnologias do nível
   */
  async getTechnologiesByLevel(level: 'básico' | 'intermediário' | 'avançado'): Promise<Technology[]> {
    try {
      const response = await api.get<ApiResponse<TechnologyList>>('/api/stack', {
        params: { level, isActive: true },
      });

      return getResponseData(response).technologies;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar tecnologias principais (público)
   * Retorna tecnologias com nível avançado
   * @param limit Número de tecnologias a retornar
   * @returns Lista de tecnologias principais
   */
  async getMainTechnologies(limit: number = 12): Promise<Technology[]> {
    try {
      const response = await api.get<ApiResponse<TechnologyList>>('/api/stack', {
        params: { level: 'avançado', isActive: true, pageSize: limit },
      });

      return getResponseData(response).technologies;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

// Exportar instância única do serviço
export const stackService = new StackService();
export default stackService;
