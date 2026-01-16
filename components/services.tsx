"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Cloud, Database, Globe, Wrench } from "lucide-react"

// Dados mockados para a página pública
const services = [
  {
    _id: "1",
    title: "Desenvolvimento Web",
    description: "Criação de sites e aplicações web modernas, responsivas e otimizadas para todos os dispositivos.",
    icon: "Globe",
    features: ["Sites institucionais", "E-commerce", "Landing pages", "Web apps"],
  },
  {
    _id: "2",
    title: "Aplicativos Mobile",
    description: "Desenvolvimento de aplicativos nativos e híbridos para iOS e Android com as melhores tecnologias.",
    icon: "Smartphone",
    features: ["Apps nativos", "Apps híbridos", "PWA", "App Store deployment"],
  },
  {
    _id: "3",
    title: "Cloud Computing",
    description: "Migração e gerenciamento de infraestrutura em nuvem para escalabilidade e performance.",
    icon: "Cloud",
    features: ["AWS", "Azure", "Google Cloud", "DevOps"],
  },
  {
    _id: "4",
    title: "API Development",
    description: "Desenvolvimento de APIs RESTful e GraphQL robustas e bem documentadas para suas aplicações.",
    icon: "Code",
    features: ["REST APIs", "GraphQL", "Microserviços", "Documentação"],
  },
  {
    _id: "5",
    title: "Banco de Dados",
    description: "Design e otimização de bancos de dados relacionais e não-relacionais para melhor performance.",
    icon: "Database",
    features: ["PostgreSQL", "MongoDB", "Redis", "Otimização"],
  },
  {
    _id: "6",
    title: "Manutenção & Suporte",
    description: "Suporte técnico contínuo e manutenção de sistemas para garantir disponibilidade e performance.",
    icon: "Wrench",
    features: ["Suporte 24/7", "Monitoramento", "Updates", "Bug fixes"],
  },
]

// Mapa de ícones
const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Cloud,
  Code,
  Database,
  Wrench,
}

export function Services() {
  // Função para obter o ícone correto
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Code
  }

  return (
    <section id="servicos" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">Como Podemos Ajudar</h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Oferecemos soluções completas para transformar suas necessidades tecnológicas em ferramentas que impulsionam seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon)
            
            return (
              <Card
                key={service._id}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
