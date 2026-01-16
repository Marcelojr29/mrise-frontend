"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, LogIn } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-foreground">
              <span className="text-primary">MRISE</span>
              <br className="sm:hidden" />
              <span className="text-foreground"> TECH</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-muted-foreground hover:text-foreground transition-colors">
              Serviços
            </a>
            <a href="#tecnologias" className="text-muted-foreground hover:text-foreground transition-colors">
              Tecnologias
            </a>
            <a href="#projetos" className="text-muted-foreground hover:text-foreground transition-colors">
              Projetos
            </a>
            <Button asChild>
              <a href="#contato">Fale Conosco</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          </nav>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 border-t border-border">
            <a
              href="#servicos"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#tecnologias"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tecnologias
            </a>
            <a
              href="#projetos"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projetos
            </a>
            <Button asChild className="w-full">
              <a href="#contato" onClick={() => setIsMenuOpen(false)}>
                Fale Conosco
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
