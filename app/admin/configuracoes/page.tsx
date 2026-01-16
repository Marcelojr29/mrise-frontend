"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Shield, Mail, Globe, User } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import settingsService, { CompanyInfo, SocialLinks } from "@/services/settings.service"
import authService from "@/services/auth.service"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  })

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "",
    github: "",
    instagram: "",
    twitter: "",
  })

  const [adminInfo, setAdminInfo] = useState({
    name: "Administrador",
    email: "admin@mrisetech.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Carregar configurações ao montar o componente
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await settingsService.getSettings()
      setCompanyInfo(data.companyInfo)
      setSocialLinks(data.socialLinks)
    } catch (error: any) {
      setError(error.message || "Erro ao carregar configurações")
      console.error("Erro ao carregar configurações:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCompanyInfo = async () => {
    try {
      setSaving(true)
      setError("")
      await settingsService.updateCompanyInfo(companyInfo)
      toast({
        title: "Informações atualizadas",
        description: "As informações da empresa foram salvas com sucesso.",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao atualizar informações"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSocialLinks = async () => {
    try {
      setSaving(true)
      setError("")
      await settingsService.updateSocialLinks(socialLinks)
      toast({
        title: "Links atualizados",
        description: "Os links das redes sociais foram salvos com sucesso.",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao atualizar redes sociais"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    // Validações
    if (adminInfo.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    if (adminInfo.newPassword !== adminInfo.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      setError("")
      await authService.changePassword(adminInfo.currentPassword, adminInfo.newPassword)
      toast({
        title: "Senha alterada",
        description: "Sua senha foi atualizada com sucesso.",
      })

      // Limpar campos
      setAdminInfo({
        ...adminInfo,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao alterar senha"
      setError(errorMessage)
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as configurações do sistema e informações da empresa
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Company Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Dados básicos e de contato</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                value={companyInfo.name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">E-mail</Label>
              <Input
                id="company-email"
                type="email"
                value={companyInfo.email}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, email: e.target.value })
                }
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Telefone</Label>
              <Input
                id="company-phone"
                value={companyInfo.phone}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, phone: e.target.value })
                }
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Input
                id="company-address"
                value={companyInfo.address}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, address: e.target.value })
                }
                disabled={saving}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-description">Descrição</Label>
            <Textarea
              id="company-description"
              value={companyInfo.description}
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, description: e.target.value })
              }
              rows={3}
              disabled={saving}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveCompanyInfo} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Salvando..." : "Salvar Informações"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>Links das redes sociais da empresa</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={socialLinks.linkedin || ""}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
                disabled={saving}
                placeholder="https://linkedin.com/company/sua-empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={socialLinks.github || ""}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, github: e.target.value })
                }
                disabled={saving}
                placeholder="https://github.com/sua-empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={socialLinks.instagram || ""}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, instagram: e.target.value })
                }
                disabled={saving}
                placeholder="https://instagram.com/sua-empresa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input
                id="twitter"
                value={socialLinks.twitter || ""}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
                disabled={saving}
                placeholder="https://twitter.com/sua-empresa"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveSocialLinks} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Salvando..." : "Salvar Links"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Alterar senha de acesso ao sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input
              id="current-password"
              type="password"
              value={adminInfo.currentPassword}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, currentPassword: e.target.value })
              }
              disabled={saving}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input
                id="new-password"
                type="password"
                value={adminInfo.newPassword}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, newPassword: e.target.value })
                }
                disabled={saving}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={adminInfo.confirmPassword}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, confirmPassword: e.target.value })
                }
                disabled={saving}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleChangePassword} disabled={saving}>
              <Shield className="w-4 h-4 mr-2" />
              {saving ? "Alterando..." : "Alterar Senha"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
