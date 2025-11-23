import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Github, Linkedin, Mail, Phone, Code, Globe,
  User, Briefcase, MessageCircle, ChevronDown, ExternalLink,
  Terminal, Coffee, Zap, Star, ArrowUp,
  Instagram
} from 'lucide-react';
import { useTheme } from './ThemeContext.jsx';
import Articles from './Articles.jsx';
import {
  GlitchText,
  Button,
  Card,
  Section,
  TypeWriter,
  FloatingElement,
  Navbar,
  FeaturedArticles,
  Logo
} from './components/index.js';


const Portfolio = () => {
  const { isDarkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: "ERP System - Biliva Nature",
      description: "Integrated ERP system for stock management, transactions, and customer service using Laravel",
      tech: ["Laravel", "MySQL", "jQuery", "Bootstrap"],
      demo: "#",
      github: "#"
    },
    {
      title: "Muattrans & Muatparts Plus",
      description: "Modern web application with Next.js and backend API integration for dynamic data display",
      tech: ["Next.js", "Tailwind CSS", "API Integration", "React", "Zustand"],
      demo: "#",
      github: "#"
    },
    {
      title: "Landing Page & Top-Up App",
      description: "Various freelance projects including corporate landing pages and game top-up applications",
      tech: ["Laravel", "React", "MySQL", "Graphic Design"],
      demo: "#",
      github: "#"
    }
  ];

  const skills = [
    { name: "Laravel", level: 85, icon: Terminal },
    { name: "Next.js", level: 80, icon: Code },
    { name: "React.js", level: 85, icon: Zap },
    { name: "Node.js", level: 75, icon: Terminal },
    { name: "JavaScript", level: 90, icon: Code },
    { name: "MySQL", level: 80, icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-mono overflow-x-hidden transition-colors duration-300">
      {/* Navigation */}
      <Navbar currentPage="home" showArticlesLink={true} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <FloatingElement delay={0}>
              <Terminal size={80} className="mx-auto mb-8" />
            </FloatingElement>
          </div>

          <h1 className="text-4xl md:text-8xl font-black mb-6 leading-tight">
            <GlitchText>ADAM FAWWAZ HAQ</GlitchText>
          </h1>

          <div className="text-xl md:text-3xl mb-8 h-16">
            <TypeWriter text="WEB DEVELOPER" speed={150} />
          </div>

          <div className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Creating extraordinary web experiences with Laravel, React, and Next.js technologies.
            Experienced in ERP system development and modern applications.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('projects')}>
              VIEW PORTFOLIO
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('contact')}>
              CONTACT ME
            </Button>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown size={40} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="ABOUT ME" className="bg-gray-100 dark:bg-gray-800">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card>
              <div className="flex items-center mb-6">
                <User size={40} className="mr-4" />
                <h3 className="text-2xl font-bold">Developer Profile</h3>
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  I am a Web Developer with 3+ years of experience
                  in developing modern web applications using technologies like Laravel, React, and Next.js.
                </p>
                <p>
                  Experienced as a Fullstack Developer at CV. Biliva Nature Indonesia and
                  Frontend Programmer at Muatmuat, focusing on ERP application development and management systems.
                </p>
                <p>
                  Alumni of D2 Computer Science at UM and graduate of intensive Fullstack Web Developer bootcamp
                  with certification from LSK TIK (Information Technology Competency Certification Agency).
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center mb-4">
                <Coffee size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Fun Facts</h4>
              </div>
              <ul className="space-y-2">
                <li>💻 Expert in Laravel & React Ecosystem</li>
                <li>🎨 Web Developer & Graphic Designer</li>
                <li>🌍 Based in Surabaya, Indonesia</li>
                <li>📚 Continuous learner & problem solver</li>
              </ul>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <Star size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Experience</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">Frontend Programmer</div>
                  <div className="text-sm opacity-70">Muatmuat - Surabaya (Jul 2024 - Oct 2024)</div>
                </div>
                <div>
                  <div className="font-bold">IT & Fullstack Web Developer</div>
                  <div className="text-sm opacity-70">CV. Biliva Nature Indonesia - Surabaya (Jun 2023 - Jan 2025)</div>
                </div>
                <div>
                  <div className="font-bold">Freelance Web Developer</div>
                  <div className="text-sm opacity-70">Remote (Jul 2020 - Jan 2024)</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <Terminal size={30} className="mr-3" />
                <h4 className="text-xl font-bold">Education</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">D2 Computer Science</div>
                  <div className="text-sm opacity-70">State University of Malang (2018 - 2022)</div>
                </div>
                <div>
                  <div className="font-bold">Intensive Fullstack Developer Bootcamp</div>
                  <div className="text-sm opacity-70">LKP Karisma Academy (2022)</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="SKILLS">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <Card key={skill.name} animated={true}>
                <div className="flex items-center mb-4">
                  <IconComponent size={30} className="mr-3" />
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-white">
                  <div
                    className="h-4 bg-black dark:bg-white transition-all duration-1000 delay-300"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right mt-2 font-bold">{skill.level}%</div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">OTHER TECHNOLOGIES</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['PHP', 'Express.js', 'API Integration', 'Git', 'UI/UX', 'Graphic Design', 'Problem Solving'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Star size={30} className="mr-3" />
              <h4 className="text-xl font-bold">Certification</h4>
            </div>
            <p className="text-lg">
              <strong>Fullstack Web Developer</strong><br />
              Information Technology Competency Certification Agency (LSK TIK) - 2022
            </p>
          </Card>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="PORTFOLIO" className="bg-gray-100 dark:bg-gray-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} animated={true}>
              <div className="flex items-center mb-4">
                <Briefcase size={30} className="mr-3" />
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>

              <p className="mb-6 leading-relaxed">{project.description}</p>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
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
                <Button className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.demo, '_blank')}>
                  <ExternalLink size={16} className="mr-2" />
                  DEMO
                </Button>
                <Button variant="secondary" className="flex-1 text-sm py-2 px-4" onClick={() => window.open(project.github, '_blank')}>
                  <Github size={16} className="mr-2" />
                  CODE
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}>
            SEE ALL PROJECTS ON GITHUB
          </Button>
        </div>
      </Section>

      {/* Featured Articles Section */}
      <FeaturedArticles />

      {/* Contact Section */}
      <Section id="contact" title="CONTACT">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Let's Collaborate!</h3>
              <p className="text-lg mb-8 leading-relaxed">
                Have an interesting project or want to discuss web technologies?
                Don't hesitate to contact me. I'm always open to new
                opportunities and collaborations in web development!
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={24} className="mr-4" />
                  <span className="text-lg">fawwazadam1005@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="mr-4" />
                  <span className="text-lg">+62 812 5235 5711</span>
                </div>
                <div className="flex items-center">
                  <Globe size={24} className="mr-4" />
                  <span className="text-lg">Surabaya, Indonesia</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant='secondary' onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}>
                  <Github size={20} className="mr-2" />
                  GITHUB
                </Button>
                <Button variant="secondary" onClick={() => window.open('https://linkedin.com/in/adam-fawwaz-a24118214', '_blank')}>
                  <Linkedin size={20} className="mr-2" />
                  LINKEDIN
                </Button>
                <Button variant="outline" onClick={() => window.open('https://instagram.com/youngdam_free', '_blank')}>
                  <Instagram size={20} className="mr-2" />
                  INSTAGRAM
                </Button>
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Send Message</h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2">NAME</label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 border-black dark:border-white focus:outline-none focus:ring-0 bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">EMAIL</label>
                  <input
                    type="email"
                    className="w-full p-3 border-2 border-black text-black focus:outline-none focus:ring-0 bg-white"
                    placeholder="email@domain.com"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">MESSAGE</label>
                  <textarea
                    rows="5"
                    className="w-full p-3 border-2 border-black dark:border-white focus:outline-none focus:ring-0 resize-none bg-white dark:bg-gray-800 text-black dark:text-white"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <Button className="w-full flex items-center justify-center ">
                  <MessageCircle size={20} className="mr-2" />
                  <span>SEND MESSAGE</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-black mb-4">
            <GlitchText>&lt;ADAMF/&gt;</GlitchText>
          </div>
          <p className="text-lg">© 2024 Adam Fawwaz Haq. Crafted with ❤️ and lots of ☕</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-black dark:bg-white text-white dark:text-black p-4 border-4 border-black dark:border-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors duration-300 z-50 transform hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
  );
};

export default App;