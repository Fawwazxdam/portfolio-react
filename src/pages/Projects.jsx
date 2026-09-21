import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  Card,
  Navbar,
  Footer
} from '../components/index.js';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects from backend');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        // Fallback to localStorage
        const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        setProjects(localProjects);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading projects..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error Loading Projects"
        message={error}
        details={`Make sure your backend server is running on ${import.meta.env.VITE_API_BASE_URL}`}
        showRetryButton={true}
        onRetry={() => window.location.reload()}
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-white font-mono overflow-x-hidden gradient-mesh-light scanline-overlay">
      {/* Navigation */}
      <Navbar currentPage="projects" />

      <div className="flex-grow">
        {/* Header */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Briefcase size={48} className="mx-auto mb-8 text-arcade-orange" />
            <h1 className="font-pixel text-2xl md:text-5xl text-arcade-orange neon-orange mb-4">
              PROJECTS
            </h1>
            <p className="text-sm text-gray-400 dark:text-white/40 max-w-lg mx-auto">
              Latest projects and works from the portfolio
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id || project.title} animated={true} className="h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Briefcase size={30} className="mr-3 text-arcade-orange" />
                    <h3 className="text-base font-bold line-clamp-1">{project.title}</h3>
                  </div>

                  <p className="mb-4 leading-relaxed text-sm text-gray-500 dark:text-white/60 line-clamp-3">{project.description}</p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(project.technologies || project.tech) && (project.technologies || project.tech).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-arcade-orange/15 text-arcade-orange text-xs font-bold rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button className="flex-1 text-xs py-2" onClick={() => window.open(project.demoUrl || project.demo, '_blank')}>
                      DEMO
                    </Button>
                    <Button variant="secondary" className="flex-1 text-xs py-2" onClick={() => window.open(project.githubUrl || project.github, '_blank')}>
                      CODE
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Projects;