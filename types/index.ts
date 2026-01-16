/**
 * Tipos TypeScript para o Sistema Administrativo
 * Este arquivo contém todas as interfaces e tipos usados no sistema
 */

// ============================================================================
// AUTENTICAÇÃO
// ============================================================================

export interface User {
  _id: string
  id?: string // Alias para compatibilidade
  name: string
  email: string
  role: "admin" | "super_admin"
  avatar?: string
  createdAt: string
  updatedAt: string
  lastLogin?: string
  isActive: boolean
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: "Bearer"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: "admin" | "super_admin"
  avatar?: string
}

export interface AuthResponse {
  success: boolean
  data?: {
    user: User
    tokens: AuthToken
  }
  message?: string
  error?: {
    code: string
    message: string
  }
}

export interface RefreshTokenData {
  refreshToken: string
}

// ============================================================================
// MENSAGENS DE CONTATO
// ============================================================================

export interface Message {
  _id: string
  id?: string // Alias para compatibilidade
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  status: "nova" | "lida" | "respondida"
  createdAt: string
  updatedAt: string
  respondedAt?: string
  respondedBy?: string
  notes?: string
}

export interface CreateMessageData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export interface UpdateMessageData {
  status?: "nova" | "lida" | "respondida"
  notes?: string
  respondedAt?: string
  respondedBy?: string
}

export interface MessageList {
  messages: Message[]
  pagination: Pagination
}

export interface MessageStats {
  total: number
  novas: number
  lidas: number
  respondidas: number
  thisMonth: number
  lastMonth: number
  growthRate?: number
}

// ============================================================================
// PROJETOS
// ============================================================================

export interface Project {
  _id: string
  id?: string // Alias para compatibilidade
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category?: "web" | "mobile" | "desktop" | "other"
  clientName?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  order: number
}

export interface CreateProjectData {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category?: "web" | "mobile" | "desktop" | "other"
  clientName?: string
  completedAt?: string
  isActive?: boolean
  order?: number
}

export interface UpdateProjectData {
  title?: string
  description?: string
  image?: string
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category?: "web" | "mobile" | "desktop" | "other"
  clientName?: string
  completedAt?: string
  isActive?: boolean
  order?: number
}

export interface ProjectList {
  projects: Project[]
  pagination: Pagination
}

// ============================================================================
// SERVIÇOS
// ============================================================================

export interface Service {
  _id: string
  id?: string // Alias para compatibilidade
  title: string
  description: string
  icon: string
  features: string[]
  pricing?: ServicePricing
  category: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateServiceData {
  title: string
  description: string
  icon: string
  features: string[]
  pricing?: ServicePricing
  category?: string
  isActive?: boolean
  order?: number
}

export interface UpdateServiceData {
  title?: string
  description?: string
  icon?: string
  features?: string[]
  pricing?: ServicePricing
  category?: string
  isActive?: boolean
  order?: number
}

export interface ServicePricing {
  model: "fixed" | "hourly" | "project" | "custom"
  startingPrice?: number
  currency: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface ServiceList {
  services: Service[]
  pagination: Pagination
}

// ============================================================================
// STACK TECNOLÓGICA
// ============================================================================

export interface Technology {
  _id: string
  id?: string // Alias para compatibilidade
  name: string
  category: "frontend" | "backend" | "database" | "devops" | "design" | "mobile"
  icon: string
  level: "básico" | "intermediário" | "avançado"
  description?: string
  yearsOfExperience?: number
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface CreateTechnologyData {
  name: string
  category: "frontend" | "backend" | "database" | "devops" | "design" | "mobile"
  icon: string
  level: "básico" | "intermediário" | "avançado"
  description?: string
  yearsOfExperience?: number
  isActive?: boolean
  order?: number
}

export interface UpdateTechnologyData {
  name?: string
  category?: "frontend" | "backend" | "database" | "devops" | "design" | "mobile"
  icon?: string
  level?: "básico" | "intermediário" | "avançado"
  description?: string
  yearsOfExperience?: number
  isActive?: boolean
  order?: number
}

export interface TechnologyList {
  technologies: Technology[]
  pagination: Pagination
}

export interface TechnologyStats {
  totalTechnologies: number
  byCategory: {
    frontend: number
    backend: number
    database: number
    devops: number
    design: number
    mobile: number
  }
  byLevel: {
    básico: number
    intermediário: number
    avançado: number
  }
}

export interface TechnologyByCategory {
  frontend: Technology[]
  backend: Technology[]
  database: Technology[]
  devops: Technology[]
  design: Technology[]
  mobile: Technology[]
}

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

export interface CompanyInfo {
  name: string
  email: string
  phone: string
  address: string
  description: string
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  instagram?: string
  twitter?: string
  facebook?: string
  youtube?: string
}

export interface SystemConfig {
  company: CompanyInfo
  social: SocialLinks
  seo?: SEOConfig
  theme?: ThemeConfig
}

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

export interface ThemeConfig {
  primaryColor: string
  darkMode: boolean
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

export interface Pagination {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}

export interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  [key: string]: any
}

// ============================================================================
// DASHBOARD
// ============================================================================

export interface DashboardStats {
  messages: {
    total: number
    new: number
    pending: number
    responded: number
  }
  projects: {
    total: number
    active: number
    featured: number
  }
  services: {
    total: number
    active: number
  }
  technologies: {
    total: number
    byCategory: Record<string, number>
  }
  visitors?: {
    monthly: number
    growth: number
  }
}

// ============================================================================
// FORMULÁRIOS
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface PasswordChangeFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProjectFormData {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category?: string
  clientName?: string
  completedAt?: string
  isActive: boolean
}

export interface ServiceFormData {
  title: string
  description: string
  icon: string
  features: string[]
  category: string
  isActive: boolean
}

export interface TechnologyFormData {
  name: string
  category: Technology["category"]
  icon: string
  level: Technology["level"]
  description?: string
  yearsOfExperience?: number
  isActive: boolean
}

// ============================================================================
// TIPOS DE AÇÃO
// ============================================================================

export type ActionType = "create" | "update" | "delete" | "view"

export type StatusType = "success" | "error" | "warning" | "info"

export type SortOrder = "asc" | "desc"

// ============================================================================
// FILTROS
// ============================================================================

export interface MessageFilters {
  status?: Message["status"]
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface ProjectFilters {
  featured?: boolean
  isActive?: boolean
  category?: string
  search?: string
}

export interface ServiceFilters {
  isActive?: boolean
  category?: string
  search?: string
}

export interface TechnologyFilters {
  category?: Technology["category"]
  level?: Technology["level"]
  isActive?: boolean
  search?: string
}

// ============================================================================
// NOTE: Todos os tipos já foram exportados acima com 'export interface'
// Não é necessário re-exportá-los aqui
// ============================================================================
