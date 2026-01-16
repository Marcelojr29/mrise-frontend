"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle,
  MailOpen,
  Loader2,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { messagesService } from "@/services"
import { Message } from "@/types"
import { useToast } from "@/hooks/use-toast"

export default function MensagensPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await messagesService.getMessages()
      setMessages(data)
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mensagens",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    nova: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    lida: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    respondida: "bg-green-500/10 text-green-600 border-green-500/20",
  }

  const statusLabels = {
    nova: "Nova",
    lida: "Lida",
    respondida: "Respondida",
  }

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message)
    // Marcar como lida se for nova
    if (message.status === "nova") {
      try {
        await messagesService.markAsRead(message._id)
        setMessages(
          messages.map((m) =>
            m._id === message._id ? { ...m, status: "lida" } : m
          )
        )
      } catch (error) {
        console.error("Erro ao marcar mensagem como lida:", error)
      }
    }
  }

  const handleMarkAsResponded = async (id: string) => {
    try {
      await messagesService.markAsResponded(id)
      setMessages(
        messages.map((m) =>
          m._id === id ? { ...m, status: "respondida" } : m
        )
      )
      setSelectedMessage(null)
      toast({
        title: "Sucesso",
        description: "Mensagem marcada como respondida",
      })
    } catch (error) {
      console.error("Erro ao marcar como respondida:", error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a mensagem",
        variant: "destructive",
      })
    }
  }

  const handleDeleteMessage = async (id: string) => {
    try {
      await messagesService.deleteMessage(id)
      setMessages(messages.filter((m) => m._id !== id))
      setSelectedMessage(null)
      toast({
        title: "Sucesso",
        description: "Mensagem excluída com sucesso",
      })
    } catch (error) {
      console.error("Erro ao excluir mensagem:", error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir a mensagem",
        variant: "destructive",
      })
    }
  }

  const stats = {
    total: messages.length,
    novas: messages.filter((m) => m.status === "nova").length,
    lidas: messages.filter((m) => m.status === "lida").length,
    respondidas: messages.filter((m) => m.status === "respondida").length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens de Contato</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie e responda as mensagens recebidas dos visitantes
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-600">Novas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.novas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-yellow-600">Lidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lidas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-600">Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.respondidas}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou mensagem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-45">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="nova">Novas</SelectItem>
                <SelectItem value="lida">Lidas</SelectItem>
                <SelectItem value="respondida">Respondidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Nenhuma mensagem encontrada
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">{message.name}</TableCell>
                      <TableCell>{message.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(message.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={statusColors[message.status]}
                          variant="outline"
                        >
                          {statusLabels[message.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewMessage(message)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MailOpen className="w-5 h-5" />
              Detalhes da Mensagem
            </DialogTitle>
            <DialogDescription>
              Visualize e gerencie a mensagem do visitante
            </DialogDescription>
          </DialogHeader>
          
          {selectedMessage && (
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Nome</Label>
                  <p className="font-medium mt-1">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  <p className="font-medium mt-1">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Telefone</Label>
                    <p className="font-medium mt-1">{selectedMessage.phone}</p>
                  </div>
                )}
                {selectedMessage.company && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Empresa</Label>
                    <p className="font-medium mt-1">{selectedMessage.company}</p>
                  </div>
                )}
                <div>
                  <Label className="text-xs text-muted-foreground">Data</Label>
                  <p className="font-medium mt-1">
                    {new Date(selectedMessage.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge
                      className={statusColors[selectedMessage.status]}
                      variant="outline"
                    >
                      {statusLabels[selectedMessage.status]}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <Label className="text-xs text-muted-foreground">Mensagem</Label>
                <Card className="mt-2">
                  <CardContent className="pt-4">
                    <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
                {selectedMessage.status !== "respondida" && (
                  <Button onClick={() => handleMarkAsResponded(selectedMessage._id)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Respondida
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
