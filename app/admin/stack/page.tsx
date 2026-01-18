"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { stackService } from "@/services"
import { Technology } from "@/types"

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Banco de Dados",
  devops: "DevOps",
  design: "Design",
  mobile: "Mobile",
}

const levelLabels = {
  básico: "Básico",
  intermediário: "Intermediário",
  avançado: "Avançado",
}

const levelColors = {
  básico: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  intermediário: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  avançado: "bg-green-500/10 text-green-600 border-green-500/20",
}

export default function StackPage() {
  const { toast } = useToast()
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTech, setEditingTech] = useState<Technology | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend" as Technology["category"],
    icon: "",
    level: "intermediário" as Technology["level"],
  })

  useEffect(() => {
    loadTechnologies()
  }, [])

  const loadTechnologies = async () => {
    try {
      setLoading(true)
      const data = await stackService.getTechnologies()
      setTechnologies(data)
    } catch (error) {
      console.error("Erro ao carregar tecnologias:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as tecnologias",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredTechnologies = technologies.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || tech.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleOpenDialog = (tech?: Technology) => {
    if (tech) {
      setEditingTech(tech)
      setFormData({
        name: tech.name,
        category: tech.category,
        icon: tech.icon,
        level: tech.level,
      })
    } else {
      setEditingTech(null)
      setFormData({
        name: "",
        category: "frontend",
        icon: "",
        level: "intermediário",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveTechnology = async () => {
    if (!formData.name || !formData.icon) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      
      const techData = {
        name: formData.name,
        category: formData.category,
        icon: formData.icon,
        level: formData.level,
      }

      if (editingTech) {
        const updated = await stackService.updateTechnology(editingTech._id, techData)
        setTechnologies(technologies.map((t) => (t._id === editingTech._id ? updated : t)))
        toast({
          title: "Sucesso",
          description: "Tecnologia atualizada com sucesso",
        })
      } else {
        const created = await stackService.createTechnology(techData)
        setTechnologies([created, ...technologies])
        toast({
          title: "Sucesso",
          description: "Tecnologia criada com sucesso",
        })
      }

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Erro ao salvar tecnologia:", error)
      toast({
        title: "Erro",
        description: "Não foi possível salvar a tecnologia",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteTechnology = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta tecnologia?")) {
      return
    }

    try {
      await stackService.deleteTechnology(id)
      setTechnologies(technologies.filter((t) => t._id !== id))
      toast({
        title: "Sucesso",
        description: "Tecnologia excluída com sucesso",
      })
    } catch (error) {
      console.error("Erro ao excluir tecnologia:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a tecnologia",
        variant: "destructive",
      })
    }
  }

  // Agrupar por categoria
  const groupedByCategory = filteredTechnologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  }, {} as Record<string, Technology[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stack Tecnológica</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as tecnologias e ferramentas utilizadas
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Tecnologia
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tecnologias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-50">
            <SelectValue placeholder="Filtrar categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="database">Banco de Dados</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando tecnologias...</p>
          </div>
        </div>
      ) : filteredTechnologies.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhuma tecnologia encontrada</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByCategory).map(([category, techs]) => (
            <div key={category}>
              <h2 className="text-xl font-bold mb-4">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {techs.map((tech) => (
                  <Card key={tech._id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/32?text=?"
                            }}
                          />
                        </div>
                        <Badge
                          className={levelColors[tech.level]}
                          variant="outline"
                        >
                          {levelLabels[tech.level]}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-lg mb-4">{tech.name}</h3>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(tech)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTechnology(tech._id)}
                          className="flex-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTech ? "Editar Tecnologia" : "Nova Tecnologia"}
            </DialogTitle>
            <DialogDescription>
              {editingTech
                ? "Atualize as informações da tecnologia"
                : "Adicione uma nova tecnologia ao stack"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome *</label>
              <Input
                placeholder="React, Node.js, etc"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria *</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as Technology["category"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="database">Banco de Dados</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nível de Conhecimento *</label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  setFormData({ ...formData, level: value as Technology["level"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="básico">Básico</SelectItem>
                  <SelectItem value="intermediário">Intermediário</SelectItem>
                  <SelectItem value="avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL do Ícone *</label>
              <Input
                placeholder="https://..."
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Use DevIcons:{" "}
                <a
                  href="https://devicon.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  devicon.dev
                </a>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveTechnology}
              disabled={saving || !formData.name || !formData.icon}
            >
              {saving ? "Salvando..." : editingTech ? "Salvar Alterações" : "Adicionar Tecnologia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
