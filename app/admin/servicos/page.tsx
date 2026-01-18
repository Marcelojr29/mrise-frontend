"use client"

import { useState, useEffect } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Trash2, Search, Code, Sparkles } from "lucide-react"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"
import { servicesService } from "@/services"
import { Service } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ServicosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await servicesService.getServices()
      setServices(data)
    } catch (error) {
      console.error("Erro ao carregar serviços:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os serviços",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Code",
    features: "",
    category: "development",
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
        category: service.category || "development",
      })
    } else {
      setEditingService(null)
      setFormData({
        title: "",
        description: "",
        icon: "Code",
        features: "",
        category: "development",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveService = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      
      const serviceData = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
        category: formData.category,
      }

      if (editingService) {
        const updated = await servicesService.updateService(editingService._id, serviceData)
        setServices(services.map((s) => (s._id === editingService._id ? updated : s)))
        toast({
          title: "Sucesso",
          description: "Serviço atualizado com sucesso",
        })
      } else {
        const created = await servicesService.createService(serviceData)
        setServices([created, ...services])
        toast({
          title: "Sucesso",
          description: "Serviço criado com sucesso",
        })
      }

      setIsDialogOpen(false)
    } catch (error: any) {
      console.error("Erro ao salvar serviço:", error)
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o serviço",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) {
      return
    }

    try {
      await servicesService.deleteService(id)
      setServices(services.filter((s) => s._id !== id))
      toast({
        title: "Sucesso",
        description: "Serviço excluído com sucesso",
      })
    } catch (error) {
      console.error("Erro ao excluir serviço:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço",
        variant: "destructive",
      })
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
        <Button onClick={() => handleOpenDialog()} disabled={loading}>
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
          disabled={loading}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando serviços...</p>
          </div>
        </div>
      ) : filteredServices.length === 0 ? (
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
              <Card key={service._id} className="group hover:shadow-lg transition-shadow">
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
                      onClick={() => handleDeleteService(service._id)}
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
              <label className="text-sm font-medium">Categoria *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Desenvolvimento</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="consulting">Consultoria</SelectItem>
                  <SelectItem value="infrastructure">Infraestrutura</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveService}
              disabled={saving || !formData.title || !formData.description || !formData.icon || !formData.category}
            >
              {saving ? "Salvando..." : editingService ? "Salvar Alterações" : "Criar Serviço"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
