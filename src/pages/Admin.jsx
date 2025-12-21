import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Navbar } from '../components/index.js';
import { Plus, ArrowLeft } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    tags: '',
    published: true
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    content: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    tags: ''
  });

  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles from API
        const articlesResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
        if (articlesResponse.ok) {
          const apiArticles = await articlesResponse.json();
          setArticles(apiArticles);
        } else {
          // Fallback to localStorage
          const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
          setArticles(storedArticles);
        }

        // Fetch projects from API
        const projectsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
        if (projectsResponse.ok) {
          const apiProjects = await projectsResponse.json();
          setProjects(apiProjects);
        } else {
          // Fallback to localStorage
          const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
          setProjects(storedProjects);
        }
      } catch (error) {
        // Fallback to localStorage
        const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
        setArticles(storedArticles);
        const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        setProjects(storedProjects);
      }
    };

    fetchData();
  }, []);

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title: articleForm.title,
      content: articleForm.content,
      tags: articleForm.tags.split(',').map(tag => tag.trim()),
      authorId: 1, // Assuming default author ID
      published: articleForm.published
    };

    try {
      if (editingArticle) {
        // Update existing
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData)
        });
        if (response.ok) {
          alert('Article updated successfully!');
          setEditingArticle(null);
          // Refetch articles
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
          if (res.ok) {
            const data = await res.json();
            setArticles(data);
          }
        } else {
          alert('Failed to update article');
        }
      } else {
        // Add new
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...articleData, createdAt: new Date().toISOString() })
        });
        if (response.ok) {
          alert('Article added successfully!');
          // Refetch articles
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
          if (res.ok) {
            const data = await res.json();
            setArticles(data);
          }
        } else {
          alert('Failed to add article');
        }
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setArticleForm({ title: '', content: '', tags: '', author: '', published: true });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      content: projectForm.content,
      technologies: projectForm.technologies.split(',').map(t => t.trim()),
      demoUrl: projectForm.demoUrl,
      githubUrl: projectForm.githubUrl,
      authorId: 1, // Assuming default author ID
      tags: projectForm.tags.split(',').map(tag => tag.trim())
    };

    try {
      if (editingProject) {
        // Update existing
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...projectData, id: editingProject.id })
        });
        if (response.ok) {
          alert('Project updated successfully!');
          setEditingProject(null);
          // Refetch projects
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
          if (res.ok) {
            const data = await res.json();
            setProjects(data);
          }
        } else {
          alert('Failed to update project');
        }
      } else {
        // Add new
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        });
        if (response.ok) {
          alert('Project added successfully!');
          // Refetch projects
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
          if (res.ok) {
            const data = await res.json();
            setProjects(data);
          }
        } else {
          alert('Failed to add project');
        }
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setProjectForm({ title: '', description: '', content: '', technologies: '', demoUrl: '', githubUrl: '', tags: '' });
  };

  const editArticle = (article) => {
    setArticleForm({
      title: article.title,
      content: article.content,
      tags: article.tags.map(t => t.tag.name).join(','),
      author: article.author.name,
      published: article.published
    });
    setEditingArticle(article);
  };

  const deleteArticle = async (id) => {
    if (confirm('Delete this article?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Article deleted successfully!');
          // Refetch articles
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`);
          if (res.ok) {
            const data = await res.json();
            setArticles(data);
          }
        } else {
          alert('Failed to delete article');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const editProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      content: project.content || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(',') : '',
      demoUrl: project.demoUrl || project.demo || '',
      githubUrl: project.githubUrl || project.github || '',
      tags: project.tags ? project.tags.map(t => t.tag.name).join(',') : ''
    });
    setEditingProject(project);
  };

  const deleteProject = async (id) => {
    if (confirm('Delete this project?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Project deleted successfully!');
          // Refetch projects
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
          if (res.ok) {
            const data = await res.json();
            setProjects(data);
          }
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono">
      <Navbar currentPage="admin" />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="secondary" onClick={() => navigate('/')}>
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Button>
          </div>
          <h1 className="text-4xl font-black mb-12 text-center">ADMIN PANEL</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Article */}
            <Card>
              <div className="flex items-center mb-6">
                <Plus size={30} className="mr-3" />
                <h2 className="text-2xl font-bold">{editingArticle ? 'Edit Article' : 'Add Article'}</h2>
              </div>
              <form onSubmit={handleArticleSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Content</label>
                  <textarea
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows="5"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={articleForm.tags}
                    onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Author</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({...articleForm, author: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={articleForm.published}
                    onChange={(e) => setArticleForm({...articleForm, published: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="font-bold">Published</label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingArticle ? 'Update Article' : 'Add Article'}
                  </Button>
                  {editingArticle && (
                    <Button type="button" variant="secondary" onClick={() => { setEditingArticle(null); setArticleForm({ title: '', content: '', tags: '', author: '', published: true }); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            {/* Add Project */}
            <Card>
              <div className="flex items-center mb-6">
                <Plus size={30} className="mr-3" />
                <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              </div>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block font-bold mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Content</label>
                  <textarea
                    value={projectForm.content}
                    onChange={(e) => setProjectForm({...projectForm, content: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows="5"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Demo URL (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter demo URL or leave empty"
                    value={projectForm.demoUrl}
                    onChange={(e) => setProjectForm({...projectForm, demoUrl: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">GitHub URL (optional)</label>
                  <input
                    type="text"
                    placeholder="Enter GitHub URL or leave empty"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                    className="w-full p-3 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </Button>
                  {editingProject && (
                    <Button type="button" variant="secondary" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', content: '', technologies: '', demoUrl: '', githubUrl: '', tags: '' }); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* Manage Articles */}
          <Card className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Manage Articles</h2>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="border-2 border-black dark:border-white p-4">
                  <h3 className="font-bold text-lg">{article.title}</h3>
                  <p className="text-sm opacity-70">{article.content.substring(0, 100)}...</p>
                  <div className="mt-2 flex gap-2">
                    <Button onClick={() => editArticle(article)}>Edit</Button>
                    <Button variant="secondary" onClick={() => deleteArticle(article.id)}>Delete</Button>
                  </div>
                </div>
              ))}
              {articles.length === 0 && <p>No articles yet.</p>}
            </div>
          </Card>

          {/* Manage Projects */}
          <Card className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-black dark:border-white p-4">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm opacity-70">{project.description.substring(0, 100)}...</p>
                  <div className="mt-2 flex gap-2">
                    <Button onClick={() => editProject(project)}>Edit</Button>
                    <Button variant="secondary" onClick={() => deleteProject(project.id)}>Delete</Button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p>No projects yet.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;