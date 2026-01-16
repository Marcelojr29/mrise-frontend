'use client';

/**
 * EXEMPLO DE SEÇÃO DE PROJETOS (PÚBLICO)
 * 
 * Este é um exemplo de como exibir projetos na página inicial
 * ou em uma página pública de portfólio.
 * 
 * Para usar: copie e adapte para seus componentes públicos
 */

import { useEffect, useState } from 'react';
import { projectsService } from '@/services';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function ProjectsPublicExample() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      // Buscar apenas projetos em destaque e ativos
      const featuredProjects = await projectsService.getFeaturedProjects(6);
      setProjects(featuredProjects);
    } catch (error: any) {
      console.error('Erro ao carregar projetos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos com tecnologias
            modernas e foco em qualidade
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                {project.category && (
                  <Badge 
                    className="absolute top-4 right-4"
                    variant="secondary"
                  >
                    {project.category}
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <Badge key={index} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <Button 
                      variant="default" 
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Projeto
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                    >
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Nenhum projeto disponível no momento.
            </p>
          </div>
        )}

        {/* View All Button */}
        {projects.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Ver Todos os Projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * EXEMPLO 2: Stack Tecnológica (Público)
 */
export function TechStackPublicExample() {
  const [technologies, setTechnologies] = useState<any>({
    frontend: [],
    backend: [],
    database: [],
    devops: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStack();
  }, []);

  const loadStack = async () => {
    try {
      setLoading(true);
      const { stackService } = await import('@/services');
      const categorized = await stackService.getTechnologiesByCategory();
      setTechnologies(categorized);
    } catch (error: any) {
      console.error('Erro ao carregar stack:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tecnologias
          </h2>
          <p className="text-lg text-muted-foreground">
            Trabalhamos com as melhores ferramentas do mercado
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Frontend */}
          {technologies.frontend.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Frontend</h3>
              <div className="space-y-2">
                {technologies.frontend.map((tech: any) => (
                  <div 
                    key={tech._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backend */}
          {technologies.backend.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Backend</h3>
              <div className="space-y-2">
                {technologies.backend.map((tech: any) => (
                  <div 
                    key={tech._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Database */}
          {technologies.database.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Database</h3>
              <div className="space-y-2">
                {technologies.database.map((tech: any) => (
                  <div 
                    key={tech._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DevOps */}
          {technologies.devops.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">DevOps</h3>
              <div className="space-y-2">
                {technologies.devops.map((tech: any) => (
                  <div 
                    key={tech._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-8 h-8" />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
