/**
 * Serviços de Integração com Backend
 * 
 * Este arquivo exporta todos os serviços para facilitar a importação
 */

export { authService } from './auth.service';
export { messagesService } from './messages.service';
export { projectsService } from './projects.service';
export { servicesService } from './services.service';
export { stackService } from './stack.service';

// Re-exportar tipos comuns
export type { ApiResponse, ApiError } from '@/lib/api';
export { handleApiError } from '@/lib/api';
