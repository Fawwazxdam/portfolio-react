import React, { useState, useEffect } from 'react';
import { RocketLaunch } from '@phosphor-icons/react';
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import { Card, Button, LoadingSpinner, Section } from '../index.js';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        let published = data.filter((p) => p.published);
        published.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProjects(published.slice(0, 6));
      } catch {
        const stored = localStorage.getItem('projects');
        if (stored) {
          let local = JSON.parse(stored);
          local.sort((a, b) => (b.id || 0) - (a.id || 0));
          setProjects(local.slice(0, 6));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Section id="projects" title="PROJECTS" icon={RocketLaunch}>
        <div className="text-center py-8">
          <LoadingSpinner message="Loading projects..." size="h-12 w-12" />
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" title="PROJECTS" icon={RocketLaunch}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id || project.title}>
            <div className="flex items-center mb-3">
              <Briefcase size={24} className="mr-2 text-arcade-purple" />
              <h3 className="text-lg font-bold">{project.title}</h3>
            </div>
            <p className="text-sm mb-4 leading-relaxed text-gray-500 dark:text-white/60 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(project.technologies || project.tech || []).map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-arcade-purple/15 text-arcade-purple text-xs font-bold rounded-md">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                className="flex-1 text-xs py-2"
                onClick={() => window.open(project.demoUrl || project.demo, '_blank')}
              >
                <ExternalLink size={14} className="mr-1 inline" />
                DEMO
              </Button>
              <Button
                variant="secondary"
                className="flex-1 text-xs py-2"
                onClick={() => window.open(project.githubUrl || project.github, '_blank')}
              >
                <Github size={14} className="mr-1 inline" />
                CODE
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default ProjectsSection;
