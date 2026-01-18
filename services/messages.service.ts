import api, { ApiResponse, getResponseData, handleApiError } from '@/lib/api';
import axios from 'axios';
import { 
  Message, 
  MessageList, 
  MessageStats, 
  CreateMessageData,
  UpdateMessageData,
  Pagination 
} from '@/types';

// Helper para normalizar IDs (backend retorna 'id', frontend usa '_id')
const normalizeMessage = (message: any): Message => {
  return {
    ...message,
    _id: message._id || message.id,
    id: message.id || message._id,
  };
};

const normalizeMessages = (messages: any[]): Message[] => {
  return messages.map(normalizeMessage);
};

// Parâmetros de consulta para listar mensagens
interface GetMessagesParams {
  page?: number;
  pageSize?: number;
  status?: 'nova' | 'lida' | 'respondida';
  search?: string;
}

/**
 * Serviço de Mensagens
 * Gerencia mensagens de contato do formulário
 */
class MessagesService {
  /**
   * Criar nova mensagem (público - formulário de contato)
   * @param messageData Dados da mensagem
   * @returns ID da mensagem criada
   */
  async createMessage(messageData: CreateMessageData): Promise<{ id: string; message: string }> {
    try {
      const response = await api.post<ApiResponse<{ id: string; message: string }>>(
        '/api/messages',
        messageData
      );

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Listar mensagens (admin)
   * @param params Parâmetros de filtragem e paginação
   * @returns Lista de mensagens ou array de mensagens se limit especificado
   */
  async getMessages(params?: GetMessagesParams & { limit?: number }): Promise<Message[]> {
    try {
      const response = await api.get<ApiResponse<MessageList>>('/api/messages', {
        params,
      });

      const data = getResponseData(response);
      return normalizeMessages(data.messages);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar mensagem por ID (admin)
   * @param id ID da mensagem
   * @returns Dados da mensagem
   */
  async getMessageById(id: string): Promise<Message> {
    try {
      const response = await api.get<ApiResponse<Message>>(`/api/messages/${id}`);

      return normalizeMessage(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Atualizar mensagem (admin)
   * @param id ID da mensagem
   * @param updateData Dados a atualizar
   * @returns Mensagem atualizada
   */
  async updateMessage(id: string, updateData: UpdateMessageData): Promise<Message> {
    try {
      const response = await api.patch<ApiResponse<Message>>(
        `/api/messages/${id}`,
        updateData
      );

      return normalizeMessage(getResponseData(response));
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Marcar mensagem como lida (admin)
   * @param id ID da mensagem
   * @returns Mensagem atualizada
   */
  async markAsRead(id: string): Promise<Message> {
    return this.updateMessage(id, { status: 'lida' });
  }

  /**
   * Marcar mensagem como respondida (admin)
   * @param id ID da mensagem
   * @param notes Notas da resposta (opcional)
   * @returns Mensagem atualizada
   */
  async markAsResponded(id: string, notes?: string): Promise<Message> {
    return this.updateMessage(id, { status: 'respondida', notes });
  }

  /**
   * Deletar mensagem (admin)
   * @param id ID da mensagem
   */
  async deleteMessage(id: string): Promise<void> {
    try {
      await api.delete(`/api/messages/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar estatísticas de mensagens (admin)
   * @returns Estatísticas
   */
  async getStats(): Promise<MessageStats> {
    try {
      const response = await api.get<ApiResponse<MessageStats>>('/api/messages/stats');

      return getResponseData(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Buscar mensagens recentes (admin)
   * @param limit Número de mensagens a retornar
   * @returns Lista de mensagens recentes
   */
  async getRecentMessages(limit: number = 5): Promise<Message[]> {
    return this.getMessages({ pageSize: limit, page: 1 });
  }
}

// Exportar instância única do serviço
export const messagesService = new MessagesService();
export default messagesService;
