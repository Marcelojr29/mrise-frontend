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
import { Plus, Edit, Trash2, Search, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { projectsService } from "@/services"
import { Project } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await projectsService.getProjects()
      setProjects(data)
    } catch (error) {
      console.error("Erro ao carregar projetos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os projetos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  })

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies.join(", "),
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        featured: project.featured,
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: "",
        description: "",
        image: "",
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveProject = async () => {
    if (!formData.title || !formData.description || !formData.technologies) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
        liveUrl: formData.liveUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        featured: formData.featured,
      }

      if (editingProject) {
        const updated = await projectsService.updateProject(editingProject._id, projectData)
        setProjects(projects.map((p) => (p._id === editingProject._id ? updated : p)))
        toast({
          title: "Sucesso",
          description: "Projeto atualizado com sucesso",
        })
      } else {
        const created = await projectsService.createProject(projectData)
        setProjects([created, ...projects])
        toast({
          title: "Sucesso",
          description: "Projeto criado com sucesso",
        })
      }

      setIsDialogOpen(false)
    } catch (error: any) {
      console.error("Erro ao salvar projeto:", error)
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o projeto",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) {
      return
    }

    try {
      await projectsService.deleteProject(id)
      setProjects(projects.filter((p) => p._id !== id))
      toast({
        title: "Sucesso",
        description: "Projeto excluído com sucesso",
      })
    } catch (error) {
      console.error("Erro ao excluir projeto:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciar Projetos</h1>
          <p className="text-muted-foreground mt-2">
            Adicione, edite ou remova projetos do portfólio
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} disabled={loading}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar projetos..."
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
            <p className="text-muted-foreground">Carregando projetos...</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhum projeto encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project._id} className="overflow-hidden group">
              <div className="aspect-video overflow-hidden bg-accent">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
                    {project.featured && (
                      <Badge variant="default" className="shrink-0">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(project)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project._id)}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Editar Projeto" : "Novo Projeto"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Atualize as informações do projeto"
                : "Adicione um novo projeto ao portfólio"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                placeholder="Nome do projeto"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição *</label>
              <Textarea
                placeholder="Descreva o projeto"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL da Imagem *</label>
              <Input
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tecnologias * (separadas por vírgula)</label>
              <Input
                placeholder="React, TypeScript, Node.js"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL do Site (opcional)</label>
              <Input
                placeholder="https://projeto.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL do GitHub (opcional)</label>
              <Input
                placeholder="https://github.com/usuario/repo"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                Marcar como projeto em destaque
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProject}
              disabled={!formData.title || !formData.description || !formData.image || !formData.technologies || saving}
            >
              {saving ? "Salvando..." : editingProject ? "Salvar Alterações" : "Criar Projeto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
