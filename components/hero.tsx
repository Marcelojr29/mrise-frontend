import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
            <Code2 className="w-4 h-4" />
            <span>Consultoria em Tecnologia</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance">
            Transformamos <span className="text-primary">sua ideia</span> em realidade
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
            Ajudamos empresas a criarem sites, sistemas e aplicativos que funcionam de verdade, com tecnologia moderna e resultados que você pode ver.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="#contato" className="gap-2">
                Iniciar Projeto
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full lg:w-auto bg-gray-700">
              <a href="#projetos">Ver Projetos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
