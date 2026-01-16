"use client"

import { Badge } from "@/components/ui/badge"

// Dados mockados para a página pública
const technologies = [
  { _id: "1", name: "Angular", category: "frontend" as const },
  { _id: "2", name: "React", category: "frontend" as const },
  { _id: "3", name: "Next.js", category: "frontend" as const },
  { _id: "4", name: "TypeScript", category: "frontend" as const },
  { _id: "5", name: "Tailwind CSS", category: "frontend" as const },
  { _id: "6", name: "Node.js", category: "backend" as const },
  { _id: "7", name: "NestJS", category: "backend" as const },
  { _id: "8", name: "Python", category: "backend" as const },
  { _id: "9", name: "Prisma ORM", category: "database" as const },
  { _id: "10", name: "Type ORM", category: "database" as const },
  { _id: "11", name: "PostgreSQL", category: "database" as const },
  { _id: "12", name: "MongoDB", category: "database" as const },
  { _id: "13", name: "Docker", category: "devops" as const },
  { _id: "14", name: "React Native", category: "mobile" as const },
]

export function TechStack() {
  // Mapear categorias para labels em português
  const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps",
    design: "Design",
    mobile: "Mobile",
  }

  return (
    <section id="tecnologias" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">Tecnologias que Dominamos</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Trabalhamos com as tecnologias mais modernas e confiáveis do mercado para garantir qualidade e
            escalabilidade.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {technologies.map((tech) => (
            <div
              key={tech._id}
              className="group px-6 py-3 rounded-full bg-secondary/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{tech.name}</span>
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  • {categoryLabels[tech.category] || tech.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
