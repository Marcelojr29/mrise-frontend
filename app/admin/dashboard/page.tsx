"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/admin/stat-card"
import { RecentMessages } from "@/components/admin/recent-messages"
import { Mail, FolderKanban, Wrench, Code2, TrendingUp, Users, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { messagesService, projectsService, servicesService, stackService } from "@/services"
import { Message } from "@/types"

interface DashboardStats {
  messagesCount: number
  projectsCount: number
  servicesCount: number
  technologiesCount: number
}

export default function DashboardPage() {
  const [recentMessages, setRecentMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    messagesCount: 0,
    projectsCount: 0,
    servicesCount: 0,
    technologiesCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Buscar dados em paralelo
      const [messages, messageStats, projects, services, technologies] = await Promise.all([
        messagesService.getMessages({ limit: 5 }),
        messagesService.getStats(),
        projectsService.getProjects(),
        servicesService.getServices(),
        stackService.getTechnologies(),
      ])

      setRecentMessages(messages)
      setStats({
        messagesCount: messageStats.novas || 0,
        projectsCount: projects.length,
        servicesCount: services.length,
        technologiesCount: technologies.length,
      })
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema e métricas principais
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Mensagens Novas"
          value={stats.messagesCount}
          description="Aguardando resposta"
          icon={Mail}
        />
        <StatCard
          title="Projetos"
          value={stats.projectsCount}
          description="No portfólio"
          icon={FolderKanban}
        />
        <StatCard
          title="Serviços Oferecidos"
          value={stats.servicesCount}
          description="Diferentes categorias"
          icon={Wrench}
        />
        <StatCard
          title="Tecnologias"
          value={stats.technologiesCount}
          description="No stack atual"
          icon={Code2}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <RecentMessages messages={recentMessages} />

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <a
              href="/admin/mensagens"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  Ver Todas as Mensagens
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie contatos dos visitantes
                </p>
              </div>
            </a>

            <a
              href="/admin/projetos"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <FolderKanban className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  Gerenciar Projetos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adicionar ou editar portfólio
                </p>
              </div>
            </a>

            <a
              href="/admin/servicos"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  Gerenciar Serviços
                </h3>
                <p className="text-sm text-muted-foreground">
                  Atualizar serviços oferecidos
                </p>
              </div>
            </a>

            <a
              href="/admin/stack"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  Stack Tecnológica
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gerenciar tecnologias utilizadas
                </p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
