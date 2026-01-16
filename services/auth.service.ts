import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';
import { 
  User, 
  AuthToken, 
  LoginCredentials, 
  RegisterData,
  RefreshTokenData 
} from '@/types';

// Interface para resposta de autenticação
interface AuthResponseData {
  user: User;
  token: {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

/**
 * Serviço de Autenticação
 * Gerencia login, logout e perfil do usuário
 */
class AuthService {
  /**
   * Fazer login
   * @param credentials Email e senha
   * @returns Dados do usuário e token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponseData> {
    try {
      const response = await api.post<ApiResponse<AuthResponseData>>(
        '/api/auth/login',
        credentials
      );

      const data = getResponseData(response);

      // Salvar token e dados do usuário no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.token.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Obter perfil do usuário logado (admin)
   * @returns Dados do usuário
   */
  async getProfile(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>('/api/auth/me');
      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar perfil do usuário (admin)
   * @param updateData Dados a atualizar (name, password, avatar)
   * @returns Usuário atualizado
   */
  async updateProfile(updateData: { name?: string; password?: string; avatar?: string }): Promise<User> {
    try {
      const response = await api.patch<ApiResponse<User>>(
        '/api/auth/me',
        updateData
      );

      const user = getResponseData(response);

      // Atualizar usuário no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Alterar senha do usuário logado
   * @param currentPassword Senha atual
   * @param newPassword Nova senha
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.put<ApiResponse<null>>('/api/auth/change-password', {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Fazer logout (admin)
   * Remove token e dados do usuário do localStorage
   */
  async logout(): Promise<void> {
    try {
      // Chamar endpoint de logout no backend
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Sempre limpar localStorage mesmo se a API falhar
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        // Redirecionar para login
        window.location.href = '/admin/login';
      }
    }
  }

  /**
   * Obter usuário atual do localStorage
   * @returns Usuário logado ou null
   */
  getCurrentUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Verificar se usuário está autenticado
   * @returns true se autenticado, false caso contrário
   */
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      return !!token;
    }
    return false;
  }

  /**
   * Obter token de acesso
   * @returns Token ou null
   */
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }
}

// Exportar instância única do serviço
export const authService = new AuthService();
export default authService;
