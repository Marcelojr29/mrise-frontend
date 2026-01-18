import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';
import { 
  Project, 
  ProjectList, 
  CreateProjectData,
  UpdateProjectData,
  Pagination 
} from '@/types';

// Helper para normalizar IDs (backend retorna 'id', frontend usa '_id')
const normalizeProject = (project: any): Project => {
  return {
    ...project,
    _id: project._id || project.id,
    id: project.id || project._id,
  };
};

const normalizeProjects = (projects: any[]): Project[] => {
  return projects.map(normalizeProject);
};

// Parâmetros de consulta para listar projetos
interface GetProjectsParams {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  isActive?: boolean;
  category?: 'web' | 'mobile' | 'desktop' | 'other';
  search?: string;
}

/**
 * Serviço de Projetos
 * Gerencia o portfólio de projetos
 */
class ProjectsService {
  /**
   * Criar novo projeto (admin)
   * @param projectData Dados do projeto
   * @returns Projeto criado
   */
  async createProject(projectData: CreateProjectData): Promise<Project> {
    try {
      const response = await api.post<ApiResponse<Project>>(
        '/api/projects',
        projectData
      );

      return normalizeProject(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Listar projetos (público/admin)
   * @param params Parâmetros de filtragem e paginação
   * @returns Array de projetos
   */
  async getProjects(params?: GetProjectsParams): Promise<Project[]> {
    try {
      const response = await api.get<ApiResponse<ProjectList>>('/api/projects', {
        params,
      });

      return normalizeProjects(getResponseData(response).projects);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar projeto por ID (público/admin)
   * @param id ID do projeto
   * @returns Dados do projeto
   */
  async getProjectById(id: string): Promise<Project> {
    try {
      const response = await api.get<ApiResponse<Project>>(`/api/projects/${id}`);

      return normalizeProject(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar projeto (admin)
   * @param id ID do projeto
   * @param updateData Dados a atualizar
   * @returns Projeto atualizado
   */
  async updateProject(id: string, updateData: UpdateProjectData): Promise<Project> {
    try {
      const response = await api.patch<ApiResponse<Project>>(
        `/api/projects/${id}`,
        updateData
      );

      return normalizeProject(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Deletar projeto (admin)
   * @param id ID do projeto
   */
  async deleteProject(id: string): Promise<void> {
    try {
      await api.delete(`/api/projects/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Alternar status de destaque (admin)
   * @param id ID do projeto
   * @param featured Novo status
   * @returns Projeto atualizado
   */
  async toggleFeatured(id: string, featured: boolean): Promise<Project> {
    return this.updateProject(id, { featured });
  }

  /**
   * Alternar status ativo (admin)
   * @param id ID do projeto
   * @param isActive Novo status
   * @returns Projeto atualizado
   */
  async toggleActive(id: string, isActive: boolean): Promise<Project> {
    return this.updateProject(id, { isActive });
  }

  /**
   * Buscar projetos em destaque (público)
   * @param limit Número de projetos a retornar
   * @returns Lista de projetos em destaque
   */
  async getFeaturedProjects(limit: number = 6): Promise<Project[]> {
    try {
      const response = await api.get<ApiResponse<ProjectList>>('/api/projects', {
        params: { featured: true, isActive: true, pageSize: limit },
      });

      return getResponseData(response).projects;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar projetos por categoria (público)
   * @param category Categoria do projeto
   * @returns Lista de projetos da categoria
   */
  async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      const response = await api.get<ApiResponse<ProjectList>>('/api/projects', {
        params: { category, isActive: true },
      });

      return getResponseData(response).projects;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

// Exportar instância única do serviço
export const projectsService = new ProjectsService();
export default projectsService;
