import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Github, Linkedin, Mail, Phone, Code, Globe,
  User, Briefcase, MessageCircle, ChevronDown, ExternalLink,
  Terminal, Coffee, Zap, Star, ArrowUp,
  Instagram,
  Swords,
  ContactRound,
  Download
} from 'lucide-react';
import { useTheme } from '../ThemeContext.jsx';
import {
  GlitchText,
  Button,
  Card,
  Section,
  TypeWriter,
  FloatingElement,
  Navbar,
  FeaturedArticles,
  Logo,
  Footer
} from '../components/index.js';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import cvIndonesian from '../assets/CV ADAM 26N-ID.pdf';

const Home = () => {
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


  const skills = [
    { name: "Laravel", level: 85, icon: Terminal },
    { name: "Next.js", level: 80, icon: Code },
    { name: "React.js", level: 85, icon: Zap },
    { name: "Node.js", level: 85, icon: Terminal },
    { name: "Vue.js", level: 80, icon: Code },
    { name: "Express.js", level: 80, icon: Globe },
  ];

  return (
    <>
    <div className="flex flex-col min-h-screen text-black dark:text-white font-mono overflow-x-hidden transition-colors duration-300 gradient-mesh-light">
      {/* Navigation */}
      <Navbar currentPage="home" showArticlesLink={true} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <FloatingElement delay={0}>
              <Terminal size={80} className="mx-auto mb-8 text-black/70 dark:text-white/70" />
            </FloatingElement>
          </div>

          <h1 className="text-4xl md:text-8xl font-black mb-6 leading-tight">
            <GlitchText>ADAM FAWWAZ HAQ</GlitchText>
          </h1>

          <div className="text-xl md:text-3xl mb-8 h-16 text-black/70 dark:text-white/70">
            <TypeWriter text="WEB DEVELOPER" speed={150} />
          </div>

          <div className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-black/60 dark:text-white/60">
            Creating extraordinary web experiences with Laravel, React, and Next.js technologies.
            Experienced in ERP system development and modern applications.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection('projects')}>
              VIEW PROJECTS
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('contact')}>
              CONTACT ME
            </Button>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown size={40} className="mx-auto text-black/40 dark:text-white/40" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="ABOUT ME" icon={User}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Card>
              <div className="flex items-center mb-6">
                <User size={40} className="mr-4 text-black/60 dark:text-white/60" />
                <h3 className="text-2xl font-bold">Developer Profile</h3>
              </div>
              <div className="space-y-4 text-lg leading-relaxed text-black/70 dark:text-white/70">
                <p>
                  I am a Web Developer with 3+ years of experience
                  in developing modern web applications using technologies like Laravel, Express.js, Next.js, and Vue.js.
                </p>
                <p>
                  Experienced as a Fullstack Developer at CV. Biliva Nature Indonesia,
                  Frontend Programmer at Muatmuat, focusing on ERP application development and management systems and
                  active freelance Web Developer.
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
                <Coffee size={30} className="mr-3 text-black/60 dark:text-white/60" />
                <h4 className="text-xl font-bold">Fun Facts</h4>
              </div>
              <ul className="space-y-2 text-black/70 dark:text-white/70">
                <li>Expert in Laravel & Javascript Ecosystem</li>
                <li>Web Developer & Graphic Designer</li>
                <li>Based in Surabaya, Indonesia</li>
                <li>Continuous learner & problem solver</li>
              </ul>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <Star size={30} className="mr-3 text-black/60 dark:text-white/60" />
                <h4 className="text-xl font-bold">Experience</h4>
              </div>
              <div className="space-y-3 text-black/70 dark:text-white/70">
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
                  <div className="text-sm opacity-70">Remote (Jul 2020 - now)</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-4">
                <Terminal size={30} className="mr-3 text-black/60 dark:text-white/60" />
                <h4 className="text-xl font-bold">Education</h4>
              </div>
              <div className="space-y-3 text-black/70 dark:text-white/70">
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
      <Section id="skills" title="SKILLS" icon={Swords}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <Card key={skill.name} animated={true}>
                <div className="flex items-center mb-4">
                  <IconComponent size={30} className="mr-3 text-black/60 dark:text-white/60" />
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div className="w-full rounded-full h-3 bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-black dark:bg-white rounded-full transition-all duration-1000 delay-300"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="text-right mt-2 font-bold text-black/60 dark:text-white/60">{skill.level}%</div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">OTHER TECHNOLOGIES</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['PHP', 'React.js', 'Astro', 'Nest.js', 'API Integration', 'Git', 'CI/CD', 'Docker', 'UI/UX', 'Graphic Design', 'Problem Solving'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/45 dark:bg-white/8 backdrop-blur-xl border border-white/50 dark:border-white/12 text-black dark:text-white hover:bg-white/55 dark:hover:bg-white/14 transition-colors duration-300 font-bold shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Star size={30} className="mr-3 text-black/60 dark:text-white/60" />
              <h4 className="text-xl font-bold">Certification</h4>
            </div>
            <p className="text-lg text-black/70 dark:text-white/70">
              <strong>Fullstack Web Developer</strong><br />
              Information Technology Competency Certification Agency (LSK TIK) - 2022
            </p>
          </Card>
        </div>
      </Section>

      {/* Projects Section */}
      <FeaturedProjects />

      {/* Featured Articles Section */}
      <FeaturedArticles />

      {/* Contact Section */}
      <Section id="contact" title="CONTACT" icon={ContactRound}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <h3 className="text-2xl font-bold mb-6">Let's Collaborate!</h3>
              <p className="text-lg mb-8 leading-relaxed text-black/70 dark:text-white/70">
                Have an interesting project or want to discuss web technologies?
                Don't hesitate to contact me. I'm always open to new
                opportunities and collaborations in web development!
              </p>

              <div className="space-y-4 text-black/70 dark:text-white/70">
                <div className="flex items-center">
                  <Mail size={24} className="mr-4 text-black/50 dark:text-white/50" />
                  <span className="text-lg">fawwazadam1005@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="mr-4 text-black/50 dark:text-white/50" />
                  <span className="text-lg">+62 812 5235 5711</span>
                </div>
                <div className="flex items-center">
                  <Globe size={24} className="mr-4 text-black/50 dark:text-white/50" />
                  <span className="text-lg">Surabaya, Indonesia</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant='secondary' onClick={() => window.open('https://github.com/Fawwazxdam', '_blank')}>
                  <Github size={20} className="mr-2" />
                  GITHUB
                </Button>
                <Button variant="secondary" onClick={() => window.open('https://linkedin.com/in/adam-fawwaz', '_blank')}>
                  <Linkedin size={20} className="mr-2" />
                  LINKEDIN
                </Button>
                <Button variant="outline" onClick={() => window.open('https://instagram.com/youngdam_free', '_blank')}>
                  <Instagram size={20} className="mr-2" />
                  INSTAGRAM
                </Button>
                <Button variant="outline" onClick={() => window.open(cvIndonesian, '_blank')}>
                  <Download size={20} className="mr-2" />
                  DOWNLOAD CV
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
                    className="w-full p-3 rounded-xl glass-input focus:outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">EMAIL</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-xl glass-input focus:outline-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
                    placeholder="email@domain.com"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">MESSAGE</label>
                  <textarea
                    rows="5"
                    className="w-full p-3 rounded-xl glass-input focus:outline-none resize-none text-black dark:text-white placeholder-black/30 dark:placeholder-white/30"
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
      <Footer />
    </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-2xl bg-white/65 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/15 hover:bg-white/75 dark:hover:bg-white/16 transition-all duration-300 transform hover:scale-110 shadow-lg"
          style={{ zIndex: 9999 }}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Home;