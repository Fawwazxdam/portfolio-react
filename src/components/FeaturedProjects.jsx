import React, { useState, useEffect } from "react";
import { Briefcase, FileText } from "lucide-react";
import { Card, Button, LoadingSpinner, ErrorMessage } from "./index.js";
import { Link } from "react-router-dom";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        let publishedProjects = data.filter((p) => p.published);
        publishedProjects.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        publishedProjects = publishedProjects.slice(0, 3);
        setProjects(publishedProjects);
      } catch (err) {
        // fallback
        const stored = localStorage.getItem("projects");
        if (stored) {
          let localProjects = JSON.parse(stored);
          localProjects.sort((a, b) => (b.id || 0) - (a.id || 0));
          setProjects(localProjects.slice(0, 3));
        } else {
          setProjects([]);
        }
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <LoadingSpinner
            message="Loading featured projects..."
            size="h-16 w-16"
          />
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-16 px-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <Briefcase size={80} className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">PROJECTS</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Latest projects and works from the portfolio
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-16 px-4 bg-gray-100 dark:bg-gray-800">
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
                    {(project.technologies || project.tech).map((tech) => (
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
                  <Button
                    className="flex-1 text-sm py-2 px-4"
                    onClick={() =>
                      window.open(project.demoUrl || project.demo, "_blank")
                    }
                  >
                    DEMO
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 text-sm py-2 px-4"
                    onClick={() =>
                      window.open(project.githubUrl || project.github, "_blank")
                    }
                  >
                    CODE
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => (window.location.href = "/projects")}>
              SEE ALL PROJECTS
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                window.open("https://github.com/Fawwazxdam", "_blank")
              }
            >
              SEE ON GITHUB
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProjects;
