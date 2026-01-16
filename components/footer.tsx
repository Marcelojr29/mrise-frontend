import { Phone, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-primary">MRISE</span>
              <br />
              <span className="text-foreground">TECH</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Consultoria especializada em desenvolvimento web full stack.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#servicos" className="hover:text-foreground transition-colors">
                  Desenvolvimento Full Stack
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-foreground transition-colors">
                  Otimização de Sistemas
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-foreground transition-colors">
                  Consultoria Técnica
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#projetos" className="hover:text-foreground transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#tecnologias" className="hover:text-foreground transition-colors">
                  Tecnologias
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://wa.me/5592993220408"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/marcelo-borges-de-oliveira-junior-073990266"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:marcelobjr.ti@gmail.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MRISE TECH. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
