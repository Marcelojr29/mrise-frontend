import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';

// Interfaces
export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
}

export interface Settings {
  _id: string;
  companyInfo: CompanyInfo;
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

/**
 * Serviço de Configurações
 * Gerencia configurações da empresa e redes sociais
 */
class SettingsService {
  /**
   * Obter configurações da empresa
   * @returns Configurações completas
   */
  async getSettings(): Promise<Settings> {
    try {
      const response = await api.get<ApiResponse<Settings>>('/api/settings');
      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar informações da empresa
   * @param companyInfo Dados da empresa
   * @returns Configurações atualizadas
   */
  async updateCompanyInfo(companyInfo: CompanyInfo): Promise<Settings> {
    try {
      const response = await api.put<ApiResponse<Settings>>(
        '/api/settings/company',
        companyInfo
      );
      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar redes sociais
   * @param socialLinks Links das redes sociais (campos opcionais)
   * @returns Configurações atualizadas
   */
  async updateSocialLinks(socialLinks: Partial<SocialLinks>): Promise<Settings> {
    try {
      const response = await api.put<ApiResponse<Settings>>(
        '/api/settings/social',
        socialLinks
      );
      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export default new SettingsService();
