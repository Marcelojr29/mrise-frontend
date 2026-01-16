"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

// Dados mockados para a página pública
const projects = [
  {
    _id: "1",
    title: "CineXplorer",
    description: "Sistema web para encontrar filmes e promoções nos cinemas da sua região. Filtre por filme e veja cinemas disponíveis, valores de ingressos e promoções em uma única plataforma.",
    image: "/cinexplorer.png",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Express", "Prisma", "PostgreSQL", "API RESTful", "Swagger"],
    liveUrl: "https://frontend-cinexplorer.vercel.app/",
  },
  {
    _id: "2",
    title: "Cezar Construções",
    description: "Landing page institucional para empresa de construção civil, apresentando portfólio de serviços prestados de forma profissional e responsiva.",
    image: "/cezar-construcoes.png",
    technologies: ["Angular", "RxJS", "Angular Material", "TypeScript", "Express", "JavaScript", "SMTP"],
    liveUrl: "https://cezarconstrucoes.vercel.app/",
  },
  {
    _id: "3",
    title: "CSELA",
    description: "Sistema web para gestão de fluxo de moradores de comunidade. Automatiza processos administrativos que antes eram manuais, trazendo agilidade e eficácia ao controle.",
    image: "/csela.png",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "NestJS", "TypeORM", "PostgreSQL", "API RESTful", "Swagger"],
    liveUrl: "https://www.csela.com.br/",
  },
]

export function Projects() {

  return (
    <section id="projetos" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Alguns exemplos de soluções que desenvolvemos para nossos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <a
              key={project._id}
              href={project.liveUrl || "#"}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noopener noreferrer" : undefined}
              className={`block transition-transform duration-300 ${project.liveUrl ? "hover:scale-105" : ""}`}
            >
              <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.liveUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                      <ExternalLink className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        +{project.technologies.length - 5}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
