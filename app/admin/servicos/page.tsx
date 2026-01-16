"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, Code, Sparkles } from "lucide-react"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  createdAt: string
}

// Dados mockados
const mockServices: Service[] = [
  {
    id: "1",
    title: "Desenvolvimento Web",
    description: "Criação de sites e aplicações web modernas, responsivas e otimizadas para todos os dispositivos.",
    icon: "Globe",
    features: ["Sites institucionais", "E-commerce", "Landing pages", "Web apps"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Aplicativos Mobile",
    description: "Desenvolvimento de aplicativos nativos e híbridos para iOS e Android com as melhores tecnologias.",
    icon: "Smartphone",
    features: ["Apps nativos", "Apps híbridos", "PWA", "App Store deployment"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Cloud Computing",
    description: "Migração e gerenciamento de infraestrutura em nuvem para escalabilidade e performance.",
    icon: "Cloud",
    features: ["AWS", "Azure", "Google Cloud", "DevOps"],
    createdAt: new Date().toISOString(),
  },
]

export default function ServicosPage() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    features: "",
  })

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features.join(", "),
      })
    } else {
      setEditingService(null)
      setFormData({
        title: "",
        description: "",
        icon: "Code",
        features: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveService = () => {
    const serviceData = {
      id: editingService?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      createdAt: editingService?.createdAt || new Date().toISOString(),
    }

    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? serviceData : s)))
    } else {
      setServices([serviceData, ...services])
    }

    setIsDialogOpen(false)
  }

  const handleDeleteService = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      setServices(services.filter((s) => s.id !== id))
    }
  }

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as any)[iconName] || Code
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Serviços</h1>
          <p className="text-muted-foreground mt-2">
            Adicione, edite ou remova os serviços oferecidos pela empresa
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar serviços..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhum serviço encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const IconComponent = getIcon(service.icon)
            
            return (
              <Card key={service.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase">
                        Características
                      </p>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(service)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                      className="flex-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Atualize as informações do serviço"
                : "Adicione um novo serviço oferecido pela empresa"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                placeholder="Nome do serviço"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição *</label>
              <Textarea
                placeholder="Descreva o serviço"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Ícone * (nome do Lucide Icon, ex: Code, Globe, Smartphone)
              </label>
              <Input
                placeholder="Code"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Veja os ícones disponíveis em:{" "}
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  lucide.dev/icons
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Características (separadas por vírgula)
              </label>
              <Textarea
                placeholder="Característica 1, Característica 2, Característica 3"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveService}
              disabled={!formData.title || !formData.description || !formData.icon}
            >
              {editingService ? "Salvar Alterações" : "Criar Serviço"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
