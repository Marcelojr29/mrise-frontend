import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Message } from "@/types"

interface RecentMessagesProps {
  messages: Message[]
}

export function RecentMessages({ messages }: RecentMessagesProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mensagens Recentes</CardTitle>
        <CardDescription>Últimas mensagens recebidas dos visitantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma mensagem recebida ainda
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{msg.name}</p>
                    <Badge className={statusColors[msg.status]} variant="outline">
                      {statusLabels[msg.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.email}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {msg.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
