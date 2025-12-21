import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import {
  Button,
  LoadingSpinner,
  ErrorMessage,
  Card,
  Navbar
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono">
      {/* Navigation */}
      <Navbar currentPage="projects" />

      <div className="flex-grow">
        {/* Header */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Briefcase size={80} className="mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              PROJECTS
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Latest projects and works from the portfolio
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id || project.title} animated={true}>
                  <div className="flex items-center mb-4">
                    <Briefcase size={30} className="mr-3" />
                    <h3 className="text-xl font-bold">{project.title}</h3>
                  </div>

                  <p className="mb-6 leading-relaxed">{project.description}</p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(project.technologies || project.tech) && (project.technologies || project.tech).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.demoUrl || project.demo, '_blank')}>
                      DEMO
                    </Button>
                    <Button variant="secondary" className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.githubUrl || project.github, '_blank')}>
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
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg">© 2024 Adam Fawwaz Haq. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>
    </div>
  );
};

export default Projects;